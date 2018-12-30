'use strict';

// Load array of notes
const express = require('express');
const morgan = require('morgan');

const { PORT } = require('./config');
const notesRouter = require('./routes/notes.router');

// Create an Express application
const app = express();

app.use(morgan('dev'));

app.use(express.static('public'));

app.use(express.json());



app.use('/api', notesRouter);




if (require.main === module) {
  app.listen(PORT, function () {
    console.info(`Server listening on ${this.address().port}`);
  }).on('error', err => {
    console.error(err);
  });
};

module.exports = app;

