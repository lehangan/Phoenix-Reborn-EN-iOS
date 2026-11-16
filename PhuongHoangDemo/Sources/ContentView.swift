import SwiftUI
import WebKit

@main
struct PhuongHoangApp: App {
    var body: some Scene { WindowGroup { GameScreen() } }
}

private struct GameScreen: View {
    @State private var loadFailed = false
    @State private var loadAttempt = UUID()

    var body: some View {
        ZStack {
            GameView(onFailure: { loadFailed = true })
                .id(loadAttempt)
                .ignoresSafeArea()
            if loadFailed {
                VStack(spacing: 16) {
                    Text("Phoenix Reborn").font(.title)
                    Text("The game could not open.")
                    Button("Try Again") {
                        loadFailed = false
                        loadAttempt = UUID()
                    }
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .background(Color(red: 0.98, green: 0.93, blue: 0.85))
                .foregroundStyle(Color(red: 0.36, green: 0.15, blue: 0.17))
            }
        }
    }
}
private struct GameView: UIViewRepresentable {
    let onFailure: () -> Void

    func makeCoordinator() -> GameCoordinator { GameCoordinator(onFailure: onFailure) }
    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.websiteDataStore = .default()
        config.allowsInlineMediaPlayback = true
        config.userContentController.add(context.coordinator, name: "saveProgress")
        let saved = UserDefaults.standard.dictionary(forKey: "PhoenixENStorage") as? [String:String] ?? [:]
        let data = (try? JSONSerialization.data(withJSONObject: saved)) ?? Data("{}".utf8)
        let base64 = data.base64EncodedString()
        let script = """
        (() => {
          if (location.protocol !== 'file:') return;
          const values=JSON.parse(new TextDecoder().decode(Uint8Array.from(atob('\(base64)'),c=>c.charCodeAt(0))));
          const save=()=>window.webkit.messageHandlers.saveProgress.postMessage(values);
          const storage={getItem:k=>Object.prototype.hasOwnProperty.call(values,k)?values[k]:null,
            setItem:(k,v)=>{values[String(k)]=String(v);save();},removeItem:k=>{delete values[k];save();},
            clear:()=>{for(const k of Object.keys(values))delete values[k];save();},key:i=>Object.keys(values)[i]??null,
            get length(){return Object.keys(values).length;}};
          Object.defineProperty(window,'localStorage',{value:storage});
        })();
        """
        config.userContentController.addUserScript(WKUserScript(source: script, injectionTime: .atDocumentStart, forMainFrameOnly: true))
        let web = WKWebView(frame: .zero, configuration: config)
        web.navigationDelegate = context.coordinator
        web.scrollView.contentInsetAdjustmentBehavior = .never
        context.coordinator.loadGame(in: web)
        return web
    }
    func updateUIView(_ web: WKWebView, context: Context) {}

    static func dismantleUIView(_ web: WKWebView, coordinator: GameCoordinator) {
        web.configuration.userContentController.removeScriptMessageHandler(forName: "saveProgress")
        web.navigationDelegate = nil
        web.stopLoading()
    }
}

private final class GameCoordinator: NSObject, WKScriptMessageHandler, WKNavigationDelegate {
    private let onFailure: () -> Void
    private var gameDirectory: URL?
    private var retriedAfterTermination = false

    init(onFailure: @escaping () -> Void) {
        self.onFailure = onFailure
        super.init()
    }

    func loadGame(in webView: WKWebView) {
        guard let directory = Bundle.main.resourceURL?
            .appendingPathComponent("GameAssets/game", isDirectory: true)
            .standardizedFileURL else {
            reportFailure()
            return
        }
        let index = directory.appendingPathComponent("index.html")
        let script = directory.appendingPathComponent("palace-ios.js")
        guard FileManager.default.isReadableFile(atPath: index.path),
              FileManager.default.isReadableFile(atPath: script.path) else {
            NSLog("Phoenix Reborn: bundled game entry or script is missing")
            reportFailure()
            return
        }
        gameDirectory = directory
        webView.loadFileURL(index, allowingReadAccessTo: directory)
    }

    private func reportFailure() {
        DispatchQueue.main.async { [weak self] in self?.onFailure() }
    }

    func userContentController(_ controller: WKUserContentController, didReceive message: WKScriptMessage) {
        guard message.name == "saveProgress", message.frameInfo.isMainFrame,
              let url = message.frameInfo.request.url, url.isFileURL,
              let directory = gameDirectory,
              url.standardizedFileURL.path == directory.appendingPathComponent("index.html").path,
              let values = message.body as? [String: String] else { return }
        UserDefaults.standard.set(values, forKey: "PhoenixENStorage")
    }

    func webView(_ webView: WKWebView, didFailProvisionalNavigation navigation: WKNavigation!, withError error: Error) {
        handleNavigationError(error)
    }

    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        handleNavigationError(error)
    }

    private func handleNavigationError(_ error: Error) {
        let failure = error as NSError
        guard failure.domain != NSURLErrorDomain || failure.code != NSURLErrorCancelled else { return }
        NSLog("Phoenix Reborn navigation failed: %@", failure.localizedDescription)
        reportFailure()
    }

    func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
        if retriedAfterTermination {
            reportFailure()
        } else {
            retriedAfterTermination = true
            loadGame(in: webView)
        }
    }

    func webView(_ webView: WKWebView, decidePolicyFor action: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        guard let url = action.request.url else {
            decisionHandler(.cancel)
            return
        }
        if url.isFileURL, let directory = gameDirectory,
           url.standardizedFileURL.path.hasPrefix(directory.path + "/") {
            decisionHandler(.allow)
            return
        }
        if action.navigationType == .linkActivated, url.scheme == "https" {
            UIApplication.shared.open(url)
        }
        decisionHandler(.cancel)
    }
}
