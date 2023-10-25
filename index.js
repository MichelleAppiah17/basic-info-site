const http = require('http')
const url = require('url')
const fs = require('fs')
const port = 8080

const server = http.createServer(function(req, res){
     const q = url.parse(req.url, true);
     const filename = q.pathname === "/" ? `./index.html` : `.${q.pathname}.html`

    res.writeHead(200, { 'Content-Type': 'text/html' })
    fs.readFile(filename, function(error, data){
        if(error){
            res.writeHead(404, {'Content-Type': 'text/html'})
            return res.end(`<h1>Error: 404</h1><p>The page you are looking for doesn't exist.</p> <a href="/">Back home.</a>`);
        }else{
            res.writeHead(200, {'Content Type': 'text/html'});
            res.write(data);
            return res.end();
        }
    })
}).listen(port);

server.listen(port, function(error){
    if(error){
        console.log('Something went wrong', error)
    }else{
        console.log('Server is listening on port ' + port)
    }
})