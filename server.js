'use strict';

// Load array of notes
const data = require('./db/notes');

const { PORT } = require('./config');

const { requestLogger } = require('./middleware/logger');

console.log('Hello Noteful!');

const express = require('express');

const app = express();

app.use(express.static('public'));

app.use(requestLogger);

app.get('/api/notes', (req, res) => {
    // res.json(data);

  const searchTerm = req.query.searchTerm;
  console.log(searchTerm);
  if (searchTerm) {
    let filteredList = data.filter(function(item) {
      return item.title.includes(searchTerm);
    });
    res.json(filteredList);
  } else {
    res.json(data);
  }

});

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  let note = data.find(function(item) {
    return item.id === Number(id);
  });
  res.json(note);

});

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

{}

app.listen(PORT, function () {
  console.info(`Server listening on ${this.address().port}`);
}).on('error', err => {
  console.error(err);
});
