'use strict';

// console.log('popup.js');

var firstQuery = true;

chrome.runtime.onMessage.addListener(function (request, sender) {
  if (request.action == 'getSource') {
    var searchInterface = Coveo.$('#search');

    searchInterface.on('buildingQuery', function (e, args) {
      args.queryBuilder.advancedExpression.add('$qre(expression:' + request.source + ', modifier:1000)');

      if (firstQuery) {
        args.queryBuilder.expression.add(request.source);
        firstQuery = false;
      }
    });
    // searchInterface.coveo('init', {});
     Coveo.init(document.body);
  }
});

document.addEventListener('DOMContentLoaded', function () {
  Coveo.SearchEndpoint.endpoints['default'] = new Coveo.SearchEndpoint({
    restUri: 'https://cloudplatform.coveo.com/rest/search',
    accessToken: '7b9b9300-3901-437b-bafd-51ae596f1b16',
    anonymous: false,
    queryStringArguments: {
      searchHub: 'SearchCoveoTechnicalDocumentation'
    }
  });  

  chrome.tabs.executeScript(null, {
    code: '(function () {chrome.runtime.sendMessage({action: "getSource",source: document.title});})()'
  }, function () {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      console.log('There was an error injecting script : \n' + chrome.runtime.lastError.message);
    }
  });
});