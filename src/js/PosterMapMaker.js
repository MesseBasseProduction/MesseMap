import '../scss/PosterMapMaker.scss';
import './SmoothWheelZoom.js';
import MapProviders from './MapProviders.js';

class PosterMapMaker {


  constructor() {
    this._map = null;
    this._data = null;

    this._baseLayer = {};
    this._overlayLayer = {};

    this._initMap()
      .then(this._initEvents.bind(this));
  }
  

  _initMap() {
    return new Promise(resolve => {
      // Use main div to inject OSM into
      this._map = window.L.map('map', {
        attributionControl: false,
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
			document.getElementById('apply-coordinates').addEventListener('click', this._applyCoordinates.bind(this));
			document.getElementById('apply-text').addEventListener('click', this._applyTexts.bind(this));
			document.getElementById('map-save').addEventListener('click', this._download.bind(this));
      resolve();
    });
  }



  /* Event interaction */


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
          border: 'black',
          picking: 'white',
          padding: 20
        },
        onColorChange: data => { // Callback method called on each color modification
          if (document.getElementById('applied-color')) {
            e.target.style.backgroundColor = document.getElementById('applied-color').style.backgroundColor;
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


  _download() {
    document.querySelector('.leaflet-top.leaflet-left').style.display = 'none';
    document.querySelector('.leaflet-top.leaflet-right').style.display = 'none';
    // Execute html2canvas with output div
    window.html2canvas(document.getElementById('map-output'), {
      logging: true,
      useCORS: true,
      allowTaint: true,
      width: document.getElementById('map-output').offsetWidth,
      height: document.getElementById('map-output').offsetHeight,
      scale: 8, // Ensure a good output resolution
    }).then((canvas) => {
      const link = document.createElement('A');
      link.download = 'orly-generator.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
      document.querySelector('.leaflet-top.leaflet-left').style.display = 'inherit';
      document.querySelector('.leaflet-top.leaflet-right').style.display = 'inherit';
    });
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
