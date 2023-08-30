chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  const tab = tabs[0];
  const url = tab.url;
  
  const messageElement = document.getElementById("message");
  
  if (url.includes("github.com")) {
    messageElement.textContent = "I can check some code here";
  } else {
    messageElement.textContent = "Visit Github please";
  }
});