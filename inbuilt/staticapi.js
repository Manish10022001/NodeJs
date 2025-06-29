let fs = require("fs");
let http = require("http");

let server = http.createServer(function (req, res) {
  //read file with fs
  fs.readFile("city.json", "utf-8", function (err, data) { //fs method
    res.write(data); //http method
    res.end();       //http method
  });
});

server.listen(6300); //http method to 
