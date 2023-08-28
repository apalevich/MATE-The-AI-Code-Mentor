// document.getElementById("start").addEventListener("click", async () => {
//     const resultDiv = document.getElementById("result");
//     resultDiv.innerText = "Loading...";

//     const codeContent = await fetchCodeFromGitHub();
//     if(!codeContent) {
//         resultDiv.innerText = "Not a valid GitHub code page.";
//         return;
//     }

//     try {
//         const response = await fetch('YOUR_BACKEND_URL', {
//             method: 'POST',
//             body: JSON.stringify({ code: codeContent }),
//             headers: { 'Content-Type': 'application/json' }
//         });
        
//         const data = await response.json();
//         resultDiv.innerText = data.result;
//     } catch(error) {
//         resultDiv.innerText = "Error processing code.";
//     }
// });

// async function fetchCodeFromGitHub() {
//     // Fetch the code content using Chrome Extension's APIs
//     // If not GitHub or not code, return null or an appropriate message
// }

// const tabs = await chrome.tabs.query({
//     url: [
//       "https://developer.chrome.com/docs/webstore/*",
//       "https://developer.chrome.com/docs/extensions/*",
//     ],
//   });

document.getElementById('startButton').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const currentTab = tabs[0];
      chrome.scripting.executeScript({
        target: {tabId: currentTab.id},
        files: ['content.js']
      }, () => {
        chrome.tabs.sendMessage(currentTab.id, {action: 'extractContent'}, function(response) {
          document.getElementById('result').textContent = response || 'No content found.';
        });
      });
    });
  });
  