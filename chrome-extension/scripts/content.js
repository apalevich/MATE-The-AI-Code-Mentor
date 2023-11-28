

const MateService = require('../services/mate-service.js');

const service = new MateService();
cachedReview = null;

const actions = {
  'getReview': function (sendResponse) {
    if (cachedReview && cachedReview.ok) {
      alert(cachedReview);
      sendResponse(cachedReview);
      return true;
    }

    service.getReview
    .then((responseData) => {
      const resultsWrapper = { ok: true, responseData };
      cachedReview = resultsWrapper;
      sendResponse(resultsWrapper);
    })
    .catch((error) =>
      sendResponse({ ok: false, text: "Error: " + error.message }),
    );

    return true; // keeps the message channel open until sendResponse is called
  }
};

chrome.runtime.onMessage.addListener((req, _sender, sendResponse) => {
  try {
    alert(req.action)
    actions[req.action](sendResponse);
  } catch (error) {
    sendResponse({ ok: false, text: `Error: wrong action "${req.action}"` });
  }  
});