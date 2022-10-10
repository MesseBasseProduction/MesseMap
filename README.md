# MapPoster

A website to create a map poster, so it can be exported ready to print, with the ability to scale the map for to given size. Different map layers available to create your unique *wall-memory* touch!

It features so far, 1 style. It allows user to define a title, a subtitle and a comment for their map. Each of these text's color can be modified.

When exporting the map to disk the user can set the output dimension, the lowest resolution being A7 at 300 dpi (600 x 848) and the highest being A2 at 300 dpi (6500 x 9193). The user can also set the output format, between `.png`, `.jpg` and `.pdf`.

## Libraries

The map handling is done using [Leaflet.js](https://leafletjs.com/) (BSD-2-Clause license), a Leaflet plugin to enable a smooth zooming, [SmoothWheelZoom](https://github.com/mutsuyuki/Leaflet.SmoothWheelZoom) (MIT license) and finally, it uses [html2canvas](https://html2canvas.hertzen.com/) (MIT license) AND [jsPDF](https://github.com/parallax/jsPDF) (MIT license) to allow the exporting in all supported formats.
