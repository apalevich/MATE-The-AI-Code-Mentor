console.log("Content script is running");

const parsedText = parseTextFromDiv();

chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    (async () => {
        if (req.action === 'getReview') {
            try {
                const apiUrl = "http://localhost:8000/mate/analyze";
            
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    body: JSON.stringify({
                        text: parsedText,
                        name: 'dev'
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                console.log(response);
            
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
            
                const responseData = await response.json();
                
                console.log(responseData);
                // sendResponse(responseData);
                // sendResponse(JSON.stringify(responseData));
            } catch (error) {
                console.error("Error:", error);
                sendResponse({ text: "Error: " + error.message });
            }
        }
        sendResponse({ text: `Error: wrong action "${req.action}"` })})();
    return true;
});

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