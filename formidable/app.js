const express = require("express");
const formidable = require("formidable");
const fs = require("fs");
const app = express();
const port = 8806;

//static file path
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/profile", (req, res) => {
  //create object
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    let oldPath = files.fileName[0].filepath;
    let newPath = `${__dirname}/public/images/${files.fileName[0].originalFilename}`;
    console.log(oldPath);
    console.log(newPath);

    fs.rename(oldPath, newPath, (err) => {
      res.send("file uploaded");
    });
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
