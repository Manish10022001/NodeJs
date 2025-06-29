let http = require('http');
//res = what we send to server(params, queryParams, body)
//req = What server sends in return

let server = http.createServer((req,res)=>{
    res.write(`<h1> This is Node Js Code</h1>`);
    res.end(); //end the response
})

server.listen(7600); //port no. for server