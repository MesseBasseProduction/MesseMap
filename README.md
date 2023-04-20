# MesseMap

![](https://badgen.net/badge/version/1.0.0/blue)
[![License](https://img.shields.io/github/license/MesseBasseProduction/MesseMap.svg)](https://github.com/MesseBasseProduction/MesseMap/blob/master/LICENSE.md)
![](https://badgen.net/badge/documentation/written/green)
![](https://badgen.net/badge/test/wip/red)

A website to create a map poster, so it can be exported ready to print, with the ability to scale the map for to given size. Different map layers available to create your unique *wall-memory* touch!

It features 7 poster styles, that can all be customized (positioning, colors). It allows user to define a title, a subtitle and a comment for their map. Each of these text's color can also be modified.

When exporting the map to disk the user can set the output dimension, the lowest resolution being A7 at 300 dpi (600 x 848) and the highest being A2 at 300 dpi (6500 x 9193). The user can also set the output format, between `.png`, `.jpg`, `.webp` and `.pdf` (exports in PDF are done in the CYMK color space so it's ready to print).

In order to let you try it, we are running an [instance](https://messemap.org). This instance may not work (yet) because of tainted canvas and proxy issues, we're working on providing a new one asap. If you want to try this with all available maps, you should run a local instance, by doing the following :

- $ `git clone https://github.com/MesseBasseProduction/MesseMap`
- $ `cd MesseMap && npm install`
- $ `npm run build && npm run server`

It will expose the application on your localhost, port 8010.

## Map data

All maps are released under [ODbL license](https://opendatacommons.org/licenses/odbl/). MesseMap is using open source maps released by [OpenStreetMap](https://www.openstreetmap.fr/), [GeoPortail](https://www.geoportail.gouv.fr/), [ESRI](https://www.esri.com/) and [Mapiful](https://www.mapiful.com/) providing astonishing data ready to use. A very warm thanks to those heroes!

## Libraries

The map handling is done using [Leaflet.js](https://leafletjs.com/) (BSD-2-Clause license), a Leaflet plugin to enable a smooth zooming, [SmoothWheelZoom](https://github.com/mutsuyuki/Leaflet.SmoothWheelZoom) (MIT license), another Leaflet plugin [Leaflet Control Search](https://github.com/stefanocudini/leaflet-search) (MIT license) to perform searches on the map, it uses [html2canvas](https://html2canvas.hertzen.com/) (MIT license), [html2canvas-proxy-nodejs](https://github.com/niklasvh/html2canvas-proxy-nodejs) (MIT license) and [jsPDF](https://github.com/parallax/jsPDF) (MIT license) to allow the exporting in all supported formats.

## For geeks

This repository also includes a Python script, that will fetch and save to your disk tiles for a given map. It features several options, to download the map tiles by zone (Lat/Lng min and max point and zoom range) or as a whole (but beware, maps are huge in size terms). Just start the script with no arguments to begin `python ./MapDownloader.py`.
