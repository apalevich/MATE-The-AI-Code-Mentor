import type { PlasmoCSConfig } from "plasmo";
import { sendToBackground } from "@plasmohq/messaging";
import detectUrlChange from 'detect-url-change';

export const config: PlasmoCSConfig = {
  matches: ["https://*.github.com/*"],
  all_frames: true,
};

const openSidepanel = () => {
  sendToBackground({
    name: "openSidepanel",
    extensionId: chrome.runtime.id
  });
};

detectUrlChange.on('change', () => {
  var buttonContainer = document.querySelector('.react-blob-header-edit-and-raw-actions');
  if (buttonContainer) {
    const div = document.createElement('div');
    const element = `<button class="Button--primary Button--small Button" type="button">AI Code Review</button>`;

    div.innerHTML = element;
    div.style.cursor = 'pointer';
    div.addEventListener('click', openSidepanel);
    buttonContainer.prepend(div);
  }


  if (document.location.host !== 'github.com') {
    sendToBackground({
      name: "review",
      body: {
        error: {message: "Please, visit GitHub.com to use MATE"}
      },
      extensionId: chrome.runtime.id
    });
    return false;
  }
  setTimeout(()=> {
    const parsedText = document.getElementById("read-only-cursor-text-area")?.textContent;

    if (!parsedText) {
      sendToBackground({
        name: "review",
        body: {
          error: {message: "Code not found. Please, open any file in a repository with code to use MATE"}
        },
        extensionId: chrome.runtime.id
      });
      return false;
    }
    
    sendToBackground({
      name: "review",
      body: {
        content: parsedText
      },
      extensionId: chrome.runtime.id
    });
  }, 1000);
  return false
})