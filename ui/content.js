console.log("Content script is running");

const parsedText = parseTextFromDiv();

const domain = "http://localhost:8000/";
// const domain = "https://apalevich.com/backend/";

let cache = chrome.runtime.onMessage.addListener(
  (req, _sender, sendResponse) => {
    if (req.action === "getReview") {
      if (cache) {
        sendResponse(cache);
        return true;
      }

      const apiUrl = `${domain}mate/analyze`;

      fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify({
          content: parsedText,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            alert(`Request failed with status: ${response.status}`);
            throw new Error(`Request failed with status: ${response.status}`);
          }
          return response.json();
        })
        .then((responseData) => {
          const resultsWrapper = { ok: true, responseData };
          cache = resultsWrapper;
          sendResponse(resultsWrapper);
        })
        .catch((error) =>
          sendResponse({ ok: false, text: "Error: " + error.message }),
        );

      return true; // keeps the message channel open until sendResponse is called
    } else {
      sendResponse({ ok: false, text: `Error: wrong action "${req.action}"` });
    }

    return true; // keeps the message channel open until sendResponse is called
  },
);

function parseTextFromDiv() {
  const divElement = document.getElementById("read-only-cursor-text-area");
  if (divElement) {
    const text = divElement.textContent;
    return text;
  } else {
    console.error("Element with ID 'read-only-cursor-text-area' not found");
    return null;
  }
}
