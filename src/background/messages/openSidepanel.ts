import type { PlasmoMessaging } from "@plasmohq/messaging";

const handler: PlasmoMessaging.MessageHandler = async (req, _res) => {
    chrome.sidePanel.open({windowId: req.sender.tab.windowId});
}

export default handler