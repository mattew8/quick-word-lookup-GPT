chrome.runtime.onMessage.addListener(async (message) => {
  chrome.tabs?.query(
    { active: true, lastFocusedWindow: true },
    function (tabs) {
      const tabId = tabs[0]?.id;
      if (!tabId) return;

      chrome.tabs.sendMessage(tabId, message);
    },
  );
});

chrome.runtime.onMessage.addListener((message) => {
  if (message === 'open_side_panel') {
    chrome.tabs?.query(
      { active: true, lastFocusedWindow: true },
      function (tabs) {
        const tabId = tabs[0]?.id;
        if (!tabId) return;

        chrome.sidePanel.open({ tabId });
      },
    );
  }
});
