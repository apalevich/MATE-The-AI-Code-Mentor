const { MateService } = require("./mate-service");

const parsedText = parseTextFromDiv();
let cache = null;

const service = new MateService(parsedText);

chrome.runtime.onMessage.addListener((req, _sender, sendResponse) => {
  if (req.action === "getReview") {
    if (!parsedText) {
      sendResponse({ ok: false, text: "Error: No code found on the webpage" });
      return true;
    }

    if (cache) {
      sendResponse(cache);
      return true;
    }

    service.getReview()
    .then(result => {
      cache = result;
      sendResponse(result);
      return true;
    });

    return true; 
  } else {
    sendResponse({ ok: false, text: `Error: wrong action "${req.action}"` });
    return true; 
  }
});

function parseTextFromDiv() {
  const divElement = document.getElementById("read-only-cursor-text-area");
  return divElement ? divElement.textContent : null;
}
