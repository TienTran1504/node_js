const http = require('http');

const server = http.createServer((req, res) => {
    if (reg.url === '/') {
        res.end('Home page')
    }
    if (reg.url === '/about') {
        // chạy hết vòng loop mới load đc page
        for (let i = 0; i < 1000; i++) {
            for (let j = 0; j < 1000; j++) {
                console.log(`${i} ${j}`);
            }
        }
        res.end('About page')
    }
    res.end('error page')
})

server.listen(5000, () => {
    console.log('Server listenning on port 5000...');
})