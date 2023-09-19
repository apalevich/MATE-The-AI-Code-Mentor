function parseTextFromDiv() {
    const divElement = document.getElementById("read-only-cursor-text-area");

    if (divElement) {
        const text = divElement.textContent;
        return {text, name: 'Developer'};
    } else {
        console.error("Element with ID 'read-only-cursor-text-area' not found");
        return null;
    }
}

const parsedText = parseTextFromDiv();

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getReview') {
        console.log(request);
        console.log(sender.tab
            ? `from a content script: ${sender.tab.url}`
            : `from the extension`);
        sendResponse({ text: `Hello from Content` });
    }
    sendResponse({ text: `Error: wrong action "${request.action}"` });
});