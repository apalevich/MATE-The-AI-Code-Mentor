document.addEventListener("DOMContentLoaded", triggerAction());

async function checkHealth () {
  const responseDiv = document.getElementById("message");
  responseDiv.textContent= 'start';

  try {
    // const apiUrl = "https://ai-reviewer-server.onrender.com/health";

    responseDiv.textContent = 'loading';

    // const response = await fetch(apiUrl);
    const response = await chrome.runtime.sendMessage('getReview');
	  console.log(response);

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const responseData = await response.json();
    responseDiv.textContent = JSON.stringify(responseData.result);
  } catch (error) {
    console.error("Error:", error);
    responseDiv.textContent = "Error: " + error.message;
  }
};

// async function triggerAction (actionName) {
// 	// получаем данные вкладки
// 	const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
// 	// посылаем сообщения во вкладку
// 	const response = await chrome.tabs.sendMessage(tab.id, {action: actionName});
// 	console.log(response);
// };

async function triggerAction () {
  const tab = await chrome.tabs.query({ active: true, currentWindow: true });
  const { id, url } = tab[0];
    
  console.log('🌎: ', url);
  try {
    if (url.includes("github.com")) {
      const messageElement = document.getElementById("message");
      const response = await chrome.tabs.sendMessage(id, {action: 'getReview'});
      
      console.log('response:', response);

      if (response && response.text) {
        messageElement.textContent = response.text;
      } else {
        messageElement.textContent = "Element not found or empty";
      };
    } else {
      messageElement.textContent = "Visit Github please";
    }
  } catch (error) {
    console.error("Error:", error);
    // Handle the error as needed, e.g., show an error message in the popup
    const messageElement = document.getElementById("message");
    messageElement.textContent = "An error occurred while processing the action.";
  }
};
