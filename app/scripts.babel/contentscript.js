'use strict';

// console.log('contentscript.js');

var port = chrome.runtime.connect();

window.addEventListener('message', function (event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == 'FROM_PAGE')) {
    console.log('Content script received: ' + event.data.text);
    //port.postMessage(event.data.text);
  }
}, false);

function parseJwt(token) {
  try {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  } catch (err) {
    return token;
  }
}

function getSidebarCoveoInsight() {
  function getVersion() {
    return Coveo.version;
  }

  function getEndpointDefaultOptions() {
    return Coveo.SearchEndpoint.endpoints.default.options;
  }

  function getAccessToken() {
    return parseJwt(Coveo.SearchEndpoint.endpoints.default.options.accessToken);
  }

  function getSfdcContext() {
    return Coveo.context;
  }

  function getCustomContext() {
    return Coveo.CustomContext;
  }

  var sidebarObject = {
    version: {},
    endpointDefaultOptions: {},
    accessToken: {},
    sfdcContext: {},
    customContext: {}
  };

  sidebarObject.version = getVersion();
  sidebarObject.endpointDefaultOptions = getEndpointDefaultOptions();
  sidebarObject.accessToken = getAccessToken();
  sidebarObject.sfdcContext = getSfdcContext();
  sidebarObject.customContext = getCustomContext();

  return sidebarObject;
}

function initCoveoDeveloperInsightPanel() {
  if (Coveo.version) {
    console.log('Coveo JavaScript Search Framework detected: ');
    console.log(Coveo.version);
    var CoveoDeveloperInsightPanel = document.createElement('div');
    CoveoDeveloperInsightPanel.id = 'CoveoDeveloperInsightPanel';
    CoveoDeveloperInsightPanel.className = 'json-data';
    document.body.appendChild(CoveoDeveloperInsightPanel);
  }
}

// function updateJsonData() {
//   var CoveoDeveloperInsightPanel = document.getElementById('CoveoDeveloperInsightPanel');
//   CoveoDeveloperInsightPanel.dataset.jsonData = '{}';

//   window.postMessage({
//     type: 'FROM_PAGE',
//     text: 'hello'
//   }, '*');
// }

window.addEventListener('load', function load(event) {
  // initCoveoDeveloperInsightPanel();
  var script = document.createElement('script');
  script.appendChild(document.createTextNode(parseJwt));
  // script.appendChild(document.createTextNode(updateJsonData));
  script.appendChild(document.createTextNode(getSidebarCoveoInsight));
  // script.appendChild(document.createTextNode('(' + updateJsonData + ')();'));
  script.appendChild(document.createTextNode('(' + initCoveoDeveloperInsightPanel + ')();'));
  (document.body || document.head || document.documentElement).appendChild(script);

  // chrome.runtime.sendMessage({
  //   isCoveoSearchInterface: true
  // }, function (response) {
  //   console.log(response);
  // });

}, false);