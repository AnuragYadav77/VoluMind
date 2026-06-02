// VoluMind — Background Service Worker (v2)

const DEFAULTS = {
  enabled:          true,
  target:           -14,
  smooth:           0.3,
  hasLearnedTarget: false,
  siteOverrides:    {}
};

// Set defaults on first install
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(Object.keys(DEFAULTS), (existing) => {
    const toSet = {};
    for (const key of Object.keys(DEFAULTS)) {
      if (existing[key] === undefined) toSet[key] = DEFAULTS[key];
    }
    if (Object.keys(toSet).length) chrome.storage.sync.set(toSet);
  });
});

// Relay any storage changes to ALL active tabs in real time
chrome.storage.onChanged.addListener((changes) => {
  const updated = {};
  for (const [k, v] of Object.entries(changes)) updated[k] = v.newValue;

  chrome.tabs.query({}, (tabs) => {
    for (const tab of tabs) {
      if (!tab.url || tab.url.startsWith('chrome://')) continue;
      chrome.tabs.sendMessage(tab.id, {
        type: 'SETTINGS_UPDATE', settings: updated
      }).catch(() => {});
    }
  });
});

// When content script reports a learned target, relay to popup
chrome.runtime.onMessage.addListener((msg, sender) => {
  if (msg.type === 'TARGET_LEARNED') {
    // Broadcast to popup if open
    chrome.runtime.sendMessage({
      type:   'TARGET_LEARNED',
      target: msg.target
    }).catch(() => {});
  }
});
