var PORT = process.env.PORT || 5000;

const express = require('express');
const bodyParser = require('body-parser');
 const verifyWebhook = require('./verify-webhook');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(PORT, () => console.log('Express server is listening on port ',PORT));
app.get('/', verifyWebhook);

