// wherever u are trying to deal with file system .
// it is used in logs, wher we ever download ticket fs is used, they write that in file and then download it for you. fs is used  indirectly.
//  any where content that is available to u , u r writing that in a file so u that u are use it later on tat i achieved through fs

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

//Apend
fs.appendFile('myText.txt','Code from Node FS \n',(err)=>{
    if(err) throw err;
    console.log("File Appended")//add multiple files without overwitingg.
})