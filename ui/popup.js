document.addEventListener("DOMContentLoaded", triggerAction);

async function triggerAction() {
  const messageElement = document.getElementById("message");
  messageElement.textContent = "loading";

  const tab = await chrome.tabs.query({ active: true, currentWindow: true });
  const { id, url } = tab[0];

  const urlEncoded = new URL(url);
  if (urlEncoded.host !== "github.com") {
    messageElement.textContent = "Visit Github please";
    return;
  }

  try {
    console.log("Sending message to content script");
    const response = await chrome.tabs.sendMessage(id, {
      action: "getReview",
    });
    console.log("Response from content script:", response);

    // alert(response);
    if (response && response.ok) {
      messageElement.textContent =
        response.responseData.choices[0].message.content;
    } else {
      messageElement.textContent = "Response not found or empty";
    }
  } catch (error) {
    const errorMessage = error;
    console.error("Error from popup.js:", errorMessage);
    messageElement.textContent = `Error from popup.js: ${errorMessage}"`;
  }
}
