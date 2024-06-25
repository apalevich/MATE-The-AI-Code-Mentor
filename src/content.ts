import type { PlasmoCSConfig } from "plasmo";

import { sendToBackground } from "@plasmohq/messaging";
import detectUrlChange from 'detect-url-change';

export const config: PlasmoCSConfig = {
  matches: ["https://*.github.com/*"],
  all_frames: true,
};

detectUrlChange.on('change', () => {
  createButton();

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
        filename: location.pathname.split('/').pop() || '',
        parsedCode: parsedText,
      },
      extensionId: chrome.runtime.id
    });
  }, 1000);
  return false
})

function createButton() {
  var container = document.querySelector('.react-blob-header-edit-and-raw-actions');
  if (container && !container.querySelector('#mate-extension-button')) {
    const div = document.createElement('div');
    const element = `<button class="Button--primary Button--small Button" style="text-wrap: nowrap;" type="button" id="mate-extension-button">AI Code Review</button>`;
    const openSidepanel = () => {
      sendToBackground({
        name: "openSidepanel",
        extensionId: chrome.runtime.id
      });
    };
    
    div.innerHTML = element;
    div.style.cursor = 'pointer';
    div.addEventListener('click', openSidepanel);
    container.prepend(div);
  } else {
    setTimeout(createButton, 100)
  }
}