console.log("Content script is running");

const parsedText = parseTextFromDiv();

chrome.runtime.onMessage.addListener((req, _sender, sendResponse) => {
  if (req.action === "getReview") {
    const apiUrl = "https://apalevich.com/backend/mate/analyze";

    fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({
        text: parsedText,
        name: "dev",
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
        sendResponse({ ok: true, responseData });
      })
      .catch((error) =>
        sendResponse({ ok: false, text: "Error: " + error.message }),
      );

    return true; // keeps the message channel open until sendResponse is called
  } else {
    sendResponse({ ok: false, text: `Error: wrong action "${req.action}"` });
  }

  return true; // keeps the message channel open until sendResponse is called
});

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
