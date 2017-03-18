'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  console.log('previousVersion', details.previousVersion);
});

// console.log('\'Allo \'Allo! Event Page for Browser Action');

// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// This event is fired each time the user updates the text in the omnibox,
// as long as the extension's keyword mode is still active.
chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
  console.log('inputChanged: ' + text);
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
    description: 'Coveo for Salesforce | ' + text
  }, {
    content: text + '&f:spaceFacet=[Coveo%20for%20Sitecore%204.0]',
    description: 'Coveo for Sitecore | ' + text
  }]);
});

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(function (text) {
  if (text == 'status') {
    chrome.notifications.create('', {
      type: 'basic',
      iconUrl: '/images/icon-16.png',
      title: 'my title',
      message: 'my message<a href="https://status.coveo.com">status?</a>'
    });
  } else {
    var action_url = 'https://search.coveo.com/#q=' + text;
    chrome.tabs.create({
      url: action_url
    });
  }
});