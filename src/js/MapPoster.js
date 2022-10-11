import '../scss/MapPoster.scss';
import './SmoothWheelZoom.js';
import MapProviders from './MapProviders.js';
const { jsPDF } = window.jspdf;


const CONST = {
  VERSION: '0.0.3',
  DEBUG: false
};


/**
 * @class
 * @constructor
 * @public
**/
class MapPoster {


  /**
   * @summary The MapPoster main component
   * @author Arthur Beaulieu
   * @since October 2022
   * @description
   * <blockquote>
   * The MapPoster class is made to handle the whole application, its interactivity
   * and all its user events. It hold the code to generate the poster output and serve
   * it to the user. (see README.md for further details about used libraries).
   * This constructor will initialize the Leaflet map and all its manipulators and will
   * then listen to user events for text and export settings.
   * </blockquote>
   **/
  constructor() {
    /**
     * The core Leaflet.js map
     * @type {Object}
     * @private
     **/
    this._map = null;
    /**
     * The flag to ensure all tiles are loaded before printing canvas to image
     * @type {Boolean}
     * @private
     **/
    this._tilesLoaded = false;
    /**
     * setInterval ID used to frequently ask for printing (only if tiles are loaded)
     * @type {Number}
     * @private
     **/
    this._intervalId = -1;
    // Begin the initialization sequence (interface and events)
    this._initInterface()
      .then(this._initEvents.bind(this))
      .catch((error) => { console.error(error); });
  }


  // ======================================================================= //
  // ----------------- Application initialization sequence ----------------- //
  // ======================================================================= //


  /**
   * @method
   * @name _initInterface
   * @private
   * @memberof MapPoster
   * @author Arthur Beaulieu
   * @since October 2022
   * @description
   * <blockquote>
   * The <code>_initInterface()</code> method will create the Leaflet map and insert it to the DOM.
   * It will then handle the supported layer (in MapProviders) and will finally update
   * text in poster according to input default values.
   * It returns a promise that is resolved when interface is initialized, or that is
   * rejected there is no Leaflet in the user session (fatal error).
   * </blockquote>
   * @returns {Promise} A resolved or rejected Promise
   **/  
   _initInterface() {
    return new Promise((resolve, reject) => {
      try {
        // Use #map div to inject Leaflet in, use SmoothWheelZoom flags
        this._map = window.L.map('map', {
          attributionControl: false,
          zoomSnap: 0, // On resize, all fitBounds to precisely be set
          scrollWheelZoom: false, // SmoothWheelZoom lib
          smoothWheelZoom: true, // SmoothWheelZoom lib
          smoothSensitivity: 1, // SmoothWheelZoom lib
        }).setView([44.79777779831652, 1.542703666063447], 5);
      } catch (error) {
        // The only eror case is Leaflet doesn't exist here
        reject(error);
        return;
      }
      // Add default layer in map
      MapProviders.layers['Esri Satellite'].addTo(this._map);
      // Add layer switch radio on bottom right of the map
      window.L.control.layers(MapProviders.layers, MapProviders.overlays, { position: 'topright' }).addTo(this._map);
      // Apply default input text to poster
      this._applyTexts();
      resolve();
    });
  }


