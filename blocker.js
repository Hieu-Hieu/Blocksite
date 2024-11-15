function saveBlockedSites(blockedSites) {
  chrome.storage.sync.set({ blockedSites }, () => {
    console.log("Blocked sites updated:", blockedSites);
  });
}

function getBlockedSites(callback) {
  chrome.storage.sync.get(["blockedSites"], ({ blockedSites }) => {
    callback(blockedSites || []);
  });
}
