/*Original version*/
// var express = require('express'),
//     path = require('path'),
//     app = express();
//
// app.set('port', (process.env.PORT || 8080));
//
// app.use(express.static('3D_Loader'));
//
// app.listen(app.get('port'), function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Running on port: ' + app.get('port')); }
// });

/*React Server side*/
import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

import App from '../src/App';

const app = express();
const PORT = process.env.PORT || 3006;

app.get('/', (req, res) => {
  const app = ReactDOMServer.renderToString(<App />);

  const indexFile = path.resolve('./build/index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

app.use(express.static('./build'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
