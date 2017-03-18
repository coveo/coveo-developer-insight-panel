'use strict';

var sourceFacetValueCaption = {
    "ohclouden": "Online Help - Cloud" ,
    "ohces70en": "Online Help - Platform 7.0" ,
    "ohces65en": "Online Help - Platform 6.5",
    "Web Scraper - ohcloudfr": "Aide en ligne - Cloud",
    "ohces70fr": "Aide en ligne - Platform 7.0" ,
    "ohces65fr": "Aide en ligne - Platform 6.5",
    "Confluence - Developers": "Developers" ,
    "Answers": "Answers",
    "Salesforce - Knowledge - Coveo Support": "Support KB",
    "Web - TechBlog": "Technical Blog" ,
    "Web - JsSearchRef": "JavaScript Search Components" ,
    "Web Scraper - apisitecore30": "Coveo for Sitecore 3.0 API",
    "apices70": "Coveo Platform 7.0 API" ,
    "apices65": "Coveo Platform 6.5 API"
};

var FileTypeFacetValueCaption = {
    "webscraperwebpage": "Webscraped Page",
    "OnlineHelp": "Online Help Page",
    "CFPage": "Developers Page",
    "CFComment": "Developers Comment",
    "CFSpace": "Developers Space",
    "WhitePaperAndEbook": "White Paper & EBook",
    "swf": "SWF File",
    "XML File": "XML File",
    "Zip File": "ZIP File"
};

document.addEventListener('DOMContentLoaded', function () {
    Coveo.SearchEndpoint.endpoints["default"] = new Coveo.SearchEndpoint({
        restUri: 'https://cloudplatform.coveo.com/rest/search',
        accessToken: '7b9b9300-3901-437b-bafd-51ae596f1b16',
        anonymous: false,
        queryStringArguments: {
            searchHub: 'SearchCoveoTechnicalDocumentation'
        }
    });
    //Coveo.SearchEndpoint.configureSampleEndpoint();
    // Coveo.init(document.body);

    $('#search').coveo('init',{
        sourceFacet: {
            valueCaption: sourceFacetValueCaption
        },
        platformFacet: {
        },
        fileTypeFacet: {
            valueCaption: FileTypeFacetValueCaption
        }
    });
});