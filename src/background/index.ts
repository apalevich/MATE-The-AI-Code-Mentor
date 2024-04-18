chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: false })

chrome.tabs.onUpdated.addListener(async (tabId, _, tab) => {
    if (tab.url?.startsWith('https://github.com') && tab.url.includes('blob')) {
        await chrome.sidePanel.setOptions({
            tabId,
            enabled: true
        });
        return;
    }
    
    // Disables the side panel on all other sites
    await chrome.sidePanel.setOptions({
        tabId,
        enabled: false
    });
});