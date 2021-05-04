
var http = require('http');
var url = require('url');
// Like packages in python

// here we have made the server, need to go to http://localhost:8080 to see it
// req stands for reqest.
http.createServer(function(req,res) {
    res.writeHead(200, {'Content-Type': 'text/html'}); // if the response is supposed to be rendered as html. we need to put it in the header
    res.write('Hello World!');  //write response to client
    //to split up req.url into redable parts
    var q = url.parse(req.url, true).query;
    var txt = q.year + " " + q.month;
    res.end(txt);// end response
}).listen(8080); // the server object listens on port 8080

/*keyword exports - makes properties and methods available outside of the
  module file.*/
