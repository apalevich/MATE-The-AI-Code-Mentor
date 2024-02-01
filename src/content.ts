import type { PlasmoCSConfig } from "plasmo";
import { sendToBackground } from "@plasmohq/messaging";
import detectUrlChange from 'detect-url-change';

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true,
};

detectUrlChange.on('change', () => {
  setTimeout(()=> {
    const parsedText = document.getElementById("read-only-cursor-text-area")?.textContent;
    
    if (parsedText) {
      sendToBackground({
        name: "review",
        body: {
          content: parsedText
        },
        extensionId: chrome.runtime.id
      });
    }
  }, 1000);
  return false
})