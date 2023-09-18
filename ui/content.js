function parseTextFromDiv() {
    // Get the div element by its ID
    const divElement = document.getElementById("read-only-cursor-text-area");

    if (divElement) {
        // Get the text content of the div
        const text = divElement.textContent;

        // Do something with the text, for example, log it to the console
        // console.log("Parsed text:", text);

        // Return the parsed text if needed
        return {text, name: 'Developer'};
    } else {
        // Handle the case when the element is not found
        console.error("Element with ID 'read-only-cursor-text-area' not found");
        return null; // or return an error message or handle it as appropriate
    }
}

// Call the function to parse text from the div
const parsedText = parseTextFromDiv();

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
        if (request.action === 'getReview') { 
            console.log(request)
            console.log(sender.tab
                ? `from a content script: ${sender.tab.url}`
                : `from the extension`);
            sendResponse({text: `Hello from Content`});
        }
        sendResponse({text: "UNKNOWN MESSAGE"})
	}
)

// chrome.runtime.onMessage.addListener(
// 	function (request, sender, sendResponse) {
//         if (request === 'getReview') {       
//             console.log(sender.tab
//                 ? `from a content script: ${sender.tab.url}`
//                 : `from the extension`);
//             sendResponse({message: `Hello, ${request.name}`});
//         }
//         sendResponse({message: "UNKNOWN MESSAGE"})
// 	}
// )