  /**
   * @method
   * @name _initEvents
   * @private
   * @memberof MapPoster
   * @author Arthur Beaulieu
   * @since October 2022
   * @description
   * <blockquote>
   * The <code>_initEvents()</code> method will listen to all required events to manipulate the map
   * and to modify the poster style and texts. Those events.
   * It returns a promise that is resolved when interface is initialized. There is no reject case.
   * </blockquote>
   * @returns {Promise} A resolved Promise
   **/
  _initEvents() {
    return new Promise(resolve => {
      // Map style
      const styles = document.getElementById('map-style');
      for (let i = 0; i < styles.children.length; ++i) {
        styles.children[i].addEventListener('click', this._updateMapStyle.bind(this));
      }
      // Text modification events (color, style etc.)
      document.getElementById('title-color').addEventListener('click', this._textEditModal.bind(this));
      document.getElementById('subtitle-color').addEventListener('click', this._textEditModal.bind(this));
      document.getElementById('comment-color').addEventListener('click', this._textEditModal.bind(this));
      // Listening to close modal event
      document.getElementById('modal-overlay').addEventListener('click', this._closeModal.bind(this));
      // Input text events
      document.getElementById('user-title').addEventListener('input', this._applyTexts.bind(this));
      document.getElementById('user-subtitle').addEventListener('input', this._applyTexts.bind(this));
      document.getElementById('user-comment').addEventListener('input', this._applyTexts.bind(this));
      // Export settings
      document.getElementById('image-width').addEventListener('input', this._updateDimensionLabel.bind(this));
      document.getElementById('map-save').addEventListener('click', this._download.bind(this));
      // Load event on map layers for loaded tiles (to ensure the printing occurs with all map tiles)
      for (const layer in MapProviders.layers) {
        MapProviders.layers[layer].on('load', () => this._tilesLoaded = true);
      }
      resolve();
    });
  }



  // ======================================================================= //
  // ----------------------- Input events callbacks ------------------------ //
  // ======================================================================= //


  /**
   * @method
   * @name _updateMapStyle
   * @private
   * @memberof MapPoster
   * @author Arthur Beaulieu
   * @since October 2022
   * @description
   * <blockquote>
   * Updates the map style according to the element the user clicked on. All styles
   * are handled in the scss style file.
   * </blockquote>
   * @param {Event} e - The click event on the style button
   **/
  _updateMapStyle(e) {
    let previousStyle = '';
    const styles = document.getElementById('map-style');
    for (let i = 0; i < styles.children.length; ++i) {
      if (styles.children[i].classList.contains('selected')) {
        previousStyle = styles.children[i].dataset.style;
        styles.children[i].classList.remove('selected');
        break;
      }
    }
    // Update menu, remove previous style from map and add new style to map
    e.target.classList.add('selected');
    document.getElementById('map-output').classList.remove(`${previousStyle}-style`);
    document.getElementById('map-output').classList.add(`${e.target.dataset.style}-style`);
  }


  /**
   * @method
   * @name _textEditModal
   * @private
   * @memberof MapPoster
   * @author Arthur Beaulieu
   * @since October 2022
   * @description
   * <blockquote>
   * Request the text edit modal for a given input, fills the modal with a KolorPick and
   * make it interactive to update the matching input and text on the poster.
   * </blockquote>
   * @param {Event} e - The click event on the text edit button
   **/
  _textEditModal(e) {
    this._fetchModal('textedit').then(dom => {
      // Internal color update method
      const _updateColors = () => {
        if (e.target.tagName === 'IMG') {
          // User clicked on gear SVG, we have to go up to parentNode to alter borders
          e.target.parentNode.style.borderColor = document.getElementById('applied-color').style.backgroundColor;
          e.target.parentNode.previousElementSibling.style.borderColor = document.getElementById('applied-color').style.backgroundColor;
        } else {
          // User clicked on button (except gear SVG)
          e.target.style.borderColor = document.getElementById('applied-color').style.backgroundColor;
          e.target.previousElementSibling.style.borderColor = document.getElementById('applied-color').style.backgroundColor;
        }
        // Update poster associated text
        document.getElementById(e.target.dataset.type).style.color = document.getElementById('applied-color').style.backgroundColor;
      };
      // Create KolorPick and inject into modal
      const picker = new window.KolorPick({
        renderTo: dom.querySelector('#picker-container'),
        type: 'linear',
        style: {
          bg: 'transparent',
          padding: 0
        },
        onColorChange: data => {
          if (document.getElementById('applied-color')) {
            document.getElementById('applied-color').style.backgroundColor = data.hex;
            _updateColors();
          }
        }
      });
      // Close modal button event
			dom.querySelector('#confirm').addEventListener('click', () => {
        _updateColors(); // Apply latest color
        picker.destroy(); // Free modal KolorPick
        this._closeModal(null, true); // Force modal close with flag
      });
      // Modal start animation (close animation handled in _closeModal())
			document.getElementById('modal-overlay').appendChild(dom);
      document.getElementById('modal-overlay').style.display = 'flex';
			setTimeout(() => document.getElementById('modal-overlay').style.opacity = 1, 50);
    });
  }


