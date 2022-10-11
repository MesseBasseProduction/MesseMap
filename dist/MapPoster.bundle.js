!function(){var e={669:function(){window.L.Map.mergeOptions({smoothWheelZoom:!0,smoothSensitivity:1}),window.L.Map.SmoothWheelZoom=window.L.Handler.extend({addHooks:function(){window.L.DomEvent.on(this._map._container,"wheel",this._onWheelScroll,this)},removeHooks:function(){window.L.DomEvent.off(this._map._container,"wheel",this._onWheelScroll,this)},_onWheelScroll:function(e){this._isWheeling||this._onWheelStart(e),this._onWheeling(e)},_onWheelStart:function(e){var t=this._map;this._isWheeling=!0,this._wheelMousePosition=t.mouseEventToContainerPoint(e),this._centerPoint=t.getSize()._divideBy(2),this._startLatLng=t.containerPointToLatLng(this._centerPoint),this._wheelStartLatLng=t.containerPointToLatLng(this._wheelMousePosition),this._startZoom=t.getZoom(),this._moved=!1,this._zooming=!0,t._stop(),t._panAnim&&t._panAnim.stop(),this._goalZoom=t.getZoom(),this._prevCenter=t.getCenter(),this._prevZoom=t.getZoom(),this._zoomAnimationId=requestAnimationFrame(this._updateWheelZoom.bind(this))},_onWheeling:function(e){var t=this._map;this._goalZoom=this._goalZoom+.003*window.L.DomEvent.getWheelDelta(e)*t.options.smoothSensitivity,(this._goalZoom<t.getMinZoom()||this._goalZoom>t.getMaxZoom())&&(this._goalZoom=t._limitZoom(this._goalZoom)),this._wheelMousePosition=this._map.mouseEventToContainerPoint(e),clearTimeout(this._timeoutId),this._timeoutId=setTimeout(this._onWheelEnd.bind(this),200),window.L.DomEvent.preventDefault(e),window.L.DomEvent.stopPropagation(e)},_onWheelEnd:function(){this._isWheeling=!1,cancelAnimationFrame(this._zoomAnimationId),this._map._moveEnd(!0)},_updateWheelZoom:function(){var e=this._map;if(e.getCenter().equals(this._prevCenter)&&e.getZoom()==this._prevZoom){this._zoom=e.getZoom()+.3*(this._goalZoom-e.getZoom()),this._zoom=Math.floor(100*this._zoom)/100;var t=this._wheelMousePosition.subtract(this._centerPoint);0===t.x&&0===t.y||("center"===e.options.smoothWheelZoom?this._center=this._startLatLng:this._center=e.unproject(e.project(this._wheelStartLatLng,this._zoom).subtract(t),this._zoom),this._moved||(e._moveStart(!0,!1),this._moved=!0),e._move(this._center,this._zoom),this._prevCenter=e.getCenter(),this._prevZoom=e.getZoom(),this._zoomAnimationId=requestAnimationFrame(this._updateWheelZoom.bind(this)))}}}),window.L.Map.addInitHook("addHandler","smoothWheelZoom",window.L.Map.SmoothWheelZoom)}},t={};function o(n){var a=t[n];if(void 0!==a)return a.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,o),i.exports}o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)};var n={};!function(){"use strict";o.d(n,{default:function(){return r}}),o(669);var e={layers:{OpenStreetMap:window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"),"GeoPortail Plan":window.L.tileLayer("https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",{attribution:'<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',bounds:[[-75,-180],[81,180]],minZoom:2,maxZoom:18,apikey:"choisirgeoportail",format:"image/png",style:"normal"}),"GeoPortail Satellite":window.L.tileLayer("https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",{apikey:"choisirgeoportail",format:"image/jpeg",style:"normal"}),"Esri Satellite":window.L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",{attribution:"Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"}),"Esri Topo":window.L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",{attribution:"Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"}),"Esri Gray":window.L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",{attribution:"Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ",maxZoom:16}),Toner:window.L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.{ext}",{subdomains:"abcd",ext:"png"}),CartoDB:window.L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',subdomains:"abcd",maxZoom:20}),"CartoDB White":window.L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',subdomains:"abcd",maxZoom:20}),"CartoDB Dark":window.L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',subdomains:"abcd",maxZoom:20}),"Stamen Watercolor":window.L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}",{attribution:'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',subdomains:"abcd",minZoom:1,maxZoom:16,ext:"jpg"}),"Mapiful Mono":window.L.tileLayer("https://tiles.mapiful.com/mono/{z}/{x}/{y}.png",{minZoom:1,maxZoom:16}),"Mapiful Asphalt":window.L.tileLayer("https://tiles.mapiful.com/asphalt/{z}/{x}/{y}.png",{minZoom:1,maxZoom:16}),"Mapiful Nara":window.L.tileLayer("https://tiles.mapiful.com/playroom/{z}/{x}/{y}.png",{minZoom:1,maxZoom:16}),"Mapiful Blue":window.L.tileLayer("https://tiles.mapiful.com/blue/{z}/{x}/{y}.png",{minZoom:1,maxZoom:16})},overlays:{"Toner Lines":window.L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}{r}.{ext}",{attribution:'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',subdomains:"abcd",minZoom:0,maxZoom:20,ext:"png"})}};function t(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}var a=window.jspdf.jsPDF,i=!1,r=function(){function o(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,o),this._map=null,this._tilesLoaded=!1,this._intervalId=-1,this._initInterface().then(this._initEvents.bind(this)).catch((function(e){console.error(e)}))}var n,r;return n=o,(r=[{key:"_initInterface",value:function(){var t=this;return new Promise((function(o,n){try{t._map=window.L.map("map",{attributionControl:!1,zoomSnap:0,scrollWheelZoom:!1,smoothWheelZoom:!0,smoothSensitivity:1}).setView([44.79777779831652,1.542703666063447],5)}catch(e){return void n(e)}e.layers["Esri Satellite"].addTo(t._map),window.L.control.layers(e.layers,e.overlays,{position:"topright"}).addTo(t._map),t._applyTexts(),o()}))}},{key:"_initEvents",value:function(){var t=this;return new Promise((function(o){for(var n=document.getElementById("map-style"),a=0;a<n.children.length;++a)n.children[a].addEventListener("click",t._updateMapStyle.bind(t));for(var i in document.getElementById("title-color").addEventListener("click",t._textEditModal.bind(t)),document.getElementById("subtitle-color").addEventListener("click",t._textEditModal.bind(t)),document.getElementById("comment-color").addEventListener("click",t._textEditModal.bind(t)),document.getElementById("modal-overlay").addEventListener("click",t._closeModal.bind(t)),document.getElementById("user-title").addEventListener("input",t._applyTexts.bind(t)),document.getElementById("user-subtitle").addEventListener("input",t._applyTexts.bind(t)),document.getElementById("user-comment").addEventListener("input",t._applyTexts.bind(t)),document.getElementById("image-width").addEventListener("input",t._updateDimensionLabel.bind(t)),document.getElementById("map-save").addEventListener("click",t._download.bind(t)),e.layers)e.layers[i].on("load",(function(){return t._tilesLoaded=!0}));o()}))}},{key:"_updateMapStyle",value:function(e){for(var t="",o=document.getElementById("map-style"),n=0;n<o.children.length;++n)if(o.children[n].classList.contains("selected")){t=o.children[n].dataset.style,o.children[n].classList.remove("selected");break}e.target.classList.add("selected"),document.getElementById("map-output").classList.remove("".concat(t,"-style")),document.getElementById("map-output").classList.add("".concat(e.target.dataset.style,"-style"))}},{key:"_textEditModal",value:function(e){var t=this;this._fetchModal("textedit").then((function(o){var n=function(){"IMG"===e.target.tagName?(e.target.parentNode.style.borderColor=document.getElementById("applied-color").style.backgroundColor,e.target.parentNode.previousElementSibling.style.borderColor=document.getElementById("applied-color").style.backgroundColor):(e.target.style.borderColor=document.getElementById("applied-color").style.backgroundColor,e.target.previousElementSibling.style.borderColor=document.getElementById("applied-color").style.backgroundColor),document.getElementById(e.target.dataset.type).style.color=document.getElementById("applied-color").style.backgroundColor},a=new window.KolorPick({renderTo:o.querySelector("#picker-container"),type:"linear",style:{bg:"transparent",padding:0},onColorChange:function(e){document.getElementById("applied-color")&&(document.getElementById("applied-color").style.backgroundColor=e.hex,n())}});o.querySelector("#confirm").addEventListener("click",(function(){n(),a.destroy(),t._closeModal(null,!0)})),document.getElementById("modal-overlay").appendChild(o),document.getElementById("modal-overlay").style.display="flex",setTimeout((function(){return document.getElementById("modal-overlay").style.opacity=1}),50)}))}},{key:"_applyTexts",value:function(){document.getElementById("title").innerHTML=document.getElementById("user-title").value,document.getElementById("subtitle").innerHTML=document.getElementById("user-subtitle").value,document.getElementById("comment").innerHTML=document.getElementById("user-comment").value}},{key:"_updateDimensionLabel",value:function(e){var t=e.target.previousElementSibling,o="7";e.target.value>4961?o="2":e.target.value>3508?o="3":e.target.value>2480?o="4":e.target.value>1754?o="5":e.target.value>1241&&(o="6");var n=this.precisionRound(29.7*e.target.value/21,0);t.innerHTML="Dimension : ".concat(e.target.value," x ").concat(n," — A").concat(o," à 300dpi")}},{key:"_download",value:function(){var e=this;document.getElementById("print-overlay").style.zIndex=99,document.getElementById("print-overlay").style.opacity=1,requestAnimationFrame((function(){var t=document.getElementById("image-width").value,o=t/600,n=e._map.getBounds();e._dlPrepareMap(t,o,n),1===o&&(e._tilesLoaded=!0),e._intervalId=setInterval(e._dlPerformMapPrint.bind(e,n),2e3)}))}},{key:"_dlPrepareMap",value:function(e,t,o){var n=this;document.getElementById("print-status").innerHTML="Préparation du style de la carte pour l'export...",document.getElementById("print-progress").style.width="10%",document.querySelector(".leaflet-top.leaflet-left").style.display="none",document.querySelector(".leaflet-top.leaflet-right").style.display="none";var a=parseInt(window.getComputedStyle(document.getElementById("map-output")).getPropertyValue("--padding").replace("rem","")),i=parseInt(window.getComputedStyle(document.getElementById("map-output")).getPropertyValue("--thick-border").replace("px","")),r=parseInt(window.getComputedStyle(document.getElementById("map-output")).getPropertyValue("--small-border").replace("px",""));document.getElementById("map-output").style.setProperty("--padding","".concat(a*t,"rem")),document.getElementById("map-output").style.setProperty("--thick-border","".concat(i*t,"px")),document.getElementById("map-output").style.setProperty("--small-border","".concat(r*t,"px")),document.body.style.fontSize="".concat(1.2*t,"rem"),this._tilesLoaded=!1,document.getElementById("map-output").style.width="".concat(e,"px"),document.getElementById("map-output").style.position="absolute",document.getElementById("map-output").classList.remove("shadow"),document.getElementById("map-output").style.boxShadow="none",requestAnimationFrame((function(){n._map.invalidateSize(),n._map.fitBounds(o),document.getElementById("print-status").innerHTML="En attente du chargement des tuiles de la carte...",document.getElementById("print-progress").style.width="25%"}))}},{key:"_dlPerformMapPrint",value:function(e){var t=this;!0===this._tilesLoaded&&(document.getElementById("print-status").innerHTML="Tuiles chargées, démarrage de l'export...",document.getElementById("print-progress").style.width="66%",clearInterval(this._intervalId),this._tilesLoaded=!1,requestAnimationFrame((function(){window.html2canvas(document.getElementById("map-output"),{logging:i,useCORS:!0,allowTaint:!0,width:document.getElementById("map-output").offsetWidth,height:document.getElementById("map-output").offsetHeight}).then(t._dlMap.bind(t,e)).catch((function(o){console.error(o),t._dlRestoreMap(e)}))})))}},{key:"_dlMap",value:function(e,t){document.getElementById("print-status").innerHTML="Export terminé. Sauvegarde sur le disque en cours...",document.getElementById("print-progress").style.width="88%";var o=this.getOutputFileType(),n=document.createElement("A");if(n.download="".concat(document.getElementById("title").innerHTML,".").concat(o.extension),"pdf"===o.type){var i=document.getElementById("image-width-label").innerHTML.split("—")[1].replace(" ","").substring(0,2),r=new a({format:i,precision:20}),l=r.internal.pageSize.getWidth(),s=r.internal.pageSize.getHeight();r.addImage(t.toDataURL("image/png",1),"PNG",0,0,l,s),r.save("".concat(document.getElementById("title").innerHTML,".pdf"))}else n.href=t.toDataURL("image/".concat(o.type),1),n.click();this._dlRestoreMap(e)}},{key:"_dlRestoreMap",value:function(e){var t=this;document.getElementById("print-status").innerHTML="Remise en état du style initial...",document.getElementById("print-progress").style.width="100%",document.querySelector(".leaflet-top.leaflet-left").style.display="inherit",document.querySelector(".leaflet-top.leaflet-right").style.display="inherit",document.body.style.fontSize="1.2rem",document.getElementById("map-output").style="",document.getElementById("map-output").classList.add("shadow"),document.getElementById("print-overlay").style.opacity=0,setTimeout((function(){return document.getElementById("print-overlay").style.zIndex=-1}),200),requestAnimationFrame((function(){t._map.invalidateSize(),t._map.fitBounds(e)}))}},{key:"_fetchModal",value:function(e){return new Promise((function(t){fetch("assets/html/".concat(e,".html")).then((function(e){e.text().then((function(e){t(document.createRange().createContextualFragment(e))}))}))}))}},{key:"_closeModal",value:function(e,t){!0!==t&&"modal-overlay"!==e.target.id&&-1===e.target.id.indexOf("close")||(document.getElementById("modal-overlay").style.opacity=0,setTimeout((function(){document.getElementById("modal-overlay").style.display="none",document.getElementById("modal-overlay").innerHTML=""}),300))}},{key:"getOutputFileType",value:function(){var e={extension:"png",type:"png"};return Array.from(document.getElementById("image-type").elements).forEach((function(t){!0===t.checked&&(e.extension=t.dataset.extension,e.type=t.dataset.type)})),e}},{key:"precisionRound",value:function(e,t){var o=Math.pow(10,t||0);return Math.round(e*o)/o}}])&&t(n.prototype,r),Object.defineProperty(n,"prototype",{writable:!1}),o}()}(),window.MapPoster=n.default}();