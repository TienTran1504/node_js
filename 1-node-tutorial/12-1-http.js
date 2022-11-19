const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        return res.end('Home page')
    }
    if (req.url === '/about') {
        // chạy hết vòng loop mới load đc page
        for (let i = 0; i < 1000; i++) {
            for (let j = 0; j < 1000; j++) {
                console.log(`${i} ${j}`);
            }
        }
        return res.end('About page')
    }
    return res.end('error page')
})

server.listen(5000, () => {
    console.log('Server listenning on port 5000...');
})