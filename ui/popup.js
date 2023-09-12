document.addEventListener("DOMContentLoaded", checkHealth);

async function checkHealth () {
  const responseDiv = document.getElementById("message");
  responseDiv.textContent= 'start';

  try {
    const apiUrl = "https://ai-reviewer-server.onrender.com/health";

    responseDiv.textContent = 'loading';

    const response = await fetch(apiUrl);

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