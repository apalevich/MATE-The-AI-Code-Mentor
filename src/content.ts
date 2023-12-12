import type { PlasmoCSConfig } from "plasmo"
import { sendToBackground } from "@plasmohq/messaging"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: true,
}

// function parseTextFromDiv() {
//   const divElement = document.getElementById("read-only-cursor-text-area");
//   return divElement ? divElement.textContent : null;
// }



window.addEventListener("load", () => {
  const parsedText = document.getElementById("read-only-cursor-text-area").textContent;

  sendToBackground({
    name: "ping",
    body: {
      content: parsedText
    },
    extensionId: 'edcpancigdlgfpmehjdhfhhkafblmekg'
  })
})