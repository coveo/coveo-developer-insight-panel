(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CoveoExtension"] = factory();
	else
		root["CoveoExtension"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var HelloWorld_1 = __webpack_require__(2);
	exports.HelloWorld = HelloWorld_1.HelloWorld;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var Component = Coveo.Component;
	var ComponentOptions = Coveo.ComponentOptions;
	var $$ = Coveo.$$;
	var QueryEvents = Coveo.QueryEvents;
	var Initialization = Coveo.Initialization;
	var HelloWorld = (function (_super) {
	    __extends(HelloWorld, _super);
	    function HelloWorld(element, options, bindings) {
	        var _this = this;
	        _super.call(this, element, HelloWorld.ID, bindings);
	        this.element = element;
	        this.options = options;
	        this.bindings = bindings;
	        this.options = ComponentOptions.initComponentOptions(element, HelloWorld, options);
	        $$(this.element).text(this.options.dummyOptionText);
	        this.bind.onRootElement(QueryEvents.buildingQuery, function (args) { return _this.handleBuildingQuery(args); });
	    }
	    HelloWorld.prototype.handleBuildingQuery = function (args) {
	        args.queryBuilder.advancedExpression.add(this.options.dummyOptionQuery);
	    };
	    HelloWorld.ID = 'HelloWorld';
	    HelloWorld.options = {
	        dummyOptionText: ComponentOptions.buildStringOption({ defaultValue: 'Hello world' }),
	        dummyOptionQuery: ComponentOptions.buildStringOption({ defaultValue: '@uri' })
	    };
	    return HelloWorld;
	}(Component));
	exports.HelloWorld = HelloWorld;
	Initialization.registerAutoCreateComponent(HelloWorld);


/***/ }
/******/ ])
});
;
//# sourceMappingURL=coveo.extension.js.map