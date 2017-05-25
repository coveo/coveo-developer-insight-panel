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

function getSidebarInfo() {
  function getVersion() {
    return Coveo.version;
  }

  function getEndpoints() {
    var endpointsObject = {};
    var endpoints = Coveo.SearchEndpoint.endpoints;

    for (var key in endpoints) {
      if (endpoints.hasOwnProperty(key)) {
        endpointsObject[key] = {};
        endpointsObject[key].options = endpoints[key].options;
        endpointsObject[key].options.accessTokenDecoded = parseJwt(endpoints[key].options.accessToken);
      }
    }

    return endpointsObject;
  }

  var sidebarObject = {
    version: {},
    endpoints: {}
  };

  try {
    sidebarObject.version = getVersion();
    sidebarObject.endpoints = getEndpoints();
  } catch (error) {
    console.log('error', error);
  }
  console.log('getSidebarInfo sidebarObject', sidebarObject);

  return sidebarObject;
} //END getSidebarInfo

function getSidebarComponents() {
  function getCoveoFacetComponents() {
    var coveoFacetComponentsObject = [];
    var coveoFacetComponents = document.querySelector('.CoveoSearchInterface').CoveoBoundComponents[0].attachedComponents.Facet;
    for (facet in coveoFacetComponents) {
      if (coveoFacetComponents[facet].element) {
        coveoFacetComponentsObject.push(JSON.parse(JSON.stringify(coveoFacetComponents[facet].element.dataset)));
      }
    }
    return coveoFacetComponentsObject;
  }

  function getCoveoTabComponents() {
    var coveoTabComponentsObject = [];
    var coveoTabComponents = document.querySelector('.CoveoSearchInterface').CoveoBoundComponents[0].attachedComponents.Tab;
    for (tab in coveoTabComponents) {
      if (coveoTabComponents[tab].element) {
        coveoTabComponentsObject.push(JSON.parse(JSON.stringify(coveoTabComponents[tab].element.dataset)));
      }
    }
    return coveoTabComponentsObject;
  }

  function getCoveoSortComponents() {
    var coveoSortComponentsObject = [];
    var coveoSortComponents = document.querySelector('.CoveoSearchInterface').CoveoBoundComponents[0].attachedComponents.Sort;
    for (Sort in coveoSortComponents) {
      if (coveoSortComponents[Sort].element) {
        coveoSortComponentsObject.push(JSON.parse(JSON.stringify(coveoSortComponents[Sort].element.dataset)));
      }
    }
    return coveoSortComponentsObject;
  }

  var sidebarObject = {
    facets: [],
    tabs: [],
    sorts: []
  };

  try {
    sidebarObject.facets = getCoveoFacetComponents();
    sidebarObject.tabs = getCoveoTabComponents();
    sidebarObject.sorts = getCoveoSortComponents();
  } catch (error) {
    console.log('error', error);
  }
  console.log('getSidebarComponents', sidebarObject);

  return sidebarObject;
} //END getSidebarComponents

function getSidebarResults() {
  function getCoveoResults() {
    var results = [];
    var coveoResultLists = document.querySelector('.CoveoSearchInterface').CoveoBoundComponents[0].attachedComponents.ResultList;

    // console.log('coveoResultLists',coveoResultLists);
    for (resultList in coveoResultLists) {
      // console.log('coveoResultLists[resultList]',coveoResultLists[resultList]);
      if (coveoResultLists[resultList].currentlyDisplayedResults) {
        results = results.concat(coveoResultLists[resultList].currentlyDisplayedResults);
      }
    }
    return results;
  }

  var sidebarObject = {
    results: []
  };

  try {
    sidebarObject.results = getCoveoResults();
  } catch (error) {
    console.log('error', error);
  }
  console.log('getSidebarResults sidebarObject', sidebarObject);

  return sidebarObject.results;
} //END getSidebarResults

function getSidebarTemplates() {
  function getCoveoResultTemplates() {
    var coveoResultTemplates = [];
    var coveoResultLists = document.querySelector('.CoveoSearchInterface').CoveoBoundComponents[0].attachedComponents.ResultList;
    // console.log('coveoResultLists',coveoResultLists);
    for (resultList in coveoResultLists) {
      // console.log('coveoResultLists[resultList]',coveoResultLists[resultList]);
      if (coveoResultLists[resultList].element) {
        var resultTemplates = coveoResultLists[resultList].element.children;
        // console.log('resultTemplates', resultTemplates);
        // console.log('JSON.stringify(resultTemplates)', JSON.stringify(resultTemplates));
        // console.log('JSON.parse(JSON.stringify(resultTemplates))', JSON.parse(JSON.stringify(resultTemplates)));

        for (var i = 0; i < resultTemplates.length; i++) {
          if (resultTemplates[i].id) {
            // console.log('resultTemplates[resultTemplate].id', resultTemplates[i].id);
            // console.log('resultTemplates[resultTemplate].dataset.condition', resultTemplates[i].dataset.condition);
            // console.log('{' + resultTemplates[i].id + ':"' + resultTemplates[i].dataset.condition + '"}');
            // console.log(JSON.parse('{"' + resultTemplates[i].id + '":"' + resultTemplates[i].dataset.condition + '"}'));
            coveoResultTemplates.push({title:resultTemplates[i].id,condition: resultTemplates[i].dataset.condition});
          }
        }
      }
    }
    return coveoResultTemplates;
  }

  var sidebarObject = {
    resultTemplates: []
  };

  try {
    sidebarObject.resultTemplates = getCoveoResultTemplates();
  } catch (error) {
    console.log('error', error);
  }
  console.log('getSidebarTemplates sidebarObject', sidebarObject);

  return sidebarObject.resultTemplates;
} //END getSidebarTemplates

function getSidebarContext() {
  function getSfdcContext() {
    return Coveo.context;
  }

  function getCustomContext() {
    return Coveo.CustomContext;
  }

  var sidebarObject = {
    sfdc: {},
    custom: {}
  };

  try {
    sidebarObject.sfdc = getSfdcContext();
    sidebarObject.custom = getCustomContext();
  } catch (error) {
    console.log('error', error);
  }
  console.log('getSidebarContext sidebarObject', sidebarObject);

  return sidebarObject;
} //END getSidebarContext


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
  script.appendChild(document.createTextNode(getSidebarInfo));
  script.appendChild(document.createTextNode(getSidebarComponents));
  script.appendChild(document.createTextNode(getSidebarResults));
  script.appendChild(document.createTextNode(getSidebarTemplates));  
  script.appendChild(document.createTextNode(getSidebarContext));
  script.appendChild(document.createTextNode(getJSUIComponentsOptions));
  // script.appendChild(document.createTextNode('(' + updateJsonData + ')();'));
  // script.appendChild(document.createTextNode('(' + getJSUIComponentsOptions + ')();'));
  script.appendChild(document.createTextNode('(' + initCoveoDeveloperInsightPanel + ')();'));
  (document.body || document.head || document.documentElement).appendChild(script);

  // chrome.runtime.sendMessage({
  //   isCoveoSearchInterface: true
  // }, function (response) {
  //   console.log(response);
  // });

}, false);