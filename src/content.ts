import type { PlasmoCSConfig } from "plasmo";
import { sendToBackground } from "@plasmohq/messaging";
import detectUrlChange from 'detect-url-change';

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true,
};

const openSidepanel = () => {
  sendToBackground({
    name: "openSidepanel",
    extensionId: chrome.runtime.id
  });
};

var buttonContainer = document.querySelector('.SegmentedControl__SegmentedControlList-sc-1rzig82-0.huxtnT');
if (buttonContainer) {
  const div = document.createElement('div');
  div.textContent = 'Click me!';
  div.style.cursor = 'pointer';
  div.addEventListener('click', openSidepanel);
  buttonContainer.appendChild(div);
}


detectUrlChange.on('change', () => {
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