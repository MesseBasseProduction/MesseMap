import '../scss/PosterMapMaker.scss';
import './SmoothWheelZoom.js';
import MapProviders from './MapProviders.js';


const { jsPDF } = window.jspdf;
const CONST = {
  VERSION: '0.0.3',
  DEBUG: true
};


class PosterMapMaker {


  constructor() {
    this._map = null;
    this._data = null;
    this._baseLayer = {};
    this._overlayLayer = {};
    this._shadowStyleBackup = '';
    this._tilesLoaded = false;
    this._intervalId = -1;
    this._isDownloading = false;

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
      }).setView([44.79777779831652, 1.542703666063447], 5);
      // Add layer group to interface
      MapProviders.layers['Esri Satellite'].addTo(this._map);
      // Add layer switch radio on bottom right of the map
      window.L.control.layers(MapProviders.layers, MapProviders.overlays, { position: 'topright' }).addTo(this._map);
      this._applyTexts();
      // Remove webp from Firefox browser as it is not supported (yet I hope)
      if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        const webp = document.getElementById('webp').parentNode;
        const parent = webp.parentNode;
        parent.removeChild(webp);
      }
      resolve();
    });
  }


  _initEvents() {
    return new Promise(resolve => {
      // Kolor Pick Events
      document.getElementById('title-color').addEventListener('click', this._textEdit.bind(this));
      document.getElementById('subtitle-color').addEventListener('click', this._textEdit.bind(this));
      document.getElementById('comment-color').addEventListener('click', this._textEdit.bind(this));
      // Listening to close modal event
      document.getElementById('modal-overlay').addEventListener('click', this._closeModal.bind(this));
      // Text edit events
      document.getElementById('user-title').addEventListener('input', this._applyTexts.bind(this));
      document.getElementById('user-subtitle').addEventListener('input', this._applyTexts.bind(this));
      document.getElementById('user-comment').addEventListener('input', this._applyTexts.bind(this));
      // Export settings
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


  _textEdit(e) {
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
            document.getElementById('applied-color').style.backgroundColor = data.hex;
            if (e.target.tagName === 'IMG') {
              e.target.parentNode.style.borderColor = document.getElementById('applied-color').style.backgroundColor;
              e.target.parentNode.previousElementSibling.style.borderColor = document.getElementById('applied-color').style.backgroundColor;
            } else {
              e.target.style.borderColor = document.getElementById('applied-color').style.backgroundColor;
              e.target.previousElementSibling.style.borderColor = document.getElementById('applied-color').style.backgroundColor;
            }
            document.getElementById(e.target.dataset.type).style.color = document.getElementById('applied-color').style.backgroundColor;
          }
        }
      });

			dom.querySelector('#confirm').addEventListener('click', () => {
        if (e.target.tagName === 'IMG') {
          e.target.parentNode.style.borderColor = document.getElementById('applied-color').style.backgroundColor;
          e.target.parentNode.previousElementSibling.style.borderColor = document.getElementById('applied-color').style.backgroundColor;
        } else {
          e.target.style.borderColor = document.getElementById('applied-color').style.backgroundColor;
          e.target.previousElementSibling.style.borderColor = document.getElementById('applied-color').style.backgroundColor;
        }
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
    let text = '';
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
    // Update label with given slider value
    label.innerHTML = `Dimension : ${e.target.value} x ${this.precisionRound(e.target.value * 29.7 / 21, 0)} — A${text} à 300dpi`;
  }


  /* Download methods */
  // Big boy here :
  // - get currently viewer map bounds
  // - scale map (load tiles for high res) according to user desired size
  // - generate uimage using html2canvas
  // - save to user machine
  // - restore map size and scale
  _download() {
    document.getElementById('print-overlay').style.zIndex = 99;    
    document.getElementById('print-overlay').style.opacity = 1;
    requestAnimationFrame(() => {
      // First we get the user desired size
      const width = document.getElementById('image-width').value;
      const scale = width / 600;
      const bounds = this._map.getBounds(); // Map bound before scaling
      // Scale map elements according to user desired size
      this._dlPrepareMap(width, scale, bounds);
      // setInterval on mapPrint to ensure tiles are loaded before downloading (tilesLoaded flag)
      if (scale === 1) { this._tilesLoaded = true; } // Set tiles loaded if no upscale is requested on export
      this._intervalId = setInterval(this._dlPerformMapPrint.bind(this, bounds), 2000); // We put a 2s timeout to ensure latest tiles are properly loaded
    });
  }


  _dlPrepareMap(width, scale, bounds) {
    if (CONST.DEBUG) { console.log('Prepare map style for printing...'); }
    document.getElementById('print-status').innerHTML = `Préparation du style de la carte pour l'export...`;
    document.getElementById('print-progress').style.width = '10%';
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
    // Remove box shadow from map container
    this._shadowStyleBackup = document.getElementById('map-output').style.boxShadow;
    document.getElementById('map-output').style.boxShadow = 'none';
    requestAnimationFrame(() => {
      this._map.invalidateSize();
      this._map.fitBounds(bounds);
      if (CONST.DEBUG) { console.log('Waiting for map tiles to load...'); }
      document.getElementById('print-status').innerHTML = `En attente du chargement des tuiles de la carte...`;
      document.getElementById('print-progress').style.width = '25%';
    });
  }


  _dlPerformMapPrint(bounds) {
    // Perform map print with html2canvas if all tiles are loaded
    if (this._tilesLoaded === true) {
      if (CONST.DEBUG) { console.log('Map tiles loaded, performing printing...'); }
      document.getElementById('print-status').innerHTML = `Tuiles chargées, démarrage de l'export...`;
      document.getElementById('print-progress').style.width = '66%';
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
        }).then(this._dlMap.bind(this, bounds)).catch(this._dlRestoreMap.bind(this, bounds));
      });
    }
  }


  _dlMap(bounds, canvas) {
    if (CONST.DEBUG) { console.log('Canvas printing done, exporting image to disk...'); }
    document.getElementById('print-status').innerHTML = `Export terminé. Sauvegarde sur le disque en cours...`;
    document.getElementById('print-progress').style.width = '88%';
    const file = this._getOutputFileType();
    const link = document.createElement('A');
    link.download = `${document.getElementById('title').innerHTML}.${file.extension}`;
    if (file.type === 'pdf') {
      const pageFormat = document.getElementById('image-width-label').innerHTML.split('—')[1].replace(' ', '').substring(0, 2);
      let pdf = new jsPDF({
        format: pageFormat,
        precision: 20
      });
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, width, height);
      pdf.save(`${document.getElementById('title').innerHTML}.pdf`);
    } else {
      link.href = canvas.toDataURL(`image/${file.type}`);
      link.click();
    }
    // Restore map to default value
    this._dlRestoreMap(bounds);
  }


  _dlRestoreMap(bounds) {
    if (CONST.DEBUG) { console.log('Restoring map style to default...'); }
    document.getElementById('print-status').innerHTML = `Remise en état du style initial...`;
    document.getElementById('print-progress').style.width = '100%';
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
    // Restore map container box shadow
    document.getElementById('map-output').style.boxShadow = this._shadowStyleBackup;
    // Remove print overlay
    document.getElementById('print-overlay').style.opacity = 0;
    setTimeout(() => document.getElementById('print-overlay').style.zIndex = -1, 200)
    requestAnimationFrame(() => {
      this._map.invalidateSize();
      this._map.fitBounds(bounds);
      if (CONST.DEBUG) { console.log('Map properly restored'); }
    });
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
