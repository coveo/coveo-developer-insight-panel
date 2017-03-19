'use strict';

// window.onload = function () {
//   chrome.runtime.onMessage.addListener(function (msg, _, sendResponse) {
//     console.log('onMessage', msg);
//     if (msg.existJSSearchUI) {
//       debugger;
//       //sendResponse(document.getElementById('mybutton').innerHTML);

//       if (Coveo) {
//         sendResponse({
//           coveoJSSearchUI: 'exists'
//         });
//       }
//     }

//   });
// };

function getCoveo() {
  return 'getCoveo';
}

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

var script = document.createElement('script');
// script.appendChild(document.createTextNode('(' + getCoveo + ')();'));
script.appendChild(document.createTextNode(getCoveo));
script.appendChild(document.createTextNode(parseJwt));
(document.body || document.head || document.documentElement).appendChild(script);

window.addEventListener('load', function load(event) {
  chrome.runtime.onMessage.addListener(function (msg, _, sendResponse) {
    console.log('onMessage', msg);
    if (msg.existJSSearchUI) {
      console.log(document);
      console.log(document.getElementById('search'));
      console.log(getCoveo());
      //debugger;
      sendResponse({
        searchInterface: document.getElementById('search').innerHTML
      });

      //   if (Coveo) {
      //     sendResponse({
      //       coveoJSSearchUI: 'exists'
      //     });
      //   }
    }

    window.removeEventListener('load', load, false); //remove listener, no longer needed
    //enter here the action you want to do once loaded 
  });
}, false);