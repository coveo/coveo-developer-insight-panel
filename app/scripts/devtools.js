'use strict';

console.log('devtools.js');

chrome.devtools.panels.create('Coveo', 'images/icon-16.png', 'devtools_panel.html', function (panel) {});

window.addEventListener('load', function load(event) {

  chrome.devtools.panels.elements.createSidebarPane('Coveo.Filters', function (sidebar) {
    // sidebar.setExpression(parseJwt('Coveo.SearchEndpoint.endpoints.default.options.accessToken').filter);

    // sidebar.onShown.addListener(function (window) {
    //   console.log(Coveo);
    // });

    // sidebar.setExpression('Coveo.SearchEndpoint.endpoints.default.options.accessToken');

    // sidebar.setPage('devtools_filters.html');
    sidebar.setHeight('8ex');
  });

  chrome.devtools.panels.elements.createSidebarPane('Coveo.UserIdentities', function (sidebar) {
    // sidebar.setExpression(parseJwt('Coveo.SearchEndpoint.endpoints.default.options.accessToken'));
    // sidebar.setObject({
    //   'user identities': [{
    //     'name': '',
    //     'provider': '',
    //     'type': ''
    //   }]
    // });
    // sidebar.setPage('devtools_user_identities.html');
    sidebar.setHeight('8ex');
  });
}, false);