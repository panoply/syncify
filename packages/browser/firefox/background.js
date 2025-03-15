// Store active tabs and their hostnames
const activeTabStates = new Map();

async function checkShopifyHeader (tabId, url) {
  return new Promise((resolve) => {
    browser.webRequest.onHeadersReceived.addListener(
      function listener (details) {
        browser.webRequest.onHeadersReceived.removeListener(listener);
        const shopifyHeader = details.responseHeaders.find(
          header => header.name.toLowerCase() === 'powered-by' &&
                    header.value.toLowerCase().includes('shopify')
        );
        resolve(!!shopifyHeader);
      },
      { urls: [ url ], types: [ 'main_frame' ] },
      [ 'responseHeaders' ]
    );

    // Fetch the URL to trigger the header check
    fetch(url).catch(() => resolve(false));
  });
}

async function updateIcon (tabId, isActive) {
  const iconState = isActive ? 'active' : 'inactive';
  await browser.browserAction.setIcon({
    tabId,
    path: {
      128: `images/icon-${iconState}-128.png`
    }
  });
}

async function injectScriptsAndStyles (tabId) {
  try {
    // Inject CSS
    await browser.tabs.insertCSS(tabId, {
      file: 'client/styles.css'
    });

    // Inject JavaScript
    await browser.tabs.executeScript(tabId, {
      file: 'client/content.js'
    });

    browser.browserAction.setTitle({
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
    await browser.tabs.removeCSS(tabId, {
      file: 'client/styles.css'
    });

    // Reload the page to remove JS effects
    await browser.tabs.reload(tabId);
  } catch (error) {
    console.error('Removal failed:', error);
    throw error;
  }
}

// Listen for tab updates (including refreshes)
browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // Only handle complete loading states
  if (changeInfo.status !== 'complete') return;

  const tabData = await browser.storage.local.get(`tab_${tabId}`);
  const savedState = tabData[`tab_${tabId}`];

  if (!savedState || !savedState.active) return;

  // Check if we're still on the same hostname
  const currentHostname = new URL(tab.url).hostname;
  if (currentHostname !== savedState.hostname) {
    // Hostname changed, remove the state
    await browser.storage.local.remove(`tab_${tabId}`);
    activeTabStates.delete(tabId);
    await updateIcon(tabId, false);
    return;
  }

  // Re-inject if we're still active and on the same hostname
  const isShopify = await checkShopifyHeader(tabId, tab.url);
  if (isShopify) {
    activeTabStates.set(tabId, true);
    await updateIcon(tabId, true);
    await injectScriptsAndStyles(tabId);
  }
});

// Handle extension icon clicks
browser.browserAction.onClicked.addListener(async (tab) => {
  const hostname = new URL(tab.url).hostname;
  const isShopify = await checkShopifyHeader(tab.id, tab.url);

  if (!isShopify) {
    browser.browserAction.setTitle({
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
    await browser.storage.local.set({
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
    await browser.storage.local.remove(`tab_${tab.id}`);
  }
});

// Clean up when a tab is closed
browser.tabs.onRemoved.addListener(async (tabId) => {
  activeTabStates.delete(tabId);
  await browser.storage.local.remove(`tab_${tabId}`);
});

// Handle window closing
browser.windows.onRemoved.addListener(async (windowId) => {
  // Get all tabs in the closing window and clean up their states
  const tabs = await browser.tabs.query({ windowId });
  for (const tab of tabs) {
    activeTabStates.delete(tab.id);
    await browser.storage.local.remove(`tab_${tab.id}`);
  }
});

// Initialize state when the extension starts
browser.runtime.onStartup.addListener(async () => {
  // Clear any stale state
  await browser.storage.local.clear();
  activeTabStates.clear();
});