  /**
   * @method
   * @name _applyTexts
   * @private
   * @memberof MapPoster
   * @author Arthur Beaulieu
   * @since October 2022
   * @description
   * <blockquote>
   * Simply apply the input text to the poster (for title, subtitle and comment)
   * </blockquote>
   **/
  _applyTexts() {
    document.getElementById('title').innerHTML = document.getElementById('user-title').value;
    document.getElementById('subtitle').innerHTML = document.getElementById('user-subtitle').value;
    document.getElementById('comment').innerHTML = document.getElementById('user-comment').value;
  }


  /**
   * @method
   * @name _updateDimensionLabel
   * @private
   * @memberof MapPoster
   * @author Arthur Beaulieu
   * @since October 2022
   * @description
   * <blockquote>
   * Update the export resolution slider label to notify the user the size of the generated
   * poster, at 300 DPI.
   * </blockquote>
   * @param {Event} e - The input event on the resolution slider
   **/
  _updateDimensionLabel(e) {
    const label = e.target.previousElementSibling;
    let a = '7';
    if (e.target.value > 4961) {
      a = '2'
    } else if (e.target.value > 3508) {
      a = '3'
    } else if (e.target.value > 2480) {
      a = '4'
    } else if (e.target.value > 1754) {
      a = '5'
    } else if (e.target.value > 1241) {
      a = '6'
    }
    // Update label with slider value, computed height and matching paper format
    const height = this.precisionRound(e.target.value * 29.7 / 21, 0);
    label.innerHTML = `Dimension : ${e.target.value} x ${height} — A${a} à 300dpi`;
  }


  // ======================================================================= //
  // ------------------ Printing and downloading methods ------------------- //
  // ======================================================================= //


  /** 
   * @method
   * @name _download
   * @private
   * @memberof MapPoster
   * @author Arthur Beaulieu
   * @since October 2022
   * @description 
   * <blockquote>
   * Start the download routine. First, hide the app with a loading overlay,
   * then apply the user output dimension (set from the slider) to scale the
   * poster to its final dimension, then ensure all tiles are loaded before
   * starting html2canvas on that DIV. Finally, export to disk the canvas to
   * image and restore the DOM to its initial size and scale.
   * </blockquote>
  **/
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


