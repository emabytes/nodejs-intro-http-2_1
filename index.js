const http = require("http")
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
    console.log(req.url)

    let filePath = req.url === "/" ? "index.html" : req.url
    console.log(filePath + "file path")

    let extName = path.extname(filePath)
    console.log(extName + "ext name")

    let contentType = 'text/html' //default

    switch (extName) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/jpeg';
            break;
    }
    if (contentType == 'text/html' && extName == '') {
        filePath += '.html'
    }
    if (req.url != '/favicon.ico') {
        fs.readFile(`./public/${filePath}`, (err, data) => {
            if (err) {
                throw err
            } else {
                res.writeHead(200, { 'Content-Type': contentType })
                res.end(data)
            }
        })
    }
})

server.on("connection", () => {
    console.log("connected!")
})
server.listen(3001, () => {
    console.log("server connected!")
})