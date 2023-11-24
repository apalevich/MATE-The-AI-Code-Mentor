document.addEventListener("DOMContentLoaded", triggerAction);

// const messageElement = document.querySelector(".page");
const loadingAnimationContainer = document.getElementById("loading-animation");
const resultContainer = document.getElementById("result");
const resultFeedback = document.getElementById("feedback");
const resultPositive = document.getElementById("positive");
const resultNegative = document.getElementById("negative");
const resultSuggestion = document.getElementById("suggestion");

const toggleContainers = () => {
  loadingAnimationContainer.classList.toggle("hidden");
  resultContainer.classList.toggle("hidden");
};

const generateList = (arr) => {
  if (!arr.length) return "Нет замечаний";

  const items = arr.reduce((acc, cur) => acc + `<li>${cur}</li>`, "");
  return `<ol>${items}</ol>`;
};

async function triggerAction() {
  // messageElement.textContent = "loading";
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

    if (response && response.ok) {
      const { feedback, positive, negative, suggestion } = JSON.parse(
        response.responseData.choices[0].message.content,
      );

      resultFeedback.textContent = feedback;
      resultPositive.innerHTML = generateList(positive);
      resultNegative.innerHTML = generateList(negative);
      resultSuggestion.textContent = suggestion;
      console.log(response);
    } else {
      resultContainer = "Response not found or empty";
      console.log(response);
    }
  } catch (error) {
    const errorMessage = error;
    console.error("Error from popup.js:", errorMessage);
    messageElement.textContent = `Error from popup.js: ${errorMessage}"`;
  }
  toggleContainers();
}