  /** 
   * @method
   * @name _dlPrepareMap
   * @private
   * @memberof MapPoster
   * @author Arthur Beaulieu
   * @since October 2022
   * @description 
   * <blockquote>
   * Before starting the downloading of the poster, the map must be scaled in order to
   * honor the requested dimension. To do so, the map-output div is scaled according to the
   * slider position, and the leaflet map is properly positionned to keep the user's viewport,
   * not matter the upscale it request (there is a limitation with maxZoom of the map, which
   * can not be overpassed).
   * </blockquote>
   * @param {Number} width - The poster width to use
   * @param {Number} scale - The poster scale compared to the classical 600px wide one
   * @param {Object} bounds - The map bounds requested for the printing
  **/
  _dlPrepareMap(width, scale, bounds) {
    if (CONST.DEBUG) { console.log('Prepare map style for printing...'); }
    document.getElementById('print-status').innerHTML = `Préparation du style de la carte pour l'export...`;
    document.getElementById('print-progress').style.width = '10%';
    // Hide Leaflet.js overlays
    document.querySelector('.leaflet-top.leaflet-left').style.display = 'none';
    document.querySelector('.leaflet-top.leaflet-right').style.display = 'none';
    // Scale CSS variables
    const cssVars = {
      padding: parseInt(window.getComputedStyle(document.getElementById('map-output')).getPropertyValue('--padding').replace('rem', '')),
      thickBorder: parseInt(window.getComputedStyle(document.getElementById('map-output')).getPropertyValue('--thick-border').replace('px', '')),
      smallBorder: parseInt(window.getComputedStyle(document.getElementById('map-output')).getPropertyValue('--small-border').replace('px', ''))
    };
    document.getElementById('map-output').style.setProperty('--padding', `${cssVars.padding * scale}rem`);
    document.getElementById('map-output').style.setProperty('--thick-border', `${cssVars.thickBorder * scale}px`);
    document.getElementById('map-output').style.setProperty('--small-border', `${cssVars.smallBorder * scale}px`);
    document.body.style.fontSize = `${1.2 * scale}rem`;
    // Set tiles loaded flag to false to wait for reframe to occur
    this._tilesLoaded = false;
    // Scale map dimension and attributes
    document.getElementById('map-output').style.width = `${width}px`;
    document.getElementById('map-output').style.position = 'absolute';
    // Remove box shadow from map container
    document.getElementById('map-output').classList.remove('shadow');
    document.getElementById('map-output').style.boxShadow = 'none';
    requestAnimationFrame(() => {
      this._map.invalidateSize();
      this._map.fitBounds(bounds);
      if (CONST.DEBUG) { console.log('Waiting for map tiles to load...'); }
      document.getElementById('print-status').innerHTML = `En attente du chargement des tuiles de la carte...`;
      document.getElementById('print-progress').style.width = '25%';
    });
  }


