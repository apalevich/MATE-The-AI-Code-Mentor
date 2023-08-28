// chrome.runtime.onInstalled.addListener(() => {
//     chrome.action.setBadgeText({
//       text: "OFF",
//     });
//   });

// const domain = 'https://github.com'

// chrome.action.onClicked.addListener(async (tab) => {
//     console.log(tab);
//     if (tab.url.startsWith(domain)) {
//         // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
//         const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
//         // Next state will always be the opposite
//         const nextState = prevState === 'ON' ? 'OFF' : 'ON'

//         // Set the action badge to the next state
//         await chrome.action.setBadgeText({
//             tabId: tab.id,
//             text: nextState,
//         })
//     }
// });

chrome.action.onClicked.addListener((tab) => {
  if (tab.url && tab.url.startsWith("https://github.com")) {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['content.js']
    });
  }
});
