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
fs.appendFile("myText.txt", "Code from Node FS \n", (err) => {
  if (err) throw err;
  console.log("File Appended"); //add multiple files without overwitingg.
});

//readFile requires three details, file, encoding,callback function with para error and data, name can be anything but sequence same
//encode means it convert it to readable form,becaut it returns in buffer format , binary or;
fs.readFile("myText.txt", (err, data) => {
  if (err) throw err;
  console.log(data);
});
fs.readFile("city.json", "utf-8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
//but if data is very large in both files then parallel process happens and output is not in order it will be mixed.
//so to avoid it we use readFileSync

//readFileSync(path,object)  object => {encoding:"utf-8" flag:"r"} r means read The flag is a string that tells Node.js how to open the file — whether to read it, write to it, append to it, or both.
// -no callback, it reads in sync. read data in proper format i.e step by step
let data = fs.readFileSync("city.json", { encoding: "utf-8", flag: "r" });
console.log(data);
// //sync means first data will run after it is complete then only data1 will run or execute.
let data1 = fs.readFileSync("myText.txt", { encoding: "utf-8", flag: "r" });
console.log(data1);

//Delete File
//Use of using parameter in callback function: in below we did not provide parameter, myCode2.txt does not exist still it displayed file deleted because we did not provide paramerter in callback function
//if we provide parameter to callback function then it tell us that the file does not exist or any error message instead of executing.
// fs.unlink('myCode2.txt',()=>{
//     console.log("file deleted")
// })  =not recommended

fs.unlink("myCode2.txt", (err) => {
  if (err) throw err;
  console.log("file deleteed");
});

//rename file - rename(oldfilename,newfilename,()=>{})
fs.rename("myText.txt", "myFile.txt", (err) => {
  if (err) throw err;
  console.log("File renamed");
});
