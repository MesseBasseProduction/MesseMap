# MesseMap

![](https://badgen.net/badge/version/1.0.1/blue)
[![License](https://img.shields.io/github/license/MesseBasseProduction/MesseMap.svg)](https://github.com/MesseBasseProduction/MesseMap/blob/main/LICENSE)
[![Doc](https://badgen.net/badge/documentation/written/green)](https://messebasseproduction.github.io/MesseMap/doc/index.html)

A website that helps you to create a map poster, so it can be exported ready to print, with the ability to scale the map to a given size. Different map layers available to create your unique *wall-memory* touch!

It features 7 poster styles so far, that can all be customized (positioning, colors). It allows user to define a title, a subtitle and a comment for their map. Each of these text's color can also be modified. Available in 7 languages, translations welcome.

Wanna try it ? We are running a [MesseMap instance](https://messemap.org) just for you! 

[![Interface Screenshot](/assets/img/demo.png)](https://messemap.org)

When exporting the map to disk the user can set the output dimension, the lowest resolution being A7 at 300 dpi (600 x 848) and the highest being A2 at 300 dpi (6500 x 9193). The user can also set the output format, between `.png`, `.jpg`, `.webp` and `.pdf` (exports in PDF are done in the CYMK color space so they're ready to print). 

**On Google Chrome, exporting large maps may lead to grey tiles. Unfortunatly this is a known ressource issue with Chrome ; please try with Firefox or non-webkit based browsers in the meantime.**

## Get started

If you want to run a local instance, you may proceed as follows :

- $ `git clone https://github.com/MesseBasseProduction/MesseMap`
- $ `cd MesseMap`
- $ `docker-compose build && docker-compose up -d`

It will expose the application on your localhost, port 8010. Saved posters will be stored as JSON files in `./saved` folder. You turn to configure the web server to expose this app to the world (feel welcome to let us know if you run one).

## Map data

All maps are released under [ODbL license](https://opendatacommons.org/licenses/odbl/). MesseMap is using open source maps released by [OpenStreetMap](https://www.openstreetmap.fr/), [ESRI](https://www.esri.com/), [Carto](https://carto.com/basemaps/), [Mapiful](https://www.mapiful.com/) and [Stamen](http://maps.stamen.com) providing astonishing data ready to use. A very warm thanks to those heroes!

## Bonnus : Map tiles downloader

This repository also includes a Python script, that will fetch and save to your disk tiles for a given map. It features several options, to download the map tiles by zone (Lat/Lng min and max point and zoom range) or as a whole (but beware, maps are huge in size terms). Just start the script with no arguments to begin `python ./src/py/MapDownloader.py` and fill the required information, then you can have one or several coffees.

## Libraries and credits

The map handling is done using [Leaflet.js](https://leafletjs.com/) (BSD-2-Clause license), a Leaflet plugin to enable a smooth zooming, [SmoothWheelZoom](https://github.com/mutsuyuki/Leaflet.SmoothWheelZoom) (MIT license), another Leaflet plugin [Leaflet Control Search](https://github.com/stefanocudini/leaflet-search) (MIT license) to perform searches on the map, it uses [html2canvas](https://html2canvas.hertzen.com/) (MIT license), [html2canvas-proxy-nodejs](https://github.com/niklasvh/html2canvas-proxy-nodejs) (MIT license) and [jsPDF](https://github.com/parallax/jsPDF) (MIT license) to allow the exporting in all supported formats.

Fonts are taken from DaFont, using [Catamaran](https://www.dafont.com/catamaran.font) from [Vladimir Nikolic](https://www.dafont.com/vladimir-nikolic.d6875), [Sublima](https://www.dafont.com/sublima.font) from [Ruls Do Paolo](https://www.dafont.com/profile.php?user=1305933) and [Louis George Café](https://www.dafont.com/louis-george-cafe.font) from [Chen Yining](https://www.dafont.com/chen-yining.d6681).

---

[Messe Basse Production](https://github.com/MesseBasseProduction) --- 2022 / 2023