  /** 
   * @method
   * @name _dlPerformMapPrint
   * @private
   * @memberof MapPoster
   * @author Arthur Beaulieu
   * @since October 2022
   * @description 
   * <blockquote>
   * The method will perform its logic only if all tiles are loaded. If so, it will use html2canvas library
   * to perform a conversion between poster into a canvas that will be later used to save the poster
   * to the user disk. Call this method in a setInterval to regulary test if tiles are loaded.
   * </blockquote>
   * @param {Object} bounds - The map bounds requested for the printing (here just to be passe to _dlRestoreMap())
  **/
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
        }).then(this._dlMap.bind(this, bounds)).catch((error) => {
          console.error(error);
          this._dlRestoreMap(bounds);         
        });
      });
    }
  }


  /** 
   * @method
   * @name _dlMap
   * @private
   * @memberof MapPoster
   * @author Arthur Beaulieu
   * @since October 2022
   * @description 
   * <blockquote>
   * The method will export the canvas previously drawn to the user disk, with the
   * curently selected format in the aside. (using jsPDF if so, otherwise, classical href with dataUrl)
   * </blockquote>
   * @param {Object} bounds - The map bounds requested for the printing (here just to be passe to _dlRestoreMap())
   * @param {Object} canvas - The canvas that holds the poster data to be exported to disk
  **/
  _dlMap(bounds, canvas) {
    if (CONST.DEBUG) { console.log('Canvas printing done, exporting image to disk...'); }
    document.getElementById('print-status').innerHTML = `Export terminé. Sauvegarde sur le disque en cours...`;
    document.getElementById('print-progress').style.width = '88%';
    const file = this.getOutputFileType();
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
      pdf.addImage(canvas.toDataURL('image/png', 1.0), 'PNG', 0, 0, width, height);
      pdf.save(`${document.getElementById('title').innerHTML}.pdf`);
    } else {
      link.href = canvas.toDataURL(`image/${file.type}`, 1.0);
      link.click();
    }
    // Restore map to default value
    this._dlRestoreMap(bounds);
  }


  /** 
   * @method
   * @name _dlRestoreMap
   * @private
   * @memberof MapPoster
   * @author Arthur Beaulieu
   * @since October 2022
   * @description 
   * <blockquote>
   * When the poster downloading is done, this method is called to cleanup the map
   * and to restore it to its default size to be then used again.
   * </blockquote>
   * @param {Object} bounds - The map bounds requested for the printing to restore the map with proper viewport
   **/
  _dlRestoreMap(bounds) {
    if (CONST.DEBUG) { console.log('Restoring map style to default...'); }
    document.getElementById('print-status').innerHTML = `Remise en état du style initial...`;
    document.getElementById('print-progress').style.width = '100%';
    // Restore Leaflet.js overlays
    document.querySelector('.leaflet-top.leaflet-left').style.display = 'inherit';
    document.querySelector('.leaflet-top.leaflet-right').style.display = 'inherit';
    document.body.style.fontSize = `1.2rem`;
    // Restore map inline styles and variables
    document.getElementById('map-output').style = '';
    // Restore map container box shadow
    document.getElementById('map-output').classList.add('shadow');
    // Remove print overlay
    document.getElementById('print-overlay').style.opacity = 0;
    setTimeout(() => document.getElementById('print-overlay').style.zIndex = -1, 200)
    requestAnimationFrame(() => {
      this._map.invalidateSize();
      this._map.fitBounds(bounds);
      if (CONST.DEBUG) { console.log('Map properly restored'); }
    });
  }


  // ======================================================================= //
  // --------------------------- Modal methods ----------------------------- //
  // ======================================================================= //


  /** 
   * @method
   * @name _fetchModal
   * @private
   * @memberof MapPoster
   * @author Arthur Beaulieu
   * @since October 2022
   * @description 
   * <blockquote>
   * This method will u_se the fetch API to request the modal HTMl file
   * stored in project <code>assets/html</code>.
   * </blockquote>
   * @param {String} url - The modal filename with no extension in /assets/html/
   * @returns {Promise} A resolved or rejected Promise
   **/
  _fetchModal(url) {
    return new Promise(resolve => {
      fetch(`assets/html/${url}.html`).then(data => {
        data.text().then(html => {
          resolve(document.createRange().createContextualFragment(html));
        });
      });
    });
  }


  /** 
   * @method
   * @name _closeModal
   * @private
   * @memberof MapPoster
   * @author Arthur Beaulieu
   * @since October 2022
   * @description
   * <blockquote>
   * Click on overlay callback event to test if modal needs to be closed. It can be
   * bypassed with a flag to close modal no matter the context.
   * </blockquote>
   * @param {Event} event - The click event
   * @param {Boolean} force - Pass it to true to close the modal no matter the context
   **/
  _closeModal(event, force) {
		if (force === true || event.target.id === 'modal-overlay' || event.target.id.indexOf('close') !== -1) {
      document.getElementById('modal-overlay').style.opacity = 0;
      setTimeout(() => {
        document.getElementById('modal-overlay').style.display = 'none';
        document.getElementById('modal-overlay').innerHTML = '';
      }, 300);
    }
  }


  // ======================================================================= //
  // ----------------------- Generic utils methods ------------------------- //
  // ======================================================================= //


  /**
   * @method
   * @name getOutputFileType
   * @public
   * @memberof MapPoster
   * @author Arthur Beaulieu
   * @since October 2022
   * @description
   * <blockquote>
   * Read DOM fieldset for output format, and return as Object the extension and type to be
   * used when calling <code>toDataURL()</code> on output canvas with proper parameters.
   * </blockquote>
   * @returns {Object} An object that contains extension and type string for selected output type
   **/
  getOutputFileType() {
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


  /**
   * @method
   * @name precisionRound
   * @public
   * @memberof MapPoster
   * @author Arthur Beaulieu
   * @since October 2022
   * @description
   * <blockquote>
   * Do a Math.round with a given precision (ie amount of integers after the coma).
   * </blockquote>
   * @param {Nunmber} value - The value to precisely round
   * @param {Number} precision - The number of integers after the coma
   * @return {Number} - The rounded value
   **/
  precisionRound(value, precision) {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }


}


export default MapPoster;