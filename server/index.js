const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routes.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
