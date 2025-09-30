let http = require('http');
//2nd method using get, to get data from back from response instead of requeist
// if used get no need for req.end() at last to end it
const req = http.get('http://www.google.com',(res)=>{
    res.on('data',(chunk)=>{
        console.log(`Data Chunk: ${chunk}`)
    });
    res.on('end',()=>{
        console.log("no more data");
    })
})