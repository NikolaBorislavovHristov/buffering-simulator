var http = require('http');
var fs = require('fs');

var file = fs.readFileSync('./video.mp4');
var step = 30000;
var timeout = 1000;
var port = 8082;

http.createServer(function(req, res) {
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader("Access-Control-Allow-Origin", "*");
    var start = 0;
    var interval = setInterval(() => {
        console.log(start);
        res.write(file.slice(start, start + step));
        start += step;
        if (start > file.length) {
            res.end();
            clearInterval(interval);
        }
    }, timeout);
}).listen(port);
