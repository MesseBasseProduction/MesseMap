const params = {
  osm: {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 2,
    maxZoom: 19
  },
  esri: {
    attribution: 'Map tiles by <a href="https://www.esri.com/">Esri</a> &mdash; Map data &copy; Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    minZoom: 2,
    maxZoom: 18
  },
  carto: {
    attribution: 'Map tiles by <a href="https://carto.com/attributions">Carto</a> under <a href="http://www.openstreetmap.org/copyright">ODbL</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    subdomains: 'abcd',
    minZoom: 2,
    maxZoom: 20
  },
  stamen: {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a> under <a href="http://www.openstreetmap.org/copyright">ODbL</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 2,
    maxZoom: 16
  },
  mapiful: {
    attribution: 'Map tiles by <a href="http://mapiful.com">Mapiful</a> under <a href="http://www.openstreetmap.org/copyright">ODbL</a> &mdash; Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    minZoom: 2,
    maxZoom: 21
  }
};

export default {
  layers: {
    'OpenStreetMap': window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', params.osm),
    'Imagery (E)': window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', params.esri),
    'Voyager (C)': window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', params.carto),
    'Positron (C)': window.L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', params.carto),
    'Dark Matter (C)': window.L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', params.carto),
    'OldSchool (M)': window.L.tileLayer('https://tiles.mapiful.com/oldschool/{z}/{x}/{y}.png', params.mapiful),
    'Nara (M)': window.L.tileLayer('https://tiles.mapiful.com/nara/{z}/{x}/{y}.png', params.mapiful),
    'Playroom (M)': window.L.tileLayer('https://tiles.mapiful.com/playroom/{z}/{x}/{y}.png', params.mapiful),
    'Orange (M)': window.L.tileLayer('https://tiles.mapiful.com/mother/{z}/{x}/{y}.png', params.mapiful),
    'Mono (M)': window.L.tileLayer('https://tiles.mapiful.com/mono/{z}/{x}/{y}.png', params.mapiful),
    'Mono Inverted (M)': window.L.tileLayer('https://tiles.mapiful.com/inverted/{z}/{x}/{y}.png', params.mapiful),
    'Gold (M)': window.L.tileLayer('https://tiles.mapiful.com/gold/{z}/{x}/{y}.png', params.mapiful),
    'Asphalt (M)': window.L.tileLayer('https://tiles.mapiful.com/asphalt/{z}/{x}/{y}.png', params.mapiful),
    'Lagoon (M)': window.L.tileLayer('https://tiles.mapiful.com/lagoon/{z}/{x}/{y}.png', params.mapiful),
    'Blue (M)': window.L.tileLayer('https://tiles.mapiful.com/blue/{z}/{x}/{y}.png', params.mapiful),
    'Sky (M)': window.L.tileLayer('https://tiles.mapiful.com/sky/{z}/{x}/{y}.png', params.mapiful),
    'Spring (M)': window.L.tileLayer('https://tiles.mapiful.com/spring/{z}/{x}/{y}.png', params.mapiful),
    'Red (M)': window.L.tileLayer('https://tiles.mapiful.com/red/{z}/{x}/{y}.png', params.mapiful),
    'Gaia (M)': window.L.tileLayer('https://tiles.mapiful.com/gaia/{z}/{x}/{y}.png', params.mapiful),
    'Coral (M)': window.L.tileLayer('https://tiles.mapiful.com/coral/{z}/{x}/{y}.png', params.mapiful),
    'Pink (M)': window.L.tileLayer('https://tiles.mapiful.com/valentine/{z}/{x}/{y}.png', params.mapiful),
    'Purple (M)': window.L.tileLayer('https://tiles.mapiful.com/lavender/{z}/{x}/{y}.png', params.mapiful),
    'Toner (S)': window.L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}{r}.png', params.stamen),
    'Watercolor (S)': window.L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png', params.stamen)
  },
  overlays: {
    'Toner Lines (S)': window.L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}{r}.png', params.stamen)
  }
};
