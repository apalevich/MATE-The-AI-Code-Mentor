console.log("Content script is running");

const parsedText = parseTextFromDiv();
const domain = "https://apalevich.com/backend/";
let cache = null;

function handleGetReview() {
  const apiUrl = `${domain}mate/analyze`;

  return fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({ content: parsedText }),
    headers: { "Content-Type": "application/json" }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }
    return response.json();
  })
  .then(responseData => {
    const resultsWrapper = { ok: true, responseData };
    return resultsWrapper;
  })
  .catch(error => {
    return { ok: false, text: "Error: " + error.message };
  });
}

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

    handleGetReview()
    .then(result => {
      cache = result;
      sendResponse(result);
    });

    return true; // keeps the message channel open until sendResponse is called
  } else {
    sendResponse({ ok: false, text: `Error: wrong action "${req.action}"` });
    return true; // keeps the message channel open until sendResponse is called
  }
});

function parseTextFromDiv() {
  const divElement = document.getElementById("read-only-cursor-text-area");
  return divElement ? divElement.textContent : null;
}
