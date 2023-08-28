function extractContent() {
    const elem = document.getElementById('read-only-cursor-text-area');
    return elem ? elem.textContent : null;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
if (message.action === 'extractContent') {
    const content = extractContent();
    sendResponse(content);
}
});
  