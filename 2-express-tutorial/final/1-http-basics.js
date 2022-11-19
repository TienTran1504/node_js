const http = require('http')

//get all files

const server = http.createServer((req, res) => {
    // console.log(req.method); GET
    // console.log(req.url); in ra url / gì đó
    // response.writeHead(statusCode[, statusMessage][, headers])
    const url = req.url;
    // home page
    if (url === '/') {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.end("name");
    }
    // about page
    else if (url === '/about') {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write('<h1>about page</h1>');
        res.end();
    }
    //404
    else {
        res.writeHead(404, { 'content-type': 'text/html' })
        res.write('<h1>page not found</h1>');
        res.end();
    }
})

server.listen(5000)