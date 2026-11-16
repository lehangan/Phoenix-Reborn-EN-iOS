(() => {
    if (location.origin !== "https://trungsinhgame.com") return;

    const authorItems = [
        '.online-menu button[data-action="online-donate"]',
        '.online-menu a[href="https://www.facebook.com/caocon22"]',
    ].join(", ");

    function removeAuthorItems(root) {
        if (root instanceof Element && root.matches(authorItems)) {
            root.remove();
            return;
        }
        root.querySelectorAll?.(authorItems).forEach(item => item.remove());
    }

    // The game renders its menu anew whenever the modal opens.
    const observer = new MutationObserver(records => {
        for (const record of records) {
            for (const node of record.addedNodes) {
                if (node instanceof Element) removeAuthorItems(node);
            }
        }
    });
    observer.observe(document, { childList: true, subtree: true });
    removeAuthorItems(document);
})();
