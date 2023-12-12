import type { PlasmoCSConfig } from "plasmo"
import { sendToBackground } from "@plasmohq/messaging"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true,
}

window.addEventListener("load", () => {
  const parsedText = document.getElementById("read-only-cursor-text-area")?.textContent;

  sendToBackground({
    name: "review",
    body: {
      content: parsedText
    },
    extensionId: chrome.runtime.id
  })
})