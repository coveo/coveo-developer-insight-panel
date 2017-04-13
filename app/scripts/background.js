'use strict';

var notificationIdCoveoStatus;

var omniboxCmd = {
  'jsui doc': 'https://coveo.github.io/search-ui/globals.html',
  'status v1': 'http://status.coveo.com/',
  'status v2': 'http://status.cloud.coveo.com/',
  'how-to': 'https://coveord.atlassian.net/wiki/display/PS/SS+Cookbook',
  'code': 'https://bitbucket.org/coveord/',
  'tsfdc': 'https://test.salesforce.com/',
  'psfdc': 'https://login.salesforce.com/',
  'ces': 'https://ces.corp.coveo.com/js/',
  'releases': 'http://releasedashboard/',
  'swgr1': 'https://cloudplatform.coveo.com/docs/',
  'swgr2': 'https://platform.cloud.coveo.com/docs#!/'
};

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

// console.log('\'Allo \'Allo! Event Page for Browser Action');

// This event is fired each time the user updates the text in the omnibox,
// as long as the extension's keyword mode is still active.
chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
  // console.log('inputChanged: ' + text);
  //call rest api
  suggest([{
    content: text + '&f:spaceFacet=[Coveo%20Cloud%20V2]',
    description: 'Cloud V2 | ' + text
  }, {
    content: text + '&f:spaceFacet=[JavaScript%20Search%20Framework%20V1]',
    description: 'JavaScript Search Framework | ' + text
  }, {
    content: text + '&f:sourceFacet=[Web%20-%20JsSearchRef]',
    description: 'JavaScript Search Component | ' + text
  }, {
    content: text + '&f:spaceFacet=[Salesforce%20Integration%20V2]',
    description: 'Salesforce | ' + text
  }, {
    content: text + '&f:spaceFacet=[Coveo%20for%20Sitecore%204.0]',
    description: 'Sitecore | ' + text
  }]);
});

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(function (text) {
  if (text == 'status') {
    chrome.notifications.create('', {
      type: 'basic',
      iconUrl: '/images/symbol.png',
      title: 'Coveo Cloud Status',
      message: 'This should display the status of Coveo Cloud',
      buttons: [{
        title: 'more informations...'
      }]
    }, function (notificationId) {
      notificationIdCoveoStatus = notificationId;
    });
  } else if (omniboxCmd[text]) {
    chrome.tabs.create({
      url: omniboxCmd[text]
    });
  } else {
    chrome.tabs.create({
      url: 'https://search.coveo.com/#q=' + text
    });
  }
});

chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
  if (notificationIdCoveoStatus == notificationId && buttonIndex == 0) {
    //coveo status: btn details
    chrome.tabs.create({
      url: 'http://status.coveo.com/'
    });
  }
});

// chrome.runtime.onMessage.addListener(
//   function (request, sender, sendResponse) {
//     console.log(sender.tab ?
//       'from a content script:' + sender.tab.url :
//       'from the extension');
//     if (request.greeting == 'hello') {
//       sendResponse({
//         farewell: 'goodbye'
//       });
//     }

//      if (request.isCoveoSearchInterface) {
//       sendResponse({
//         Coveo: 'background.js responding'
//       });
//     }
//   });