import SwiftUI
import WebKit
import UniformTypeIdentifiers

@main
struct PhuongHoangApp: App {
    var body: some Scene { WindowGroup { GameView().ignoresSafeArea() } }
}
private struct GameView: UIViewRepresentable {
    func makeCoordinator() -> GameCoordinator { GameCoordinator() }
    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.websiteDataStore = .default()
        config.allowsInlineMediaPlayback = true
        config.setURLSchemeHandler(context.coordinator, forURLScheme: "phoenix")
        config.userContentController.add(context.coordinator, name: "saveProgress")
        let saved = UserDefaults.standard.dictionary(forKey: "PhoenixENStorage") as? [String:String] ?? [:]
        let data = (try? JSONSerialization.data(withJSONObject: saved)) ?? Data("{}".utf8)
        let base64 = data.base64EncodedString()
        let script = """
        (() => {
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
        web.load(URLRequest(url: URL(string: "phoenix://game/game/index.html")!))
        return web
    }
    func updateUIView(_ web: WKWebView, context: Context) {}
}
private final class GameCoordinator: NSObject, WKURLSchemeHandler, WKScriptMessageHandler, WKNavigationDelegate {
    func userContentController(_ controller: WKUserContentController, didReceive message: WKScriptMessage) {
        guard message.frameInfo.isMainFrame, message.frameInfo.securityOrigin.protocol == "phoenix",
              let values = message.body as? [String:String] else { return }
        UserDefaults.standard.set(values, forKey: "PhoenixENStorage")
    }
    func webView(_ webView: WKWebView, start task: WKURLSchemeTask) {
        guard let url = task.request.url,
              let root = Bundle.main.resourceURL?.appendingPathComponent("GameAssets/game") else { return }
        // HTML keeps the web base /game/. Map it once to the bundled game directory.
        let requestedPath = url.path
        let path: String
        if requestedPath == "/" || requestedPath == "/game/" {
            path = "index.html"
        } else if requestedPath.hasPrefix("/game/") {
            path = String(requestedPath.dropFirst("/game/".count))
        } else {
            path = String(requestedPath.dropFirst())
        }
        let file = root.appendingPathComponent(path).standardizedFileURL
        guard file.path.hasPrefix(root.path + "/"), let data = try? Data(contentsOf: file) else {
            NSLog("Phoenix bundled asset missing: %@", url.path)
            task.didFailWithError(NSError(domain: NSURLErrorDomain, code: NSURLErrorFileDoesNotExist)); return
        }
        let ext = file.pathExtension.lowercased()
        let mime = ["mjs":"text/javascript","js":"text/javascript","css":"text/css","html":"text/html","json":"application/json","webp":"image/webp","svg":"image/svg+xml"][ext]
            ?? UTType(filenameExtension: ext)?.preferredMIMEType ?? "application/octet-stream"
        task.didReceive(URLResponse(url: url, mimeType: mime, expectedContentLength: data.count, textEncodingName: ["html","mjs","js","css","json"].contains(ext) ? "utf-8" : nil))
        task.didReceive(data)
        task.didFinish()
    }
    func webView(_ webView: WKWebView, stop task: WKURLSchemeTask) {}
    func webViewWebContentProcessDidTerminate(_ webView: WKWebView) { webView.reload() }
    func webView(_ webView: WKWebView, decidePolicyFor action: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        guard let url = action.request.url else { decisionHandler(.cancel); return }
        if url.scheme == "phoenix", url.host == "game" { decisionHandler(.allow); return }
        if action.navigationType == .linkActivated, url.scheme == "https" { UIApplication.shared.open(url) }
        decisionHandler(.cancel)
    }
}

