const express = require('express');
const app = express();
const path = require('path');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000
app.use(volleyball);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.resolve(__dirname, '..', 'src')));
app.use(express.static(path.resolve(__dirname, '..', 'node_modules')));

app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});


app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '..', 'src', 'index.html'))
});

app.listen(PORT, function () {
  console.log("Rockin out on port " + PORT + " homie");
});