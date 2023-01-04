let timer = null;
let elapsedTime = 0;

chrome.browserAction.onClicked.addListener(function(tab) {
  if (timer === null) {
    timer = setInterval(function() {
      elapsedTime += 1000;
    }, 1000);
  } else {
    clearInterval(timer);
    timer = null;
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === 'getElapsedTime') {
    sendResponse({ elapsedTime: elapsedTime });
  } else if (request.type === 'resetTime') {
    elapsedTime = 0;
    sendResponse({ elapsedTime: elapsedTime });
  }
});