chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "verifyClaim" && message.claimText) {
    const encodedClaim = encodeURIComponent(message.claimText);
    const dashboardUrl = `http://localhost:5173/?claim=${encodedClaim}`;
    chrome.tabs.create({ url: dashboardUrl });
  }
});