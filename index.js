const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    if (req.method === 'GET' && req.url === '/download') {
        console.log(req.method,  req.url)
        const filePath = 'E:\\del\\assets\\Язык программирования С++. Специальное издание [2011] Бьерн Страуструп.djvu';
        const filename = "C++. Special Edition [2011] by Björn Stroustrup.djvu"
        const type = "djvu"

        fs.exists(filePath, (exists) => {
            if (exists) {
                res.writeHead(200, {
                    'Content-Type': `application/${type}`,
                    'Content-Disposition': `attachment; filename=${filename}`,
                });

                const readStream = fs.createReadStream(filePath);
                readStream.pipe(res);
            } else {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('File not found');
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Invalid URL');
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
