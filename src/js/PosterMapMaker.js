import '../scss/PosterMapMaker.scss';
import './SmoothWheelZoom.js';
import MapProviders from './MapProviders.js';


const CONST = {
  VERSION: '0.0.1',
  DEBUG: true
};


class PosterMapMaker {


  constructor() {
    this._map = null;
    this._data = null;

    this._baseLayer = {};
    this._overlayLayer = {};

    this._tilesLoaded = false;
    this._intervalId = -1;

    this._initMap()
      .then(this._initEvents.bind(this));
  }
  

  _initMap() {
    return new Promise(resolve => {
      // Use main div to inject OSM into
      this._map = window.L.map('map', {
        attributionControl: false,
        zoomSnap: 0, // On resize, all fitBounds to precisely be set
        scrollWheelZoom: false, // SmoothWheelZoom lib
        smoothWheelZoom: true, // SmoothWheelZoom lib
        smoothSensitivity: 1, // SmoothWheelZoom lib
      }).setView([48.038878, -4.736737], 13);
      // Add layer group to interface
      MapProviders.layers.OpenStreetMap.addTo(this._map);
      // Add layer switch radio on bottom right of the map
      window.L.control.layers(MapProviders.layers, MapProviders.overlays, { position: 'topright' }).addTo(this._map);
      this._applyTexts();
      resolve();
    });
  }


  _initEvents() {
    return new Promise(resolve => {
      // Subscribe to click event on map to react
      this._map.on('click', this._mapClicked.bind(this));
      // Kolor Pick Events
      document.getElementById('title-color').addEventListener('click', this._colorPicker.bind(this));
      document.getElementById('subtitle-color').addEventListener('click', this._colorPicker.bind(this));
      document.getElementById('comment-color').addEventListener('click', this._colorPicker.bind(this));
      // Listening to close modal event
      document.getElementById('modal-overlay').addEventListener('click', this._closeModal.bind(this));
      // Text edit events
      document.getElementById('user-title').addEventListener('input', this._applyTexts.bind(this));
      document.getElementById('user-subtitle').addEventListener('input', this._applyTexts.bind(this));
      document.getElementById('user-comment').addEventListener('input', this._applyTexts.bind(this));

      document.getElementById('image-width').addEventListener('input', this._updateOutputWidth.bind(this));
      document.getElementById('map-save').addEventListener('click', this._download.bind(this));
      // Load event on map layers
      for (const layer in MapProviders.layers) {
        MapProviders.layers[layer].on('load', () => this._tilesLoaded = true);
      }
      resolve();
    });
  }



  /* Event callbacks */


  _mapClicked(opts) {
    console.log(opts);
  }


  _colorPicker(e) {
    this._fetchModal('colorpick').then(dom => {
      const picker = new window.KolorPick({
        renderTo: dom.querySelector('#picker-container'),
        type: 'linear', // Either linear or radial
        style: {
          bg: 'transparent',
          padding: 0
        },
        onColorChange: data => { // Callback method called on each color modification
          if (document.getElementById('applied-color')) {
            e.target.style.backgroundColor = document.getElementById('applied-color').style.backgroundColor;
            document.getElementById(e.target.dataset.type).style.color = document.getElementById('applied-color').style.backgroundColor;
            document.getElementById('applied-color').style.backgroundColor = data.hex;
          }
        }
      });

			dom.querySelector('#confirm').addEventListener('click', () => {
        e.target.style.backgroundColor = document.getElementById('applied-color').style.backgroundColor;
        document.getElementById(e.target.dataset.type).style.color = document.getElementById('applied-color').style.backgroundColor;
        picker.destroy();
        this._closeModal(null, true);
      });
			document.getElementById('modal-overlay').appendChild(dom);
      document.getElementById('modal-overlay').style.display = 'flex';
			setTimeout(() => document.getElementById('modal-overlay').style.opacity = 1, 50);      
    });
  }


  _applyTexts() {
    document.getElementById('title').innerHTML = document.getElementById('user-title').value;
    document.getElementById('subtitle').innerHTML = document.getElementById('user-subtitle').value;
    document.getElementById('comment').innerHTML = document.getElementById('user-comment').value;
  }


  _updateOutputWidth(e) {
    const label = e.target.previousElementSibling;
    let text = 'A5 (Low res)';
    if (e.target.value > 4961) {
      text = '2'
    } else if (e.target.value > 3508) {
      text = '3'
    } else if (e.target.value > 2480) {
      text = '4'
    } else if (e.target.value > 1754) {
      text = '5'
    } else if (e.target.value > 1241) {
      text = '6'
    } else {
      text = '7'
    }
    label.innerHTML = `Dimension ${e.target.value} x ${this.precisionRound(e.target.value * 29.7 / 21, 0)} — A${text} à 300dpi`;
  }


