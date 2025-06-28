let fs = require('fs');
fs.writeFile('txt.txt',"this is my data of node",(err)=>{
    if(err) throw err;
    console.log("Task Done");
    fs.writeFile('txt1.txt', 'this is my data of node inside anoter fs function',(err)=>{
        if(err) throw err;
        console.log('Task2 Done')
    })
})

// fs.writeFile('txt3',"this is my data of node in parallel fs function",(err)=>{
//     if(err) throw err;
//     console.log('Task3 done')
// })