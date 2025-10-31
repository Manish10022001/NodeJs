const express = require("express");
const fileUpload = require("express-fileupload");
const port = 9999;
const app = express();
//const bodyParser = require('body-perser');
//static file path
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

//middleware
app.use(fileUpload()); //earlear body-parser  was used as separate package but now
//express has that inbuile
//app.use(bodyParser.json());

//when app open, need to get page to uplaod content
app.get("/", (req, res) => {
  res.render("index"); //render/open index.ejs which contains form to upload image
});

//to upload or submit image to see it
app.post("/profile", (req, res) => {
  console.log(req.files);
  console.log(req.body);

  //create object
  const imageFile = req.files.fileName;
  //upload image
  imageFile.mv(`${__dirname}/public/images/${imageFile.name}`, (err,data)=>{
    if(err) throw err;
    res.render('display',{title:req.body.imgName, image:imageFile.name})
  })
  //mv means move it moves the image to specified path
//   res.send("ok");
});

app.listen(port,()=>{
    console.log("Listening on port "+port);
})