const http = require('http');
const app = require('./app');
const server = http.createServer(app);

const port = process.env.PORT || 3000;
server.listen(port, (req, res)=>{
    console.log("Listening for request on port "+ port)
})