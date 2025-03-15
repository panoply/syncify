// Store active tabs and their hostnames
const activeTabStates = new Map();

async function checkShopifyHeader (tabId) {
  try {
    const response = await fetch(tabId.url);
    const headers = response.headers;
    return headers.get('powered-by')?.toLowerCase().includes('shopify') || false;
  } catch (error) {
    console.error('Error checking Shopify header:', error);
    return false;
  }
}

async function updateIcon (tabId, isActive) {
  const iconState = isActive ? 'active' : 'inactive';
  await chrome.action.setIcon({
    tabId,
    path: {
      128: `images/icon-${iconState}-128.png`
    }
  });
}

async function injectScriptsAndStyles (tabId) {
  try {
    // Inject CSS
    await chrome.scripting.insertCSS({
      target: { tabId },
      files: [ 'client/style.css' ]
    });

    // Inject JavaScript
    await chrome.scripting.executeScript({
      target: { tabId },
      files: [ 'client/hot.js' ]
    });

    chrome.action.setTitle({
      tabId,
      title: 'Active on Shopify site'
    });

  } catch (error) {
    console.error('Injection failed:', error);
    throw error;
  }
}

async function removeInjection (tabId) {

  try {

    // Remove CSS
    await chrome.scripting.removeCSS({
      target: { tabId },
      files: [ 'client/style.css' ]
    });

    // The page will need to be reloaded to remove the JS effects
    await chrome.tabs.reload(tabId);

  } catch (error) {
    console.error('Removal failed:', error);
    throw error;
  }
}

// Listen for tab updates (including refreshes)
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // Only handle complete loading states
  if (changeInfo.status !== 'complete') return;

  const tabData = await chrome.storage.local.get(`tab_${tabId}`);
  const savedState = tabData[`tab_${tabId}`];

  if (!savedState || !savedState.active) return;

  // Check if we're still on the same hostname
  const currentHostname = new URL(tab.url).hostname;
  if (currentHostname !== savedState.hostname) {
    // Hostname changed, remove the state
    await chrome.storage.local.remove(`tab_${tabId}`);
    activeTabStates.delete(tabId);
    await updateIcon(tabId, false);
    return;
  }

  // Re-inject if we're still active and on the same hostname
  const isShopify = await checkShopifyHeader({ url: tab.url });
  if (isShopify) {
    activeTabStates.set(tabId, true);
    await updateIcon(tabId, true);
    await injectScriptsAndStyles(tabId);
  }
});

// Handle extension icon clicks
chrome.action.onClicked.addListener(async (tab) => {
  const hostname = new URL(tab.url).hostname;
  const isShopify = await checkShopifyHeader(tab);

  if (!isShopify) {
    chrome.action.setTitle({
      tabId: tab.id,
      title: 'Not a Shopify site'
    });
    return;
  }

  const currentState = activeTabStates.get(tab.id);
  const newState = !currentState;

  if (newState) {
    // Activate
    activeTabStates.set(tab.id, true);
    await updateIcon(tab.id, true);
    await injectScriptsAndStyles(tab.id);
    // Store the hostname for this tab
    await chrome.storage.local.set({
      [`tab_${tab.id}`]: {
        active: true,
        hostname
      }
    });
  } else {
    // Deactivate
    activeTabStates.delete(tab.id);
    await updateIcon(tab.id, false);
    await removeInjection(tab.id);
    await chrome.storage.local.remove(`tab_${tab.id}`);
  }
});

// Clean up when a tab is closed
chrome.tabs.onRemoved.addListener(async (tabId) => {
  activeTabStates.delete(tabId);
  await chrome.storage.local.remove(`tab_${tabId}`);
});

// Handle window closing
chrome.windows.onRemoved.addListener(async (windowId) => {
  // Get all tabs in the closing window and clean up their states
  const tabs = await chrome.tabs.query({ windowId });
  for (const tab of tabs) {
    activeTabStates.delete(tab.id);
    await chrome.storage.local.remove(`tab_${tab.id}`);
  }
});

// Initialize state when the extension starts
chrome.runtime.onStartup.addListener(async () => {
  // Clear any stale state
  await chrome.storage.local.clear();
  activeTabStates.clear();
});
