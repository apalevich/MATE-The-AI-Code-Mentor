document.addEventListener("DOMContentLoaded", triggerAction);

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
  const tab = await chrome.tabs.query({ active: true, currentWindow: true });
  const { id, url } = tab[0];

  if (!tab[0]) {
    resultContainer.innerHTML = "Error detecting the browser tab";
    return false;
  }

  const urlEncoded = new URL(url);
  if (urlEncoded.host !== "github.com") {
    resultContainer.innerHTML = "<h1>Visit Github please</h1>";
    toggleContainers();
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
      resultFeedback.innerHTML = `<h1>Bad response</h1><div>${response.text}</div>`;
      console.log(response);
    }
  } catch (error) {
    console.error("Error from popup.js:", error);
    resultFeedback.textContent = `Error from popup.js: ${error}"`;
  }
  toggleContainers();
}

document.querySelector("#links form").onsubmit = (e) => {
  document.getElementById("log").classList.toggle("hidden");
  document.querySelector("#links form").classList.toggle("hidden");
};
