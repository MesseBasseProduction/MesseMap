const express = require('express');
const proxy = require('html2canvas-proxy');
const path = require('path');
// App and preferences
const app = express();
const port = 1337;
// url definitions
app.use('/assets', express.static('assets')); // Serve static files
app.use('/proxy', proxy()); // Proxify external assets for html2canvas
// Serve main html at /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));  
});
// Output events in console
app.listen(port, () => {
  console.log(`MesseMap listening on port ${port}`);
});
