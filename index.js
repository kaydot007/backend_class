const fs = require('fs');
const path = require('path');
const http = require("http");
const hostname = "localhost";
// const port = 5500;

const server = http.createServer((req, res) => {
  console.log(`Request for ${req.url} by ${req.method}`);
  if (req.method === 'GET') {
    var fileurl;
    if (req.url === '/') {
        fileurl = '/index.html';
    } else {
        fileurl = req.url
    }
    var filepath = path.resolve('./public' + fileurl);
    const fileext = path.extname(filepath);
    if (fileext ==='.html') {
        fs.exists(filepath,(exists) =>{
            if (!exists){
                res.statusCode = 404,
                res.setHeader('Content-Type', 'text/html'),
                res.end(`<html><body> e no dey </body></html>`)
                return;
            }else{ 
                res.statusCode = 200,
                res.setHeader('Content-Type', 'text/html');
                fs.createReadStream(filepath).pipe(res);
            }
        })
    }else{ 
            res.statusCode = 404,
                res.setHeader('Content-Type', 'text/html'),
                res.end(`<html><body> ${fileurl}is not html</body></html>`)
    }
}else {
    res.statusCode = 404,
                res.setHeader('Content-Type', 'text/html'),
                res.end(`<html><body> ${req.method} is not supported</body></html>`)
}
    // res.statusCode = 200,
    // res.setHeader("Content-Type", "text/html"),
    // res.end("<html><body> hello world!</body></html>");
    
});

server.listen(port,hostname, ()=> {
  console.log(`server listening on port`);
});
