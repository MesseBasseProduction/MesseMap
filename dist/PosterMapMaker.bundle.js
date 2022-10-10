/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/MapProviders.js":
/*!********************************!*\
  !*** ./src/js/MapProviders.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  layers: {\n    'OpenStreetMap': window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),\n    'GeoPortail Plan': window.L.tileLayer('https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {\n      attribution: '<a target=\"_blank\" href=\"https://www.geoportail.gouv.fr/\">Geoportail France</a>',\n      bounds: [[-75, -180], [81, 180]],\n      minZoom: 2,\n      maxZoom: 18,\n      apikey: 'choisirgeoportail',\n      format: 'image/png',\n      style: 'normal'\n    }),\n    'GeoPortail Satellite': window.L.tileLayer('https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {\n      apikey: 'choisirgeoportail',\n      format: 'image/jpeg',\n      style: 'normal'\n    }),\n    'Esri Satellite': window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {\n      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'\n    }),\n    'Esri Topo': window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {\n      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'\n    }),\n    'Esri Gray': window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {\n      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',\n      maxZoom: 16\n    }),\n    'Toner': window.L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.{ext}', {\n      subdomains: 'abcd',\n      ext: 'png'\n    }),\n    'CartoDB': window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {\n      attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors &copy; <a href=\"https://carto.com/attributions\">CARTO</a>',\n      subdomains: 'abcd',\n      maxZoom: 20\n    }),\n    'CartoDB White': window.L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {\n      attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors &copy; <a href=\"https://carto.com/attributions\">CARTO</a>',\n      subdomains: 'abcd',\n      maxZoom: 20\n    }),\n    'CartoDB Dark': window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {\n      attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors &copy; <a href=\"https://carto.com/attributions\">CARTO</a>',\n      subdomains: 'abcd',\n      maxZoom: 20\n    }),\n    'Stamen Watercolor': window.L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {\n      attribution: 'Map tiles by <a href=\"http://stamen.com\">Stamen Design</a>, <a href=\"http://creativecommons.org/licenses/by/3.0\">CC BY 3.0</a> &mdash; Map data &copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',\n      subdomains: 'abcd',\n      minZoom: 1,\n      maxZoom: 16,\n      ext: 'jpg'\n    })\n  },\n  overlays: {\n    'Toner Lines': window.L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}{r}.{ext}', {\n      attribution: 'Map tiles by <a href=\"http://stamen.com\">Stamen Design</a>, <a href=\"http://creativecommons.org/licenses/by/3.0\">CC BY 3.0</a> &mdash; Map data &copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',\n      subdomains: 'abcd',\n      minZoom: 0,\n      maxZoom: 20,\n      ext: 'png'\n    })\n  }\n});\n\n//# sourceURL=webpack://PosterMapMaker/./src/js/MapProviders.js?");

/***/ }),

