'use strict';

// Load array of notes
const data = require('./db/notes');

const simDB = require('./db/notes');
const notes = simDB.initialize(data);


const { PORT } = require('./config');

const { requestLogger } = require('./middleware/logger');

console.log('Hello Noteful!');

const express = require('express');

const app = express();

app.use(requestLogger);

app.use(express.static('public'));

app.use(express.json());



app.get('/api/notes', (req, res, next) => {
  const { searchTerm } = req.query;

  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array
  });
});

app.get('/api/notes/:id', (req, res, next) => {
  const { id } = req.params;
  notes.find(id, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    }
    else {
      next();
    }
  });
});

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next){
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});
app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
