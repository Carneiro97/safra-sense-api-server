// const http = require('http');
// const app = require('./app');

// const port = process.env.PORT || 3030;

// const server = http.createServer(app);

// server.listen(port);

var express = require('express');
var app     = express();

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});