/***/ "./src/js/PosterMapMaker.js":
/*!**********************************!*\
  !*** ./src/js/PosterMapMaker.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _scss_PosterMapMaker_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/PosterMapMaker.scss */ \"./src/scss/PosterMapMaker.scss\");\n/* harmony import */ var _SmoothWheelZoom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SmoothWheelZoom.js */ \"./src/js/SmoothWheelZoom.js\");\n/* harmony import */ var _SmoothWheelZoom_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_SmoothWheelZoom_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _MapProviders_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MapProviders.js */ \"./src/js/MapProviders.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\n\n\n\nvar jsPDF = window.jspdf.jsPDF;\nvar CONST = {\n  VERSION: '0.0.3',\n  DEBUG: true\n};\nvar PosterMapMaker = /*#__PURE__*/function () {\n  function PosterMapMaker() {\n    _classCallCheck(this, PosterMapMaker);\n    this._map = null;\n    this._data = null;\n    this._baseLayer = {};\n    this._overlayLayer = {};\n    this._shadowStyleBackup = '';\n    this._tilesLoaded = false;\n    this._intervalId = -1;\n    this._isDownloading = false;\n    this._initMap().then(this._initEvents.bind(this));\n  }\n  _createClass(PosterMapMaker, [{\n    key: \"_initMap\",\n    value: function _initMap() {\n      var _this = this;\n      return new Promise(function (resolve) {\n        // Use main div to inject OSM into\n        _this._map = window.L.map('map', {\n          attributionControl: false,\n          zoomSnap: 0,\n          // On resize, all fitBounds to precisely be set\n          scrollWheelZoom: false,\n          // SmoothWheelZoom lib\n          smoothWheelZoom: true,\n          // SmoothWheelZoom lib\n          smoothSensitivity: 1 // SmoothWheelZoom lib\n        }).setView([44.79777779831652, 1.542703666063447], 5);\n        // Add layer group to interface\n        _MapProviders_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].layers[\"Esri Satellite\"].addTo(_this._map);\n        // Add layer switch radio on bottom right of the map\n        window.L.control.layers(_MapProviders_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].layers, _MapProviders_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].overlays, {\n          position: 'topright'\n        }).addTo(_this._map);\n        _this._applyTexts();\n        // Remove webp from Firefox browser as it is not supported (yet I hope)\n        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {\n          var webp = document.getElementById('webp').parentNode;\n          var parent = webp.parentNode;\n          parent.removeChild(webp);\n        }\n        resolve();\n      });\n    }\n  }, {\n    key: \"_initEvents\",\n    value: function _initEvents() {\n      var _this2 = this;\n      return new Promise(function (resolve) {\n        // Kolor Pick Events\n        document.getElementById('title-color').addEventListener('click', _this2._textEdit.bind(_this2));\n        document.getElementById('subtitle-color').addEventListener('click', _this2._textEdit.bind(_this2));\n        document.getElementById('comment-color').addEventListener('click', _this2._textEdit.bind(_this2));\n        // Listening to close modal event\n        document.getElementById('modal-overlay').addEventListener('click', _this2._closeModal.bind(_this2));\n        // Text edit events\n        document.getElementById('user-title').addEventListener('input', _this2._applyTexts.bind(_this2));\n        document.getElementById('user-subtitle').addEventListener('input', _this2._applyTexts.bind(_this2));\n        document.getElementById('user-comment').addEventListener('input', _this2._applyTexts.bind(_this2));\n        // Export settings\n        document.getElementById('image-width').addEventListener('input', _this2._updateOutputWidth.bind(_this2));\n        document.getElementById('map-save').addEventListener('click', _this2._download.bind(_this2));\n        // Load event on map layers\n        for (var layer in _MapProviders_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].layers) {\n          _MapProviders_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].layers[layer].on('load', function () {\n            return _this2._tilesLoaded = true;\n          });\n        }\n        resolve();\n      });\n    }\n\n    /* Event callbacks */\n  }, {\n    key: \"_textEdit\",\n    value: function _textEdit(e) {\n      var _this3 = this;\n      this._fetchModal('colorpick').then(function (dom) {\n        var picker = new window.KolorPick({\n          renderTo: dom.querySelector('#picker-container'),\n          type: 'linear',\n          // Either linear or radial\n          style: {\n            bg: 'transparent',\n            padding: 0\n          },\n          onColorChange: function onColorChange(data) {\n            // Callback method called on each color modification\n            if (document.getElementById('applied-color')) {\n              document.getElementById('applied-color').style.backgroundColor = data.hex;\n              if (e.target.tagName === 'IMG') {\n                e.target.parentNode.style.borderColor = document.getElementById('applied-color').style.backgroundColor;\n                e.target.parentNode.previousElementSibling.style.borderColor = document.getElementById('applied-color').style.backgroundColor;\n              } else {\n                e.target.style.borderColor = document.getElementById('applied-color').style.backgroundColor;\n                e.target.previousElementSibling.style.borderColor = document.getElementById('applied-color').style.backgroundColor;\n              }\n              document.getElementById(e.target.dataset.type).style.color = document.getElementById('applied-color').style.backgroundColor;\n            }\n          }\n        });\n        dom.querySelector('#confirm').addEventListener('click', function () {\n          if (e.target.tagName === 'IMG') {\n            e.target.parentNode.style.borderColor = document.getElementById('applied-color').style.backgroundColor;\n            e.target.parentNode.previousElementSibling.style.borderColor = document.getElementById('applied-color').style.backgroundColor;\n          } else {\n            e.target.style.borderColor = document.getElementById('applied-color').style.backgroundColor;\n            e.target.previousElementSibling.style.borderColor = document.getElementById('applied-color').style.backgroundColor;\n          }\n          document.getElementById(e.target.dataset.type).style.color = document.getElementById('applied-color').style.backgroundColor;\n          picker.destroy();\n          _this3._closeModal(null, true);\n        });\n        document.getElementById('modal-overlay').appendChild(dom);\n        document.getElementById('modal-overlay').style.display = 'flex';\n        setTimeout(function () {\n          return document.getElementById('modal-overlay').style.opacity = 1;\n        }, 50);\n      });\n    }\n  }, {\n    key: \"_applyTexts\",\n    value: function _applyTexts() {\n      document.getElementById('title').innerHTML = document.getElementById('user-title').value;\n      document.getElementById('subtitle').innerHTML = document.getElementById('user-subtitle').value;\n      document.getElementById('comment').innerHTML = document.getElementById('user-comment').value;\n    }\n  }, {\n    key: \"_updateOutputWidth\",\n    value: function _updateOutputWidth(e) {\n      var label = e.target.previousElementSibling;\n      var text = '';\n      if (e.target.value > 4961) {\n        text = '2';\n      } else if (e.target.value > 3508) {\n        text = '3';\n      } else if (e.target.value > 2480) {\n        text = '4';\n      } else if (e.target.value > 1754) {\n        text = '5';\n      } else if (e.target.value > 1241) {\n        text = '6';\n      } else {\n        text = '7';\n      }\n      // Update label with given slider value\n      label.innerHTML = \"Dimension : \".concat(e.target.value, \" x \").concat(this.precisionRound(e.target.value * 29.7 / 21, 0), \" \\u2014 A\").concat(text, \" \\xE0 300dpi\");\n    }\n\n    /* Download methods */\n    // Big boy here :\n    // - get currently viewer map bounds\n    // - scale map (load tiles for high res) according to user desired size\n    // - generate uimage using html2canvas\n    // - save to user machine\n    // - restore map size and scale\n  }, {\n    key: \"_download\",\n    value: function _download() {\n      var _this4 = this;\n      document.getElementById('print-overlay').style.zIndex = 99;\n      document.getElementById('print-overlay').style.opacity = 1;\n      requestAnimationFrame(function () {\n        // First we get the user desired size\n        var width = document.getElementById('image-width').value;\n        var scale = width / 600;\n        var bounds = _this4._map.getBounds(); // Map bound before scaling\n        // Scale map elements according to user desired size\n        _this4._dlPrepareMap(width, scale, bounds);\n        // setInterval on mapPrint to ensure tiles are loaded before downloading (tilesLoaded flag)\n        if (scale === 1) {\n          _this4._tilesLoaded = true;\n        } // Set tiles loaded if no upscale is requested on export\n        _this4._intervalId = setInterval(_this4._dlPerformMapPrint.bind(_this4, bounds), 2000); // We put a 2s timeout to ensure latest tiles are properly loaded\n      });\n    }\n  }, {\n    key: \"_dlPrepareMap\",\n    value: function _dlPrepareMap(width, scale, bounds) {\n      var _this5 = this;\n      if (CONST.DEBUG) {\n        console.log('Prepare map style for printing...');\n      }\n      document.getElementById('print-status').innerHTML = \"Pr\\xE9paration du style de la carte pour l'export...\";\n      document.getElementById('print-progress').style.width = '10%';\n      // Hide Leaflet.js overlays\n      document.querySelector('.leaflet-top.leaflet-left').style.display = 'none';\n      document.querySelector('.leaflet-top.leaflet-right').style.display = 'none';\n      // Scale CSS variables\n      document.getElementById('map-output').style.setProperty('--padding', \"\".concat(3 * scale, \"rem\"));\n      document.getElementById('map-output').style.setProperty('--thick-border', \"\".concat(5 * scale, \"px\"));\n      document.getElementById('map-output').style.setProperty('--small-border', \"\".concat(1 * scale, \"px\"));\n      document.body.style.fontSize = \"\".concat(1.2 * scale, \"rem\");\n      // Set tiles loaded flag to false to wait for reframe to occur\n      this._tilesLoaded = false;\n      // Scale map dimension and attributes\n      document.getElementById('map-output').style.width = \"\".concat(width, \"px\");\n      document.getElementById('map-output').style.position = 'absolute';\n      // Remove box shadow from map container\n      this._shadowStyleBackup = document.getElementById('map-output').style.boxShadow;\n      document.getElementById('map-output').style.boxShadow = 'none';\n      requestAnimationFrame(function () {\n        _this5._map.invalidateSize();\n        _this5._map.fitBounds(bounds);\n        if (CONST.DEBUG) {\n          console.log('Waiting for map tiles to load...');\n        }\n        document.getElementById('print-status').innerHTML = \"En attente du chargement des tuiles de la carte...\";\n        document.getElementById('print-progress').style.width = '25%';\n      });\n    }\n  }, {\n    key: \"_dlPerformMapPrint\",\n    value: function _dlPerformMapPrint(bounds) {\n      var _this6 = this;\n      // Perform map print with html2canvas if all tiles are loaded\n      if (this._tilesLoaded === true) {\n        if (CONST.DEBUG) {\n          console.log('Map tiles loaded, performing printing...');\n        }\n        document.getElementById('print-status').innerHTML = \"Tuiles charg\\xE9es, d\\xE9marrage de l'export...\";\n        document.getElementById('print-progress').style.width = '66%';\n        clearInterval(this._intervalId);\n        this._tilesLoaded = false;\n        requestAnimationFrame(function () {\n          // Execute html2canvas with output div\n          window.html2canvas(document.getElementById('map-output'), {\n            logging: CONST.DEBUG,\n            useCORS: true,\n            allowTaint: true,\n            width: document.getElementById('map-output').offsetWidth,\n            height: document.getElementById('map-output').offsetHeight\n          }).then(_this6._dlMap.bind(_this6, bounds))[\"catch\"](_this6._dlRestoreMap.bind(_this6, bounds));\n        });\n      }\n    }\n  }, {\n    key: \"_dlMap\",\n    value: function _dlMap(bounds, canvas) {\n      if (CONST.DEBUG) {\n        console.log('Canvas printing done, exporting image to disk...');\n      }\n      document.getElementById('print-status').innerHTML = \"Export termin\\xE9. Sauvegarde sur le disque en cours...\";\n      document.getElementById('print-progress').style.width = '88%';\n      var file = this._getOutputFileType();\n      var link = document.createElement('A');\n      link.download = \"\".concat(document.getElementById('title').innerHTML, \".\").concat(file.extension);\n      if (file.type === 'pdf') {\n        var pageFormat = document.getElementById('image-width-label').innerHTML.split('—')[1].replace(' ', '').substring(0, 2);\n        var pdf = new jsPDF({\n          format: pageFormat,\n          precision: 20\n        });\n        var width = pdf.internal.pageSize.getWidth();\n        var height = pdf.internal.pageSize.getHeight();\n        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, width, height);\n        pdf.save(\"\".concat(document.getElementById('title').innerHTML, \".pdf\"));\n      } else {\n        link.href = canvas.toDataURL(\"image/\".concat(file.type));\n        link.click();\n      }\n      // Restore map to default value\n      this._dlRestoreMap(bounds);\n    }\n  }, {\n    key: \"_dlRestoreMap\",\n    value: function _dlRestoreMap(bounds) {\n      var _this7 = this;\n      if (CONST.DEBUG) {\n        console.log('Restoring map style to default...');\n      }\n      document.getElementById('print-status').innerHTML = \"Remise en \\xE9tat du style initial...\";\n      document.getElementById('print-progress').style.width = '100%';\n      // Restore Leaflet.js overlays\n      document.querySelector('.leaflet-top.leaflet-left').style.display = 'inherit';\n      document.querySelector('.leaflet-top.leaflet-right').style.display = 'inherit';\n      // Restore CSS variables\n      document.getElementById('map-output').style.setProperty('--padding', \"3rem\");\n      document.getElementById('map-output').style.setProperty('--thick-border', \"5px\");\n      document.getElementById('map-output').style.setProperty('--small-border', \"1px\");\n      document.body.style.fontSize = \"1.2rem\";\n      // Restore map dimension and attributes\n      document.getElementById('map-output').style.width = '600px';\n      document.getElementById('map-output').style.position = 'inherit';\n      // Restore map container box shadow\n      document.getElementById('map-output').style.boxShadow = this._shadowStyleBackup;\n      // Remove print overlay\n      document.getElementById('print-overlay').style.opacity = 0;\n      setTimeout(function () {\n        return document.getElementById('print-overlay').style.zIndex = -1;\n      }, 200);\n      requestAnimationFrame(function () {\n        _this7._map.invalidateSize();\n        _this7._map.fitBounds(bounds);\n        if (CONST.DEBUG) {\n          console.log('Map properly restored');\n        }\n      });\n    }\n\n    /* Input value and utils */\n  }, {\n    key: \"_getOutputFileType\",\n    value: function _getOutputFileType() {\n      var file = {\n        extension: 'png',\n        type: 'png'\n      };\n      Array.from(document.getElementById('image-type').elements).forEach(function (el) {\n        if (el.checked === true) {\n          file.extension = el.dataset.extension;\n          file.type = el.dataset.type;\n        }\n      });\n      return file;\n    }\n\n    /* Modal methods */\n  }, {\n    key: \"_fetchModal\",\n    value: function _fetchModal(url) {\n      return new Promise(function (resolve) {\n        fetch(\"assets/html/\".concat(url, \".html\")).then(function (data) {\n          data.text().then(function (html) {\n            resolve(document.createRange().createContextualFragment(html));\n          });\n        });\n      });\n    }\n  }, {\n    key: \"_closeModal\",\n    value: function _closeModal(event, force) {\n      if (force === true || event.target.id === 'modal-overlay' || event.target.id.indexOf('close') !== -1) {\n        document.getElementById('modal-overlay').style.opacity = 0;\n        setTimeout(function () {\n          document.getElementById('modal-overlay').style.display = 'none';\n          document.getElementById('modal-overlay').innerHTML = '';\n        }, 300);\n      }\n    }\n\n    /* Utils */\n  }, {\n    key: \"precisionRound\",\n    value: function precisionRound(value, precision) {\n      var multiplier = Math.pow(10, precision || 0);\n      return Math.round(value * multiplier) / multiplier;\n    }\n  }]);\n  return PosterMapMaker;\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PosterMapMaker);\n\n//# sourceURL=webpack://PosterMapMaker/./src/js/PosterMapMaker.js?");

