'use strict';

// console.log('\'Allo \'Allo! Popup');
chrome.tabs.query({
  active: true,
  currentWindow: true
}, function (tabs) {
  var tab = tabs[0];
  console.log(tab.url, tab.title);
  chrome.tabs.getSelected(null, function (tab) {
    chrome.tabs.sendMessage(tab.id, {
      existJSSearchUI: true
    }, function (msg) {
      msg = msg || {};
      console.log('onResponse', msg);
    });

    chrome.tabs.executeScript(tab.id, {
      code: 'console.log("executescript");'
    }, function (response) {});

  });
});