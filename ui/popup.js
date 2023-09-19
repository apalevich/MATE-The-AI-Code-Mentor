document.addEventListener("DOMContentLoaded", triggerAction());

async function checkHealth () {
  const responseDiv = document.getElementById("message");
  responseDiv.textContent= 'start';

  try {
    const apiUrl = "https://ai-reviewer-server.onrender.com/health";

    responseDiv.textContent = 'loading';

    const response = await fetch(apiUrl);
	  console.log(response);

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const responseData = await response.json();
    responseDiv.textContent = JSON.stringify(responseData.text);
  } catch (error) {
    console.error("Error:", error);
    responseDiv.textContent = "Error: " + error.message;
  }
};

async function triggerAction () {
  const messageElement = document.getElementById("message");
  messageElement.textContent = 'loading';

  const tab = await chrome.tabs.query({ active: true, currentWindow: true });
  const { id, url } = tab[0];  
  console.log('🌎: ', url);

  try {
    if (url.includes("github.com")) {
      
      const response = await chrome.tabs.sendMessage(id, {action: 'getReview'});
      
      console.log('response:', response);

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
