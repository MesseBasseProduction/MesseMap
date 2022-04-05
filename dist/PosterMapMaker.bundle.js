/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/PosterMapMaker.js":
/*!**********************************!*\
  !*** ./src/js/PosterMapMaker.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _scss_PosterMapMaker_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/PosterMapMaker.scss */ \"./src/scss/PosterMapMaker.scss\");\n/* harmony import */ var _utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/Utils.js */ \"./src/js/utils/Utils.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\n\n\n\nvar PosterMapMaker = /*#__PURE__*/function () {\n  function PosterMapMaker() {\n    _classCallCheck(this, PosterMapMaker);\n\n    this._map = null;\n    this._data = null;\n\n    this._initMap().then(this._initEvents.bind(this));\n  }\n\n  _createClass(PosterMapMaker, [{\n    key: \"_initMap\",\n    value: function _initMap() {\n      var _this = this;\n\n      return new Promise(function (resolve) {\n        // Use main div to inject OSM into\n        _this._map = window.L.map('map', {\n          zoomControl: false\n        }).setView([48, -4.8], 11); // Add OSM credits to the map next to leaflet credits\n\n        var osm = window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\n          attribution: '',\n          maxZoom: 21,\n          maxNativeZoom: 19,\n          // To ensure tiles are not unloaded when zooming after 19\n          minZoom: 2 // Don't allow dezooming too far from map so it always stay fully visible\n\n        });\n        var geoPortail = window.L.tileLayer('https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {\n          attribution: '<a target=\"_blank\" href=\"https://www.geoportail.gouv.fr/\">Geoportail France</a>',\n          bounds: [[-75, -180], [81, 180]],\n          minZoom: 2,\n          maxZoom: 19,\n          apikey: 'choisirgeoportail',\n          format: 'image/jpeg',\n          style: 'normal'\n        });\n        var tonerLegend = window.L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {\n          attribution: '',\n          subdomains: 'abcd',\n          minZoom: 0,\n          maxZoom: 20,\n          ext: 'png'\n        });\n        var toner = window.L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.{ext}', {\n          attribution: 'Map tiles by <a href=\"http://stamen.com\">Stamen Design</a>, <a href=\"http://creativecommons.org/licenses/by/3.0\">CC BY 3.0</a> &mdash; Map data &copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',\n          subdomains: 'abcd',\n          minZoom: 0,\n          maxZoom: 20,\n          ext: 'png'\n        });\n        var tonerLite = window.L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {\n          attribution: 'Map tiles by <a href=\"http://stamen.com\">Stamen Design</a>, <a href=\"http://creativecommons.org/licenses/by/3.0\">CC BY 3.0</a> &mdash; Map data &copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',\n          subdomains: 'abcd',\n          minZoom: 0,\n          maxZoom: 20,\n          ext: 'png'\n        });\n        var stadia = window.L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {\n          maxZoom: 20,\n          attribution: '&copy; <a href=\"https://stadiamaps.com/\">Stadia Maps</a>, &copy; <a href=\"https://openmaptiles.org/\">OpenMapTiles</a> &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors'\n        });\n        var stadiaDark = window.L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {\n          maxZoom: 20,\n          attribution: '&copy; <a href=\"https://stadiamaps.com/\">Stadia Maps</a>, &copy; <a href=\"https://openmaptiles.org/\">OpenMapTiles</a> &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors'\n        }); // Prevent panning outside of the world's edge\n\n        _this._map.setMaxBounds(_utils_Utils_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].MAP_BOUNDS); // Add layer group to interface\n\n\n        var baseMaps = {};\n        baseMaps[\"Carte\"] = osm;\n        baseMaps[\"Satellite\"] = geoPortail;\n        baseMaps[\"Toner\"] = toner;\n        baseMaps[\"Toner (Lite)\"] = tonerLite;\n        baseMaps[\"Toner (Legend)\"] = tonerLegend;\n        baseMaps[\"Stadia\"] = stadia;\n        baseMaps[\"Stadia (Dark)\"] = stadiaDark;\n        osm.addTo(_this._map); // Add layer switch radio on bottom right of the map\n\n        window.L.control.layers(baseMaps, {}, {\n          position: 'topright'\n        }).addTo(_this._map);\n        resolve();\n      });\n    }\n  }, {\n    key: \"_initEvents\",\n    value: function _initEvents() {\n      var _this2 = this;\n\n      return new Promise(function (resolve) {\n        // Subscribe to click event on map to react\n        _this2._map.on('click', _this2._mapClicked.bind(_this2)); // Map is dragged by user mouse/finger\n\n\n        _this2._map.on('drag', function () {\n          // Constrain pan to the map bounds\n          _this2._map.panInsideBounds(window.L.latLngBounds(window.L.latLng(-89.98155760646617, -180), window.L.latLng(89.99346179538875, 180)), {\n            animate: true\n          });\n        }); // Listening to close modal event\n        //document.getElementById('modal-overlay').addEventListener('click', this._closeModal.bind(this));\n\n\n        document.getElementById('apply-coordinates').addEventListener('click', _this2._applyCoordinates.bind(_this2));\n        document.getElementById('apply-text').addEventListener('click', _this2._applyTexts.bind(_this2));\n        resolve();\n      });\n    }\n    /* Event interaction */\n\n  }, {\n    key: \"_mapClicked\",\n    value: function _mapClicked(opts) {\n      console.log(opts);\n    }\n  }, {\n    key: \"_applyCoordinates\",\n    value: function _applyCoordinates() {\n      var lat = document.getElementById('user-lat');\n      var lng = document.getElementById('user-lng');\n\n      if (lat.value !== '' && lng.value !== '') {\n        this._map.setView([lat.value, lng.value]);\n      }\n    }\n  }, {\n    key: \"_applyTexts\",\n    value: function _applyTexts() {\n      document.getElementById('title').innerHTML = document.getElementById('user-title').value;\n      document.getElementById('subtitle').innerHTML = document.getElementById('user-subtitle').value;\n      document.getElementById('comment').innerHTML = document.getElementById('user-comment').value;\n    }\n    /* Modal methods */\n\n  }, {\n    key: \"_fetchModal\",\n    value: function _fetchModal(url) {\n      return new Promise(function (resolve) {\n        fetch(\"assets/html/\".concat(url, \".html\")).then(function (data) {\n          data.text().then(function (html) {\n            resolve(document.createRange().createContextualFragment(html));\n          });\n        });\n      });\n    }\n  }, {\n    key: \"_closeModal\",\n    value: function _closeModal(event, force) {\n      if (force === true || event.target.id === 'modal-overlay' || event.target.id.indexOf('close') !== -1) {\n        document.getElementById('modal-overlay').style.opacity = 0;\n        setTimeout(function () {\n          document.getElementById('modal-overlay').style.display = 'none';\n          document.getElementById('modal-overlay').innerHTML = '';\n        }, 300);\n      }\n    }\n  }]);\n\n  return PosterMapMaker;\n}();\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PosterMapMaker);\n\n//# sourceURL=webpack://PosterMapMaker/./src/js/PosterMapMaker.js?");

/***/ }),

/***/ "./src/js/utils/Utils.js":
/*!*******************************!*\
  !*** ./src/js/utils/Utils.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar MAP_BOUNDS = window.L.latLngBounds(window.L.latLng(-89.98155760646617, -180), window.L.latLng(89.99346179538875, 180));\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  MAP_BOUNDS: MAP_BOUNDS\n});\n\n//# sourceURL=webpack://PosterMapMaker/./src/js/utils/Utils.js?");

/***/ }),

/***/ "./src/scss/PosterMapMaker.scss":
/*!**************************************!*\
  !*** ./src/scss/PosterMapMaker.scss ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://PosterMapMaker/./src/scss/PosterMapMaker.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/PosterMapMaker.js");
/******/ 	window.PosterMapMaker = __webpack_exports__["default"];
/******/ 	
/******/ })()
;