# MapPoster

![](https://badgen.net/badge/version/0.0.4/blue)
[![License](https://img.shields.io/github/license/MesseBasseProduction/MapPoster.svg)](https://github.com/MesseBasseProduction/MapPoster/blob/master/LICENSE.md)
![](https://badgen.net/badge/documentation/written/green)
![](https://badgen.net/badge/test/wip/orange)

A website to create a map poster, so it can be exported ready to print, with the ability to scale the map for to given size. Different map layers available to create your unique *wall-memory* touch!

It features so far, 4 poster styles. It allows user to define a title, a subtitle and a comment for their map. Each of these text's color can be modified.

When exporting the map to disk the user can set the output dimension, the lowest resolution being A7 at 300 dpi (600 x 848) and the highest being A2 at 300 dpi (6500 x 9193). The user can also set the output format, between `.png`, `.jpg`, `.webp` and `.pdf` (exports in PDF are done in the CYMK color space so it's ready to print).

## Libraries

The map handling is done using [Leaflet.js](https://leafletjs.com/) (BSD-2-Clause license), a Leaflet plugin to enable a smooth zooming, [SmoothWheelZoom](https://github.com/mutsuyuki/Leaflet.SmoothWheelZoom) (MIT license), it uses [html2canvas](https://html2canvas.hertzen.com/) (MIT license) AND [jsPDF](https://github.com/parallax/jsPDF) (MIT license) to allow the exporting in all supported formats, finally, [KolorPick](https://github.com/ArthurBeaulieu/KolorPick) is used for custom text colors.
