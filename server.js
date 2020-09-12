const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3030;
console.log(process.env.PORT);
console.log(process.env.port);
console.log(port);

const server = http.createServer(app);

server.listen(port);