/***/ }),

/***/ "./src/js/SmoothWheelZoom.js":
/*!***********************************!*\
  !*** ./src/js/SmoothWheelZoom.js ***!
  \***********************************/
/***/ (() => {

eval("// Thanks buddy https://github.com/mutsuyuki/Leaflet.SmoothWheelZoom\nwindow.L.Map.mergeOptions({\n  // @section Mousewheel options\n  // @option smoothWheelZoom: Boolean|String = true\n  // Whether the map can be zoomed by using the mouse wheel. If passed `'center'`,\n  // it will zoom to the center of the view regardless of where the mouse was.\n  smoothWheelZoom: true,\n  // @option smoothWheelZoom: number = 1\n  // setting zoom speed\n  smoothSensitivity: 1\n});\nwindow.L.Map.SmoothWheelZoom = window.L.Handler.extend({\n  addHooks: function addHooks() {\n    window.L.DomEvent.on(this._map._container, 'wheel', this._onWheelScroll, this);\n  },\n  removeHooks: function removeHooks() {\n    window.L.DomEvent.off(this._map._container, 'wheel', this._onWheelScroll, this);\n  },\n  _onWheelScroll: function _onWheelScroll(e) {\n    if (!this._isWheeling) {\n      this._onWheelStart(e);\n    }\n    this._onWheeling(e);\n  },\n  _onWheelStart: function _onWheelStart(e) {\n    var map = this._map;\n    this._isWheeling = true;\n    this._wheelMousePosition = map.mouseEventToContainerPoint(e);\n    this._centerPoint = map.getSize()._divideBy(2);\n    this._startLatLng = map.containerPointToLatLng(this._centerPoint);\n    this._wheelStartLatLng = map.containerPointToLatLng(this._wheelMousePosition);\n    this._startZoom = map.getZoom();\n    this._moved = false;\n    this._zooming = true;\n    map._stop();\n    if (map._panAnim) {\n      map._panAnim.stop();\n    }\n    this._goalZoom = map.getZoom();\n    this._prevCenter = map.getCenter();\n    this._prevZoom = map.getZoom();\n    this._zoomAnimationId = requestAnimationFrame(this._updateWheelZoom.bind(this));\n  },\n  _onWheeling: function _onWheeling(e) {\n    var map = this._map;\n    this._goalZoom = this._goalZoom + window.L.DomEvent.getWheelDelta(e) * 0.003 * map.options.smoothSensitivity;\n    if (this._goalZoom < map.getMinZoom() || this._goalZoom > map.getMaxZoom()) {\n      this._goalZoom = map._limitZoom(this._goalZoom);\n    }\n    this._wheelMousePosition = this._map.mouseEventToContainerPoint(e);\n    clearTimeout(this._timeoutId);\n    this._timeoutId = setTimeout(this._onWheelEnd.bind(this), 200);\n    window.L.DomEvent.preventDefault(e);\n    window.L.DomEvent.stopPropagation(e);\n  },\n  _onWheelEnd: function _onWheelEnd() {\n    this._isWheeling = false;\n    cancelAnimationFrame(this._zoomAnimationId);\n    this._map._moveEnd(true);\n  },\n  _updateWheelZoom: function _updateWheelZoom() {\n    var map = this._map;\n    if (!map.getCenter().equals(this._prevCenter) || map.getZoom() != this._prevZoom) {\n      return;\n    }\n    this._zoom = map.getZoom() + (this._goalZoom - map.getZoom()) * 0.3;\n    this._zoom = Math.floor(this._zoom * 100) / 100;\n    var delta = this._wheelMousePosition.subtract(this._centerPoint);\n    if (delta.x === 0 && delta.y === 0) {\n      return;\n    }\n    if (map.options.smoothWheelZoom === 'center') {\n      this._center = this._startLatLng;\n    } else {\n      this._center = map.unproject(map.project(this._wheelStartLatLng, this._zoom).subtract(delta), this._zoom);\n    }\n    if (!this._moved) {\n      map._moveStart(true, false);\n      this._moved = true;\n    }\n    map._move(this._center, this._zoom);\n    this._prevCenter = map.getCenter();\n    this._prevZoom = map.getZoom();\n    this._zoomAnimationId = requestAnimationFrame(this._updateWheelZoom.bind(this));\n  }\n});\nwindow.L.Map.addInitHook('addHandler', 'smoothWheelZoom', window.L.Map.SmoothWheelZoom);\n\n//# sourceURL=webpack://PosterMapMaker/./src/js/SmoothWheelZoom.js?");

/***/ }),

/***/ "./src/scss/PosterMapMaker.scss":
/*!**************************************!*\
  !*** ./src/scss/PosterMapMaker.scss ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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