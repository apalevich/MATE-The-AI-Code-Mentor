document.addEventListener("DOMContentLoaded", triggerAction);

async function triggerAction () {
  const messageElement = document.getElementById("message");
  messageElement.textContent = 'loading';

  const tab = await chrome.tabs.query({ active: true, currentWindow: true });
  const { id, url } = tab[0];  
  console.log('🌎: ', url);

  try {
    if (url.includes("github.com")) {
      console.log("Sending message to content script");
      const response = await chrome.tabs.sendMessage(id, {action: 'getReview'});
      console.log('Response from content script:', response);

      if (response && response.text) {
        messageElement.textContent = response.text;
      } else {
        messageElement.textContent = "Response not found or empty";
      };
    } else {
      messageElement.textContent = "Visit Github please";
    }
  } catch (error) {
    console.error("Error:", error);
    messageElement.textContent = "An error occurred while processing the action.";
  }
};
