import type { PlasmoCSConfig } from "plasmo";
import { sendToBackground } from "@plasmohq/messaging";
import detectUrlChange from 'detect-url-change';

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true,
};

detectUrlChange.on('change', () => {
  if (document.location.host !== 'github.com') {
    sendToBackground({
      name: "review",
      body: {
        error: "Please, visit GitHub.com to use MATE"
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
          error: "Code not found. Please, open any file in a repository with code to use MATE"
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