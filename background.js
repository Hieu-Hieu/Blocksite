chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  chrome.storage.sync.get(["blockedSites"], ({ blockedSites }) => {
    if (blockedSites) {
      const url = new URL(details.url);
      if (blockedSites.includes(url.hostname)) {
        // chrome.tabs.update(details.tabId, { url: "about:blank" });
        chrome.tabs.update(details.tabId, {
          url: chrome.runtime.getURL("ui/blocked.html"),
        });
      }
    }
  });
});
