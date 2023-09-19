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

chrome.runtime.onMessage.addListener(async (req, sender, sendResponse) => {
    console.log(sender)
    if (req.action === 'getReview') {
        try {
            const apiUrl = "https://ai-reviewer-server.onrender.com/health";
        
            const response = await fetch(apiUrl,
                {method: 'POST', body: {text: parsedText}
            });
            console.log(response);
        
            if (!response.ok) {
              throw new Error(`Request failed with status: ${response.status}`);
            }
        
            const responseData = await response.json();
            
            sendResponse(responseData);
            // sendResponse(JSON.stringify(responseData));
          } catch (error) {
            console.error("Error:", error);
            sendResponse({ text: "Error: " + error.message });
          }
    }
    sendResponse({ text: `Error: wrong action "${req.action}"` });
});