'use strict';

// console.log('devtools.js');

function createSidebarCoveoInsight() {
  chrome.devtools.panels.elements.createSidebarPane('Coveo Insight', function (sidebar) {
    // console.log('initialize sidebar CoveoInsight');

    chrome.devtools.inspectedWindow.eval('getSidebarCoveoInsight()', function (result, isException) {
      if (isException) {
        console.log(isException);
      } else {
        // console.log('set sidebarObject='+result);
        sidebar.setObject(result);
      }
    });

    // sidebar.setPage('devtools_filters.html');
    sidebar.setHeight('8ex');
  });
}
/******************************/

chrome.devtools.panels.create('Coveo', 'images/icon-16.png', 'devtools_panel.html', function (panel) {});

window.addEventListener('load', function load(event) {
  chrome.devtools.inspectedWindow.eval('Coveo.version', function (result, isException) {
    if (isException) {
      // console.log('the page is not using Coveo');
    } else {
      console.log('Coveo JavaScript Search Framework detected: ');
      console.log(result);
      createSidebarCoveoInsight();
    }
  });
}, false);