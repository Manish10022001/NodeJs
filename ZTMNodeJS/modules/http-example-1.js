let http = require('http');
// 1st method, if want to have security then add s to http: https
const req = http.request("http://www.google.com",(res)=>{
    //to get data back from response we use res.on
    //res.on("event", (listener)=>{})) then res.on("end",()=>{} to end it)
    res.on('data',(chunk)=>{
        console.log(`Data chunk: ${chunk}`)
    });
    res.on('end',()=>{
        console.log("No more data");
    })
})
req.end();