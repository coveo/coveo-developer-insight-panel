'use strict';

// console.log('devtools.js');

function createSidebarCoveoInsight() {
  chrome.devtools.panels.elements.createSidebarPane('Coveo', function (sidebar) {
    // console.log('initialize sidebar CoveoInsight');
    var sidebarObject = {};
    /*********************/
    chrome.devtools.inspectedWindow.eval('getSidebarInfo()', function (result, isException) {
      if (isException) {
        console.log(isException);
      } else {
        sidebarObject.info = result;
        /*********************/
        chrome.devtools.inspectedWindow.eval('getSidebarContext()', function (result, isException) {
          if (isException) {
            console.log(isException);
          } else {
            sidebarObject.context = result;
            sidebar.setObject(sidebarObject);
          }
        });
      }
    });

    sidebar.setHeight('8ex');
  });
}
/******************************/

function createSidebarCoveoResults() {
  chrome.devtools.panels.elements.createSidebarPane('Coveo Results', function (sidebar) {
    // console.log('initialize sidebar CoveoResults');
    var sidebarObject = {};
    /*********************/

    chrome.devtools.inspectedWindow.eval('getSidebarResults()', function (result, isException) {
      if (isException) {
        console.log(isException);
      } else {
        sidebarObject = result;
        sidebar.setObject(sidebarObject);
      }
    });

    sidebar.setHeight('8ex');
  });
}
/******************************/

function createSidebarCoveoTemplates() {
  chrome.devtools.panels.elements.createSidebarPane('Coveo Templates', function (sidebar) {
    // console.log('initialize sidebar CoveoTemplates');
    var sidebarObject = {};
    /*********************/
    chrome.devtools.inspectedWindow.eval('getSidebarTemplates()', function (result, isException) {
      if (isException) {
        console.log(isException);
      } else {
        sidebarObject = result;
        sidebar.setObject(sidebarObject);
      }
    });

    sidebar.setHeight('8ex');
  });
}

/******************************/

function createSidebarCoveoComponents() {
  chrome.devtools.panels.elements.createSidebarPane('Coveo Components', function (sidebar) {
    // console.log('initialize sidebar CoveoComponents');
    var sidebarObject = {};
    /*********************/
    chrome.devtools.inspectedWindow.eval('getSidebarComponents()', function (result, isException) {
      if (isException) {
        console.log(isException);
      } else {
        sidebarObject = result;
        sidebar.setObject(sidebarObject);
      }
    });

    sidebar.setHeight('8ex');
  });
}
/******************************/

/**
 * Create Panel
 */
chrome.devtools.panels.create('Coveo', 'images/icon-16.png', 'devtools_panel.html', function (panel) {});

/**
 * Initialize Devtools
 */
chrome.devtools.inspectedWindow.eval('Coveo.version', function (result, isException) {
  if (isException) {
    // console.log('the page is not using Coveo');
  } else {
    console.log('Coveo JavaScript Search Framework detected: ');
    console.log(result);
    createSidebarCoveoInsight();
    createSidebarCoveoComponents();
    createSidebarCoveoTemplates();
    createSidebarCoveoResults();
  }
});