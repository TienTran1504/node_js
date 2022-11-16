const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.end('Welcome to our home page')
    }
    if (req.url === '/about') {

        res.end('Here is our short history')
    }
    // nếu vô page nào không có trên thì hiện ra dòng này
    res.end(`
    <h1>Opps!</h1>
<p> We cant seem to find the page you are looking for </p>
<a href="/">Back home</a>
    `)

})

server.listen(5000)