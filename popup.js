document.addEventListener("DOMContentLoaded", () => {
  const websiteInput = document.getElementById("websiteInput");
  const addButton = document.getElementById("addButton");
  const blockedSitesList = document.getElementById("blockedSitesList");

  // Save blocked sites to Chrome storage
  const saveBlockedSites = (blockedSites) => {
    chrome.storage.sync.set({ blockedSites }, () => {
      console.log("Blocked sites saved:", blockedSites);
    });
  };

  // Get blocked sites from Chrome storage
  const getBlockedSites = (callback) => {
    chrome.storage.sync.get(["blockedSites"], (data) => {
      console.log("Blocked sites retrieved:", data.blockedSites || []);
      callback(data.blockedSites || []);
    });
  };

  // Update the UI with the blocked sites list
  const updateBlockedSitesUI = (sites) => {
    blockedSitesList.innerHTML = ""; // Clear the list
    sites.forEach((site) => {
      const li = document.createElement("li");
      li.textContent = site;

      // Create a remove button
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.style.marginLeft = "10px";

      // Remove site when the button is clicked
      removeButton.addEventListener("click", () => {
        const updatedSites = sites.filter((s) => s !== site);
        saveBlockedSites(updatedSites);
        updateBlockedSitesUI(updatedSites);
      });

      li.appendChild(removeButton);
      blockedSitesList.appendChild(li);
    });
  };

  // Add site to the blocked list
  addButton.addEventListener("click", () => {
    const site = websiteInput.value.trim();
    if (site) {
      getBlockedSites((sites) => {
        const updatedSites = [...new Set([...sites, site])]; // Avoid duplicates
        saveBlockedSites(updatedSites);
        updateBlockedSitesUI(updatedSites);
        websiteInput.value = ""; // Clear input field
      });
    } else {
      console.log("Input is empty, nothing to add.");
    }
  });

  // Initialize the UI
  getBlockedSites(updateBlockedSitesUI);
});
