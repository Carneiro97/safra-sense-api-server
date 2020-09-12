const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3030;

const server = http.createServer(app);

server.listen(port);

var express = require('express');
var app     = express();

app.set('port', (process.env.PORT || 5000));