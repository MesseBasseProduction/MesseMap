const express = require('express');
const proxy = require('html2canvas-proxy');
const path = require('path');
const fs = require('fs');
// App and preferences
const version = '1.0.0';
const port = 8010;
const exportPath = 'saved/'; // TODO .env file plz
fs.mkdir(exportPath, { recursive: true }, () => {}); // Create export path if not existing
const app = express();
// url definitions
app.use('/assets', express.static('assets')); // Serve static files
app.use('/proxy', proxy()); // Proxify external assets for html2canvas, avoid canvas tainting
// Serve main html at /
app.get('/', (req, res) => {
  const date = new Date();
  console.log(`${date.toISOString()} | MesseMap v${version} | index.html page requested`);
  res.sendFile(path.join(__dirname, 'index.html'));  
});
// Handle poster data posting from client
app.post('/upload', express.json(), (req, res) => {
  const date = new Date();
  console.log(`${date.toISOString()} | MesseMap v${version} | Poster export requested`);
  saveDataToDisk(req.body);
  res.sendStatus(200); // Everything went well for the frontend
});
// Start server console
app.listen(port, () => {
  const date = new Date();
  console.log(`${date.toISOString()} | MesseMap v${version} | Server started and listening on port ${port}`);
});
// Internal method to process input Js object into JSON file
const saveDataToDisk = data => {
  let date = new Date();
  fs.writeFile(`${exportPath}/MesseMap-v${version}-Export-${date.toISOString().replace(/[T:]/g, '-').replace(/[^0-9-]/g, '').slice(0, -3)}.json`, JSON.stringify(data), 'utf8', err => {
    date = new Date();
    if (err) {
      console.error(`${date.toISOString()} | MesseMap v${version} | Poster data couldn't be saved to server`);
      console.error(err);
    } else {
      console.log(`${date.toISOString()} | MesseMap v${version} | Poster data successfully saved to server`);
    }
  });
};