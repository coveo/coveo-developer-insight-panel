function getJSUIComponentsOptions() {
  function recurseChildren(callback) {
    var all = document.getElementsByTagName('*');

    var retval = generateTitle('All Component Properties');
    for (var i = 0, max = all.length; i < max; i++) {
      retval += callback(all[i]);
    }
    retval += '\n';

    return retval;
  }

  function generateTitle(title) {
    return title + '\n' + title.replace(/./g, '=') + '\n\n';
  }

  function process(el) {
    var retval = '';
    var matches = getClassesMatch(el.classList, /^Coveo/);
    if (matches.length > 0) {
      //editorial choice: keep only the first Coveo* class
      var className = matches[0];

      retval += '* ' + className + '\n';
      for (var i = 0; i < el.attributes.length; i++) {
        if (el.attributes[i].name.match(/^data-/)) {
          retval += '\t* name = value\n'.replace('name', el.attributes[i].name).replace('value', el.attributes[i].value);
        }
      }

      //process tab
      processSpecific(el, className);
    }
    return retval;
  }

  function classListContains(classList, regex) {
    for (var i = 0; i < classList.length; i++) {
      if (classList[i].match(regex)) {
        return true;
      }
    }
    return false;
  }


  function getClassesMatch(classList, regex) {
    var retval = [];
    for (var i = 0; i < classList.length; i++) {
      if (classList[i].match(regex)) {
        retval.push(classList[i])
      }
    }
    return retval;
  }

  function processSpecific(el, className) {
    var process = componentSpecificProcesses[className];
    if (process) {
      process(el);
    }
  }

  function copytext(text) {
    var textField = document.createElement('textarea');

    textField.value = text;
    document.body.appendChild(textField);
    textField.select();

    /*
        textField.addEventListener('copy', function (e) {
            e.preventDefault();
            if (e.clipboardData) {
                e.clipboardData.setData('text/plain', 'custom content from click');
            } else if (window.clipboardData) {
                window.clipboardData.setData('Text', 'custom content from click');
            }
     
        });
        */

    //    document.execCommand('copy');
    //    textField.remove();
  }

  var tabs = {};
  var processTab = function (el) {
    var id = el.attributes['data-id'].value;
    tabs[id] = el;
  }
  var facets = {};
  var processFacet = function (el) {
    var title = el.attributes['data-title'].value;
    facets[title] = el;

    //parse tabs
    try {
      el.tabs = {};
      var tabs = el.attributes['data-tab'].value;
      if (tabs) {
        var arTabs = tabs.split(/[,;]/);
        for (var i in arTabs) {
          el.tabs[arTabs[i]] = 1;
        }
      } else {
        el.tabs['*'] = 1;
      }
    } catch (err) {
      el.tabs['*'] = 1;
    }
  }

  var componentSpecificProcesses = {
    CoveoTab: processTab,
    CoveoFacet: processFacet
  }

  function renderFacetsTabs() {
    var retval = generateTitle('Facets per Tab');
    retval += '+\n';
    //first cell is empty / facet column
    retval += '|';
    for (var tabId in tabs) {
      retval += '|' + tabId;
    }
    retval += '\n+=\n';
    for (var facetTitle in facets) {
      retval += '|' + facetTitle
      var facet = facets[facetTitle];
      for (var tabId in tabs) {
        retval += '|' + (facet.tabs[tabId] ? 'X' : '');
      }
      retval += '\n+\n';
    }

    return retval;
  }

  var body = recurseChildren(process);
  console.log(facets);
  console.log(tabs);
  body += renderFacetsTabs();
  console.log(body);
  copytext(body);

  return facets
}