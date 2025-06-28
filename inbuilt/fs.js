let fs = require("fs");
fs.writeFile("myCode.txt", "this is my data of node", (err) => {
  if (err) throw err;
  console.log("Task Done");
  // fs.writeFile('txt1.txt', 'this is my data of node inside anoter fs function',(err)=>{
  //     if(err) throw err;
  //     console.log('Task2 Done') we write writeFile method inside the callback function if we wan it to execute after the first one is executed.
  //})
});

// fs.writeFile('txt3',"this is my data of node in parallel fs function",(err)=>{
//     if(err) throw err;
//     console.log('Task3 done')
// })

//drawback of writeFile: it overwrite the file, so to overcome we use appendFile
