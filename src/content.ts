import type { PlasmoCSConfig } from "plasmo";
import type { ErrorType, RequestType } from "~types/types";
import type { User } from "@supabase/supabase-js";
import type { PlasmoMessaging } from "@plasmohq/messaging";

import { sendToBackground } from "@plasmohq/messaging";
import detectUrlChange from 'detect-url-change';
import { Storage } from "@plasmohq/storage";

export const config: PlasmoCSConfig = {
  matches: ["https://*.github.com/*"],
  all_frames: true,
};

const storage = new Storage()

const getUser = async(): Promise<User> => {
  const user = await storage.get<User>('user');
  return user;
}

detectUrlChange.on('change', async () => {
  if (document.location.host !== 'github.com') {
    const payload = {
      message: "Please, visit GitHub.com to use MATE",
      button: {
        url: 'https://github.com/facebook/react/blob/main/scripts/rollup/utils.js',
        text: 'Open example'
      }  
    };
    sendToBackground({
      name: 'review',
      body: payload,
      extensionId: process.env.CRX_IR
    });
    return false;
  };

  createButton();
  setTimeout(()=> {
    const parsedText = document.getElementById("read-only-cursor-text-area")?.textContent;

    if (!parsedText) {
      sendToBackground({
        name: "review",
        body: {
          error: {
            message: "Code not found. Please, open any file in a repository with code and try again",
            button: {
              url: 'https://github.com/facebook/react/blob/main/scripts/rollup/utils.js',
              text: 'Open example'
            }
          }
        },
        extensionId: chrome.runtime.id
      });
      return false;
    }
    
    getUser()
    .then(user => {
      if (user?.id) {  
        const payload: RequestType = {
          filename: location.pathname.split('/').pop() || '',
          parsedCode: parsedText,
          user_id: user.id
        };
        sendToBackground({
          name: "review",
          body: payload,
          extensionId: chrome.runtime.id
        });
      } else {
        sendToBackground({
          name: "review",
          body: {
            error: {message: "User not found"}
          },
          extensionId: chrome.runtime.id
        });
      }
    })
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