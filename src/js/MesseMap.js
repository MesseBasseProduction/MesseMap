import '../scss/MesseMap.scss';
import './SmoothWheelZoom.js';
import MapProviders from './MapProviders.js';
const { jsPDF } = window.jspdf;


const CONST = {
  VERSION: '0.0.7',
  DEBUG: false
};


/**
 * @class
 * @constructor
 * @public
**/
class MesseMap {


  /**
   * @summary The MesseMap main component
   * @author Arthur Beaulieu
   * @since October 2022
   * @description
   * <blockquote>
   * The MesseMap class is made to handle the whole application, its interactivity
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
     * The Leaflet control search object
     * @type {Object}
     * @private
     **/
    this._search = null;
    /**
     * The flag to ensure all tiles are loaded before printing canvas to image
     * @type {Boolean}
     * @private
     **/
    this._tilesLoaded = false;
    /**
     * The flag to ensure the comment can be updated with center lat/lng
     * @type {Boolean}
     * @private
     **/
     this._commentEdited = false;
    /**
     * setInterval ID used to frequently ask for printing (only if tiles are loaded)
     * @type {Number}
     * @private
     **/
    this._intervalId = -1;
    /**
     * Hold default or saved theme colors (light/dark)
     * @type {Object}
     * @private
     **/
    this._cssTheme = {};
    /**
     * The currently applied language
     * @type {String}
     * @private
     **/
    this._lang = localStorage.getItem('lang') || 'fr';
    /**
     * The nls file that holds language key values
     * @type {Object}
     * @private
     **/
    this._nls = {};
    // Begin the initialization sequence (interface and events)
    this._initInterface()
      .then(this._initMap.bind(this))
      .then(this._initEvents.bind(this))
      .catch(error => console.error(error));
  }


  // ======================================================================= //
  // ----------------- Application initialization sequence ----------------- //
  // ======================================================================= //


  /**
   * @method
   * @name _initInterface
   * @private
   * @memberof MesseMap
   * @author Arthur Beaulieu
   * @since November 2022
   * @description
   * <blockquote>
   * This method will fetch the proper lang file and then will update the interface accordingly
   * </blockquote>
   * @returns {Promise} A resolved or rejected Promise
   **/
  _initInterface() {
    return new Promise((resolve, reject) => {
      if (!localStorage.getItem('lang')) {
        localStorage.setItem('lang', this._lang);
      }

      fetch(`assets/nls/${this._lang}.json`).then(data => {
        data.text().then(lang => {
          this._nls = JSON.parse(lang);
          this.replaceString(document.body, '{{TITLE}}', this._nls.title);
          this.replaceString(document.body, '{{ORIENTATION}}', this._nls.orientation);
          this.replaceString(document.body, '{{VERTICAL}}', this._nls.vertical);
          this.replaceString(document.body, '{{HORIZONTAL}}', this._nls.horizontal);

          this.replaceString(document.body, '{{STYLE}}', this._nls.style.title);
          this.replaceString(document.body, '{{STYLE_STD}}', this._nls.style.std);
          this.replaceString(document.body, '{{STYLE_TRAVEL}}', this._nls.style.travel);
          this.replaceString(document.body, '{{STYLE_FRAME}}', this._nls.style.frame);
          this.replaceString(document.body, '{{STYLE_PURE}}', this._nls.style.pure);
          this.replaceString(document.body, '{{STYLE_PANTONE}}', this._nls.style.pantone);
          this.replaceString(document.body, '{{STYLE_MAP}}', this._nls.style.map);
          this.replaceString(document.body, '{{STYLE_WINDOW}}', this._nls.style.window);
          this.replaceString(document.body, '{{STYLE_AIR}}', this._nls.style.air);
          this.replaceString(document.body, '{{STYLE_HIPSTER}}', this._nls.style.hipster);
          this.replaceString(document.body, '{{DARK_THEME}}', this._nls.style.darkTheme);
          this.replaceString(document.body, '{{UP_TEXT}}', this._nls.style.upText);

          this.replaceString(document.body, '{{TEXT}}', this._nls.text.title);
          this.replaceString(document.body, '{{MAP_TITLE}}', this._nls.text.mapTitle);
          this.replaceString(document.body, '{{MAP_TITLE_PLACEHOLDER}}', this._nls.text.mapTitlePlaceholder);
          this.replaceString(document.body, '{{MAP_SUBTITLE}}', this._nls.text.mapSubtitle);
          this.replaceString(document.body, '{{MAP_SUBTITLE_PLACEHOLDER}}', this._nls.text.mapSubtitlePlaceholder);
          this.replaceString(document.body, '{{MAP_COMMENT}}', this._nls.text.mapComment);
          this.replaceString(document.body, '{{MAP_COMMENT_PLACEHOLDER}}', this._nls.text.mapCommentPlaceholder);

          this.replaceString(document.body, '{{EXPORT}}', this._nls.export.title);
          this.replaceString(document.body, '{{EXPORT_DIMENSION}}', this._nls.export.dimension);
          this.replaceString(document.body, '{{EXPORT_AT}}', this._nls.export.at);
          this.replaceString(document.body, '{{EXPORT_FORMAT}}', this._nls.export.format);
          this.replaceString(document.body, '{{EXPORT_BUTTON}}', this._nls.export.button);
          this.replaceString(document.body, '{{CREDITS}}', this._nls.export.credits);

          this.replaceString(document.body, '{{DOWNLOAD_TITLE}}', this._nls.download.title);
          this.replaceString(document.body, '{{DOWNLOAD_SUBTITLE}}', this._nls.download.subtitle);
          resolve();
        }).catch(reject);
      }).catch(reject);
    });
  }


  /**
   * @method
   * @name _initMap
   * @private
   * @memberof MesseMap
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
   _initMap() {
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
        // Search control creation
        this._search = new window.L.Control.Search({
          url: 'https://nominatim.openstreetmap.org/search?format=json&q={s}',
          jsonpParam: 'json_callback',
          propertyName: 'display_name',
          propertyLoc: ['lat','lon'],
          marker: false,
          autoCollapse: true,
          firstTipSubmit: true,
          textPlaceholder: this._nls.search.placeholder,
          textCancel: this._nls.search.cancel,
          textErr: this._nls.search.error
        });
      } catch (error) {
        // The only error case is Leaflet doesn't exist here
        reject(error);
        return;
      }
      // Add default layer in map
      MapProviders.layers['Imagery (E)'].addTo(this._map)
      document.getElementById('map-attribution').innerHTML = MapProviders.layers['Imagery (E)'].getAttribution();
      // Add layer switch radio on bottom right of the map
      window.L.control.layers(MapProviders.layers, MapProviders.overlays, { position: 'topright' }).addTo(this._map);
      // Add search command
      this._map.addControl(this._search);
      // Apply default input text to poster
      this._applyTexts();
      // Load user theme overrides
      const cssTheme = localStorage.getItem('theme');
      if (cssTheme && JSON.parse(cssTheme)) {
        this._cssTheme = JSON.parse(cssTheme);
        this.applyThemeColor();
      }
      resolve();
    });
  }


  /**
   * @method
   * @name _initEvents
   * @private
   * @memberof MesseMap
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
      const orientations = document.getElementById('map-orientation');
      for (let i = 0; i < orientations.children.length; ++i) {
        orientations.children[i].addEventListener('click', this._updateMapOrientation.bind(this));
      }
      const styles = document.getElementById('map-style');
      for (let i = 0; i < styles.children.length; ++i) {
        styles.children[i].addEventListener('click', this._updateMapStyle.bind(this));
      }
      document.getElementById('dark-theme').addEventListener('change', this._updateDarkTheme.bind(this));
      document.getElementById('txt-position').addEventListener('change', this._updateTextPosition.bind(this));
      document.getElementById('theme-editor').addEventListener('click', this._themeEditModal.bind(this));
      // Text modification events (color, style etc.)
      document.getElementById('title-color').addEventListener('input', this._textColorEdit.bind(this));
      document.getElementById('subtitle-color').addEventListener('input', this._textColorEdit.bind(this));
      document.getElementById('comment-color').addEventListener('input', this._textColorEdit.bind(this));
      // Listening to close modal event
      document.getElementById('modal-overlay').addEventListener('click', this._closeModal.bind(this));
      // Input text events
      document.getElementById('user-title').addEventListener('input', this._applyTexts.bind(this));
      document.getElementById('user-subtitle').addEventListener('input', this._applyTexts.bind(this));
      document.getElementById('user-comment').addEventListener('input', this._applyTexts.bind(this));
      // Export settings
      document.getElementById('image-width').addEventListener('input', this._updateDimensionLabel.bind(this));
      document.getElementById('map-save').addEventListener('click', this._download.bind(this));

      document.getElementById('credit-modal').addEventListener('click', this._creditModal.bind(this));
      // Load event on map layers for loaded tiles (to ensure the printing occurs with all map tiles)
      for (const layer in MapProviders.layers) {
        MapProviders.layers[layer].on('load', () => setTimeout(() => this._tilesLoaded = true, 4000));
        MapProviders.layers[layer].on('add', (e) => {
          document.getElementById('map-attribution').innerHTML = e.target.getAttribution();
        });
      }

      this._map.on('move', this._updateCommentLabel.bind(this));
      this._search.on('search:locationfound', this._searchMatch.bind(this));

      resolve();
    });
  }


  // ======================================================================= //
  // ----------------------- Input events callbacks ------------------------ //
  // ======================================================================= //


  /**
   * @method
   * @name _updateMapOrientation
   * @private
   * @memberof MesseMap
   * @author Arthur Beaulieu
   * @since October 2022
   * @description
   * <blockquote>
   * Will update the poster vertical/horizontal orientation
   * </blockquote>
   * @param {Event} e - The click event on the theme checkbox
   **/
  _updateMapOrientation(e) {
    let previousOrientation = '';
    const orientations = document.getElementById('map-orientation');
    for (let i = 0; i < orientations.children.length; ++i) {
      if (orientations.children[i].classList.contains('selected')) {
        previousOrientation = orientations.children[i].dataset.orientation;
        orientations.children[i].classList.remove('selected');
        break;
      }
    }
    // Update menu, remove previous style from map and add new style to map
    e.target.classList.add('selected');
    document.getElementById('map-output').classList.remove(`${previousOrientation}`);
    document.getElementById('map-output').classList.add(`${e.target.dataset.orientation}`);
    setTimeout(() => { // Transition all .2s avoidance
      const bounds = this._map.getBounds(); // Map bound before scaling
      this._map.invalidateSize();
      this._map.fitBounds(bounds);
    }, 200);
  }


  /**
   * @method
   * @name _updateDarkTheme
   * @private
   * @memberof MesseMap
   * @author Arthur Beaulieu
   * @since October 2022
   * @description
   * <blockquote>
   * Will update the poster with dark or light css theme colors. If colors have been overiden
   * by user, they will properly applied to the poster.
   * </blockquote>
   * @param {Event} e - The change event on the theme checkbox
   **/
  _updateDarkTheme(e) {
    if (e.target.checked) {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    }
  }


  /**
   * @method
   * @name _updateTextPosition
   * @private
   * @memberof MesseMap
   * @author Arthur Beaulieu
   * @since October 2022
   * @description
   * <blockquote>
   * Will update the poster text position wether to be top or bottom
   * </blockquote>
   * @param {Event} e - The change event on the up text checkbox
   **/
  _updateTextPosition(e) {
    if (e.target.checked) {
      document.getElementById('map-output').classList.add('txt-reverse');
    } else {
      document.getElementById('map-output').classList.remove('txt-reverse');
    }
  }


  /**
   * @method
   * @name _updateMapStyle
   * @private
   * @memberof MesseMap
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
   * @name _applyTexts
   * @private
   * @memberof MesseMap
   * @author Arthur Beaulieu
   * @since October 2022
   * @description
   * <blockquote>
   * Simply apply the input text to the poster (for title, subtitle and comment)
   * </blockquote>
   **/
  _applyTexts(e) {
    document.getElementById('title').innerHTML = document.getElementById('user-title').value;
    document.getElementById('subtitle').innerHTML = document.getElementById('user-subtitle').value;
    document.getElementById('comment').innerHTML = document.getElementById('user-comment').value;
    if (e && e.target && e.target.id === 'user-comment') {
      this._commentEdited = true;
    }
  }


  /**
   * @method
   * @name _textColorEdit
   * @private
   * @memberof MesseMap
   * @author Arthur Beaulieu
   * @since October 2022
   * @description
   * <blockquote>
   * Modify the text on map color. Overrides the default theme color
   * </blockquote>
   * @param {Event} e - The input color change
   **/
  _textColorEdit(e) {
    document.getElementById(e.target.dataset.type).style.color = e.target.value;
  }


  /**
   * @method
   * @name _updateCommentLabel
   * @private
   * @memberof MesseMap
   * @author Arthur Beaulieu
   * @since October 2022
   * @description
   * <blockquote>
   * Update the comment with map center coordinates, only if user didn't set a text in comment
   * </blockquote>
   **/
  _updateCommentLabel() {
    if (!this._commentEdited) {
      const c = this._map.getCenter();
      document.getElementById('comment').innerHTML = `${this.precisionRound(c.lat, 3)}°N / ${this.precisionRound(c.lng, 3)}° E`;
    }
  }


  /**
   * @method
   * @name _updateDimensionLabel
   * @private
   * @memberof MesseMap
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
    e.target.dataset.height = height;
    if (document.getElementById('map-output').classList.contains('horizontal')) {
      label.innerHTML = `${this._nls.export.dimension} : ${height} x ${e.target.value} — A${a} ${this._nls.export.at} 300dpi`;
    } else {
      label.innerHTML = `${this._nls.export.dimension} : ${e.target.value} x ${height} — A${a} ${this._nls.export.at} 300dpi`;
    }
  }


  /**
   * @method
   * @name _searchMatch
   * @private
   * @memberof MesseMap
   * @author Arthur Beaulieu
   * @since November 2022
   * @description
   * <blockquote>
   * Set map view depending on search result
   * </blockquote>
   * @param {Object} data - The search data result to set view from
   **/
  _searchMatch(data) {
    this._map.setView(data.latlng);
  }


  /**
   * @method
   * @name _updateLang
   * @private
   * @memberof MesseMap
   * @author Arthur Beaulieu
   * @since November 2022
   * @description
   * <blockquote>
   * Updates the user interface language according to credit select value then reload page
   * </blockquote>
   * @param {Event} e - The input event on the select input
   **/
  _updateLang(e) {
    localStorage.setItem('lang', e.target.value);
    window.location.reload();
  }


  // ======================================================================= //
  // ------------------ Printing and downloading methods ------------------- //
  // ======================================================================= //


  /**
   * @method
   * @name _download
   * @private
   * @memberof MesseMap
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
    document.getElementById('map-output').style.transition = 'none';
    setTimeout(() => {
      // First we get the user desired size
      let size = document.getElementById('image-width').value;
      let scale = size / 600;
      if (document.getElementById('map-output').classList.contains('horizontal')) {
        const height = document.getElementById('image-width').dataset.height;
        scale = height / 600;
        size = height;
      }
      const bounds = this._map.getBounds(); // Map bound before scaling
      // Scale map elements according to user desired size
      this._dlPrepareMap(size, scale, bounds);
      // setInterval on mapPrint to ensure tiles are loaded before downloading (tilesLoaded flag)
      if (scale === 1) { this._tilesLoaded = true; } // Set tiles loaded if no upscale is requested on export
      this._intervalId = setInterval(this._dlPerformMapPrint.bind(this, bounds), 1000);
    }, 200);
  }


  /**
   * @method
   * @name _dlPrepareMap
   * @private
   * @memberof MesseMap
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
  _dlPrepareMap(size, scale, bounds) {
    if (CONST.DEBUG) { console.log('Prepare map style for printing...'); }
    document.getElementById('print-status').innerHTML = this._nls.download.stylePrep;
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
    if (document.getElementById('map-output').classList.contains('horizontal')) {
      document.getElementById('map-output').style.height = `${size}px`;
    } else {
      document.getElementById('map-output').style.width = `${size}px`;
    }
    if (document.body.clientWidth < 1150) {
      document.querySelector('.user-text-wrapper').style.fontSize = 'inherit';
    }
    document.getElementById('map-output').style.position = 'absolute';
    // Remove box shadow from map container
    document.getElementById('map-output').classList.remove('shadow');
    document.getElementById('map-output').style.boxShadow = 'none';
    requestAnimationFrame(() => {
      this._map.invalidateSize();
      this._map.fitBounds(bounds);
      if (CONST.DEBUG) { console.log('Waiting for map tiles to load...'); }
      document.getElementById('print-status').innerHTML = this._nls.download.tileLoad;
      document.getElementById('print-progress').style.width = '25%';
    });
  }


  /**
   * @method
   * @name _dlPerformMapPrint
   * @private
   * @memberof MesseMap
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
      document.getElementById('print-status').innerHTML = this._nls.download.printStart;
      document.getElementById('print-progress').style.width = '66%';
      clearInterval(this._intervalId);
      this._tilesLoaded = false;
      requestAnimationFrame(() => {
        // Execute html2canvas with output div
        window.html2canvas(document.getElementById('map-output'), {
          proxy: "/proxy",
          logging: CONST.DEBUG,

          width: document.getElementById('map-output').offsetWidth,
          height: document.getElementById('map-output').offsetHeight,
          imageTimeout: 0,
          onclone: () => {
            document.getElementById('print-status').innerHTML = this._nls.download.outputFile;
            document.getElementById('print-progress').style.width = '72%';
          }
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
   * @memberof MesseMap
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
    document.getElementById('print-status').innerHTML = this._nls.download.saveToDisk;
    document.getElementById('print-progress').style.width = '88%';
    const file = this.getOutputFileType();
    const link = document.createElement('A');
    link.download = `${document.getElementById('title').innerHTML}.${file.extension}`;
    if (file.type === 'pdf') {
      const pageFormat = document.getElementById('image-width-label').innerHTML.split('—')[1].replace(' ', '').substring(0, 2);
      let pdf = new jsPDF({
        orientation: (document.getElementById('map-output').classList.contains('horizontal')) ? 'landscape' : 'portrait',
        format: pageFormat,
        precision: 32
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
   * @memberof MesseMap
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
    document.getElementById('print-status').innerHTML = this._nls.download.restoreMap;
    document.getElementById('print-progress').style.width = '100%';
    // Restore Leaflet.js overlays
    document.querySelector('.leaflet-top.leaflet-left').style.display = 'inherit';
    document.querySelector('.leaflet-top.leaflet-right').style.display = 'inherit';
    document.body.style.fontSize = `1.2rem`;
    // Restore map inline styles and variables
    if (document.body.clientWidth < 1150) {
      document.querySelector('.user-text-wrapper').style.fontSize = '50%';
    }
    document.getElementById('map-output').style = '';
    // Restore map container box shadow
    document.getElementById('map-output').classList.add('shadow');
    // Remove print overlay
    document.getElementById('print-overlay').style.opacity = 0;
    setTimeout(() => {
      document.getElementById('print-overlay').style.zIndex = -1;
      this._map.invalidateSize();
      this._map.fitBounds(bounds);
      document.getElementById('map-output').style.transition = 'all .2s';
      document.getElementById('print-progress').style.width = '0';
      if (CONST.DEBUG) { console.log('Map properly restored'); }
    }, 200);
  }


  // ======================================================================= //
  // --------------------------- Modal methods ----------------------------- //
  // ======================================================================= //


  /**
   * @method
   * @name _themeEditModal
   * @private
   * @memberof MesseMap
   * @author Arthur Beaulieu
   * @since October 2022
   * @description
   * <blockquote>
   * This method will build th theme edit modal into the user interface.
   * </blockquote>
   * @param {Event} e - The click event that triggered the modal
   **/
  _themeEditModal(e) {
    e.preventDefault();
    this._fetchModal('themeedit').then(dom => {
      const _updateInputs = () => {
        document.getElementById('light-bg-color').value = this._cssTheme.lbg;
        document.getElementById('light-txt-color').value = this._cssTheme.ltxt;
        document.getElementById('light-txt-alt-color').value = this._cssTheme.lcom;
        document.getElementById('dark-bg-color').value = this._cssTheme.dbg;
        document.getElementById('dark-txt-color').value = this._cssTheme.dtxt;
        document.getElementById('dark-txt-alt-color').value = this._cssTheme.dcom;
      };

      const _updateColor = e => {
        document.querySelector(':root').style.setProperty(`--color-${e.target.dataset.key}`, e.target.value);
        this.updateThemeColorInternal();
      };
      // Color input Listeners
      dom.querySelector('#light-bg-color').addEventListener('input', _updateColor);
      dom.querySelector('#light-txt-color').addEventListener('input', _updateColor);
      dom.querySelector('#light-txt-alt-color').addEventListener('input', _updateColor);
      dom.querySelector('#dark-bg-color').addEventListener('input', _updateColor);
      dom.querySelector('#dark-txt-color').addEventListener('input', _updateColor);
      dom.querySelector('#dark-txt-alt-color').addEventListener('input', _updateColor);
      // Apply current theme
      this.updateThemeColorInternal();
      // Close modal button event
      dom.querySelector('#close').addEventListener('click', this._closeModal.bind(this, null, true));
      dom.querySelector('#reset').addEventListener('click', () => {
        this._cssTheme.lbg = '#FFFFFE';
        this._cssTheme.ltxt = '#000001';
        this._cssTheme.lcom = '#999998';
        this._cssTheme.dbg = '#000001';
        this._cssTheme.dtxt = '#FFFFFE';
        this._cssTheme.dcom = '#999998';
        this.applyThemeColor();
        _updateInputs();
      });
      // Modal start animation (close animation handled in _closeModal())
      document.getElementById('modal-overlay').appendChild(dom);
      document.getElementById('modal-overlay').style.display = 'flex';
      setTimeout(() => document.getElementById('modal-overlay').style.opacity = 1, 50);
      requestAnimationFrame(() => {
        this.replaceString(document.getElementById('modal-overlay'), '{{MODAL_TITLE}}', this._nls.theme.title);
        this.replaceString(document.getElementById('modal-overlay'), '{{MODAL_LIGHT_THEME}}', this._nls.theme.lightTheme);
        this.replaceString(document.getElementById('modal-overlay'), '{{MODAL_DARK_THEME}}', this._nls.theme.darkTheme);
        this.replaceString(document.getElementById('modal-overlay'), '{{MODAL_BG_LIGHT}}', this._nls.theme.bg);
        this.replaceString(document.getElementById('modal-overlay'), '{{MODAL_TXT_LIGHT}}', this._nls.theme.txt);
        this.replaceString(document.getElementById('modal-overlay'), '{{MODAL_TXTALT_LIGHT}}', this._nls.theme.txtAlt);
        this.replaceString(document.getElementById('modal-overlay'), '{{MODAL_BG_DARK}}', this._nls.theme.bg);
        this.replaceString(document.getElementById('modal-overlay'), '{{MODAL_TXT_DARK}}', this._nls.theme.txt);
        this.replaceString(document.getElementById('modal-overlay'), '{{MODAL_TXTALT_DARK}}', this._nls.theme.txtAlt);
        this.replaceString(document.getElementById('modal-overlay'), '{{MODAL_RESET}}', this._nls.theme.default);
        this.replaceString(document.getElementById('modal-overlay'), '{{MODAL_CLOSE}}', this._nls.action.close);
        _updateInputs();
      });
    });
  }


  /**
   * @method
   * @name _creditModal
   * @private
   * @memberof MesseMap
   * @author Arthur Beaulieu
   * @since October 2022
   * @description
   * <blockquote>
   * This method will build the credit modal into the user interface.
   * </blockquote>
   * @param {Event} e - The click event that triggered the modal
   **/
  _creditModal(e) {
    e.preventDefault();
    this._fetchModal('credits').then(dom => {
      // Modal start animation (close animation handled in _closeModal())
      document.getElementById('modal-overlay').appendChild(dom);
      document.getElementById('modal-overlay').style.display = 'flex';
      setTimeout(() => document.getElementById('modal-overlay').style.opacity = 1, 50);
      requestAnimationFrame(() => {
        this.replaceString(document.getElementById('modal-overlay'), '{{MODAL_TITLE}}', this._nls.title);
        this.replaceString(document.getElementById('modal-overlay'), '{{MODAL_LINE1}}', this._nls.credit.line1);
        this.replaceString(document.getElementById('modal-overlay'), '{{MODAL_LINE2}}', this._nls.credit.line2);
        this.replaceString(document.getElementById('modal-overlay'), '{{MODAL_LINE3}}', this._nls.credit.line3);
        this.replaceString(document.getElementById('modal-overlay'), '{{MODAL_LINE4}}', this._nls.credit.line4);
        this.replaceString(document.getElementById('modal-overlay'), '{{MODAL_LANG}}', this._nls.credit.lang);
        this.replaceString(document.getElementById('modal-overlay'), '{{MODAL_FR}}', this._nls.credit.fr);
        this.replaceString(document.getElementById('modal-overlay'), '{{MODAL_EN}}', this._nls.credit.en);
        this.replaceString(document.getElementById('modal-overlay'), '{{MODAL_ES}}', this._nls.credit.es);
        this.replaceString(document.getElementById('modal-overlay'), '{{MODAL_DE}}', this._nls.credit.de);
        this.replaceString(document.getElementById('modal-overlay'), '{{MODAL_CLOSE}}', this._nls.action.close);
        // Lang update
        document.getElementById('lang').value = this._lang;
        document.getElementById('lang').addEventListener('change', this._updateLang.bind(this));
        // Close modal button event
        document.getElementById('close').addEventListener('click', this._closeModal.bind(this, null, true));
      });
    });
  }


  /**
   * @method
   * @name _fetchModal
   * @private
   * @memberof MesseMap
   * @author Arthur Beaulieu
   * @since October 2022
   * @description
   * <blockquote>
   * This method will use the fetch API to request the modal HTMl file
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
   * @memberof MesseMap
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
   * @memberof MesseMap
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
   * @memberof MesseMap
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


  /**
   * @method
   * @name updateThemeColorInternal
   * @public
   * @memberof MesseMap
   * @author Arthur Beaulieu
   * @since October 2022
   * @description
   * <blockquote>
   * Get css color and saves them to local storage
   * </blockquote>
   **/
  updateThemeColorInternal() {
    // Update input.color values
    this._cssTheme = {
      lbg: window.getComputedStyle(document.querySelector(':root')).getPropertyValue('--color-l-bg'),
      ltxt: window.getComputedStyle(document.querySelector(':root')).getPropertyValue('--color-l-txt'),
      lcom: window.getComputedStyle(document.querySelector(':root')).getPropertyValue('--color-l-txt-alt'),
      dbg: window.getComputedStyle(document.querySelector(':root')).getPropertyValue('--color-d-bg'),
      dtxt: window.getComputedStyle(document.querySelector(':root')).getPropertyValue('--color-d-txt'),
      dcom: window.getComputedStyle(document.querySelector(':root')).getPropertyValue('--color-d-txt-alt'),
    };
    localStorage.setItem('theme', JSON.stringify(this._cssTheme));
  }


  /**
   * @method
   * @name applyThemeColor
   * @public
   * @memberof MesseMap
   * @author Arthur Beaulieu
   * @since October 2022
   * @description
   * <blockquote>
   * Apply the css variables values to the root style from internal _cssTheme object
   * </blockquote>
   **/
  applyThemeColor() {
    document.querySelector(':root').style.setProperty('--color-l-bg', this._cssTheme.lbg);
    document.querySelector(':root').style.setProperty('--color-l-txt', this._cssTheme.ltxt);
    document.querySelector(':root').style.setProperty('--color-l-txt-alt', this._cssTheme.lcom);
    document.querySelector(':root').style.setProperty('--color-d-bg', this._cssTheme.dbg);
    document.querySelector(':root').style.setProperty('--color-d-txt', this._cssTheme.dtxt);
    document.querySelector(':root').style.setProperty('--color-d-txt-alt', this._cssTheme.dcom);
    this.updateThemeColorInternal();
  }


  /**
   * @method
   * @name replaceString
   * @public
   * @memberof MesseMap
   * @author Arthur Beaulieu
   * @since October 2022
   * @description
   * <blockquote>
   * Will replace the element text. Useful for translations.
   * </blockquote>
   * @param {Nunmber} element - The DOM element for text to be replaced
   * @param {Number} string - The string to replace
   * @param {Number} value - The value to apply to the replaced text
   **/
  replaceString(element, string, value) {
    element.innerHTML = element.innerHTML.replace(string, value);
  }


}


export default MesseMap;