let express = require("express");
let app = express(); //object of express, as express has lots of methods
// let port = 6700;
let dotenv = require("dotenv");
dotenv.config();
let port = process.env.PORT || 6700;

//default server, first parater is for path here it is default path
app.get("/", (req, res) => {
  //'/' means default port, and callback function
  res.send("Hi From Express");
});

app.get("/test", (req, res) => {
  res.send("Test Route");
});
app.get("/main", (req, res) => {
  res.send("Main Route");
});
//alwas try to give callbackfunction for any error
app.listen(port, (err) => {
  if (err) throw err;
  else {
    console.log(`Server is running on port ${port}`); //get port dynamically
  }
});
