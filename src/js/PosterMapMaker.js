import '../scss/PosterMapMaker.scss';
import Utils from './utils/Utils.js';


class PosterMapMaker {


  constructor() {
    this._map = null;
    this._data = null;

    this._initMap()
      .then(this._initEvents.bind(this));
  }
  

  _initMap() {
    return new Promise(resolve => {
      // Use main div to inject OSM into
      this._map = window.L.map('map', {
        zoomControl: false,
      }).setView([48, -4.8], 11);
      // Add OSM credits to the map next to leaflet credits
      const osm = window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '',
        maxZoom: 21,
        maxNativeZoom: 19, // To ensure tiles are not unloaded when zooming after 19
        minZoom: 2 // Don't allow dezooming too far from map so it always stay fully visible
      });

      const geoPortail = window.L.tileLayer('https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
        attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
        bounds: [[-75, -180], [81, 180]],
        minZoom: 2,
        maxZoom: 19,
        apikey: 'choisirgeoportail',
        format: 'image/jpeg',
        style: 'normal'
      });

      var tonerLegend = window.L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}', {
        attribution: '',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
      });

      var toner = window.L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
      });

      var tonerLite = window.L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
      });  
      
      var stadia = window.L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      });
      
      var stadiaDark = window.L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      });
      // Prevent panning outside of the world's edge
      this._map.setMaxBounds(Utils.MAP_BOUNDS);
      // Add layer group to interface
      const baseMaps = {};
      baseMaps[`Carte`] = osm;
      baseMaps[`Satellite`] = geoPortail;
      baseMaps[`Toner`] = toner;
      baseMaps[`Toner (Lite)`] = tonerLite;
      baseMaps[`Toner (Legend)`] = tonerLegend;
      baseMaps[`Stadia`] = stadia;
      baseMaps[`Stadia (Dark)`] = stadiaDark;
      osm.addTo(this._map);
      // Add layer switch radio on bottom right of the map
      window.L.control.layers(baseMaps, {}, { position: 'topright' }).addTo(this._map);
      resolve();
    });
  }


  _initEvents() {
    return new Promise(resolve => {
      // Subscribe to click event on map to react
      this._map.on('click', this._mapClicked.bind(this));
      // Map is dragged by user mouse/finger
      this._map.on('drag', () => {
        // Constrain pan to the map bounds
        this._map.panInsideBounds(window.L.latLngBounds(
          window.L.latLng(-89.98155760646617, -180),
          window.L.latLng(89.99346179538875, 180)
        ), { animate: true });
      });
      // Listening to close modal event
			//document.getElementById('modal-overlay').addEventListener('click', this._closeModal.bind(this));
			document.getElementById('apply-coordinates').addEventListener('click', this._applyCoordinates.bind(this));
			document.getElementById('apply-text').addEventListener('click', this._applyTexts.bind(this));
      resolve();
    });
  }



  /* Event interaction */


  _mapClicked(opts) {
    console.log(opts);
  }


  _applyCoordinates() {
    const lat = document.getElementById('user-lat');
    const lng = document.getElementById('user-lng');
    if (lat.value !== '' && lng.value !== '') {
      this._map.setView([lat.value, lng.value]);
    }
  }


  _applyTexts() {
    document.getElementById('title').innerHTML = document.getElementById('user-title').value;
    document.getElementById('subtitle').innerHTML = document.getElementById('user-subtitle').value;
    document.getElementById('comment').innerHTML = document.getElementById('user-comment').value;
  }


  /* Modal methods */


  _fetchModal(url) {
    return new Promise(resolve => {
      fetch(`assets/html/${url}.html`).then(data => {
        data.text().then(html => {
          resolve(document.createRange().createContextualFragment(html));
        });
      });
    });
  }


  _closeModal(event, force) {
		if (force === true || event.target.id === 'modal-overlay' || event.target.id.indexOf('close') !== -1) {
      document.getElementById('modal-overlay').style.opacity = 0;
      setTimeout(() => {
        document.getElementById('modal-overlay').style.display = 'none';
        document.getElementById('modal-overlay').innerHTML = '';
      }, 300);
    }
  }


}


export default PosterMapMaker;