  /* Download methods */
  // Big boy here :
  // - get currently viewer map bounds
  // - scale map (load tiles for high res) according to user desired size
  // - generate uimage using html2canvas
  // - save to user machine
  // - restore map size and scale
  _download() {
    // First we get the user desired size
    const width = document.getElementById('image-width').value;
    const scale = width / 600;
    const bounds = this._map.getBounds(); // Map bound before scaling
    // Scale map elements according to user desired size
    this._dlPrepareMap(width, scale, bounds); 
    // setInterval on mapPrint to ensure tiles are loaded before downloading (tilesLoaded flag)
    if (scale === 1) { this._tilesLoaded = true; } // Set tiles loaded if no upscale is requested on export
    this._intervalId = setInterval(this._dlPerformMapPrint.bind(this, bounds), 2000); // We put a 2s timeout to ensure latest tiles are properly loaded
  }


  _dlPrepareMap(width, scale, bounds) {
    if (CONST.DEBUG) { console.log('Prepare map style for printing...'); }
    // Hide Leaflet.js overlays
    document.querySelector('.leaflet-top.leaflet-left').style.display = 'none';
    document.querySelector('.leaflet-top.leaflet-right').style.display = 'none';
    // Scale CSS variables
    document.getElementById('map-output').style.setProperty('--padding', `${3 * scale}rem`);
    document.getElementById('map-output').style.setProperty('--thick-border', `${5 * scale}px`);
    document.getElementById('map-output').style.setProperty('--small-border', `${1 * scale}px`);
    document.body.style.fontSize = `${1.2 * scale}rem`;
    // Set tiles loaded flag to false to wait for reframe to occur
    this._tilesLoaded = false;
    // Scale map dimension and attributes
    document.getElementById('map-output').style.width = `${width}px`;
    document.getElementById('map-output').style.position = 'absolute';
    requestAnimationFrame(() => {
      this._map.invalidateSize();
      this._map.fitBounds(bounds);
      if (CONST.DEBUG) { console.log('Waiting for map tiles to load...'); }
    });
  }


  _dlRestoreMap(bounds) {
    if (CONST.DEBUG) { console.log('Restoring map style to default...'); }
    // Restore Leaflet.js overlays
    document.querySelector('.leaflet-top.leaflet-left').style.display = 'inherit';
    document.querySelector('.leaflet-top.leaflet-right').style.display = 'inherit';
    // Restore CSS variables
    document.getElementById('map-output').style.setProperty('--padding', `3rem`);
    document.getElementById('map-output').style.setProperty('--thick-border', `5px`);
    document.getElementById('map-output').style.setProperty('--small-border', `1px`);
    document.body.style.fontSize = `1.2rem`;      
    // Restore map dimension and attributes
    document.getElementById('map-output').style.width = '600px';
    document.getElementById('map-output').style.position = 'inherit';
    requestAnimationFrame(() => {
      this._map.invalidateSize();
      this._map.fitBounds(bounds);
      if (CONST.DEBUG) { console.log('Map properly restored'); }
    });  
  }


  _dlPerformMapPrint(bounds) {
    // Perform map print with html2canvas if all tiles are loaded
    if (this._tilesLoaded === true) {
      if (CONST.DEBUG) { console.log('Map tiles loaded, performing printing...'); }        
      clearInterval(this._intervalId);
      this._tilesLoaded = false;
      requestAnimationFrame(() => {      
        // Execute html2canvas with output div
        window.html2canvas(document.getElementById('map-output'), {
          logging: CONST.DEBUG,
          useCORS: true,
          allowTaint: true,
          width: document.getElementById('map-output').offsetWidth,
          height: document.getElementById('map-output').offsetHeight
        }).then(this._dlMap.bind(this, bounds));
      });
    }
  }


  _dlMap(bounds, canvas) {
    if (CONST.DEBUG) { console.log('Canvas printing done, exporting image to disk...'); }             
    const file = this._getOutputFileType();
    const link = document.createElement('A');
    link.download = `${document.getElementById('title').innerHTML}.${file.extension}`;
    link.href = canvas.toDataURL(`image/${file.type}`);
    link.click();
    // Restore map to default value        
    this._dlRestoreMap(bounds);
  }


  /* Input value and utils */


  _getOutputFileType() {
    const file = {
      extension: 'png',
      type: 'png'
    };
    Array.from(document.getElementById('image-type').elements).forEach(el => {
      if (el.checked === true) {
        file.extension = el.dataset.extension;
        file.type = el.dataset.type;
      }
    });
    return file;
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


  /* Utils */


  precisionRound(value, precision) {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }


}


export default PosterMapMaker;
