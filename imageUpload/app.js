const express = require("express");
const fileUpload = require("express-fileupload");
const port = 9999;
const { MongoClient } = require("mongodb");
const app = express();

//static file path
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
//middleware
app.use(fileUpload());

//mongodb setup
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

//connecting to mongodb
async function connectDb() {
  await client.connect();
}
connectDb();

const db = client.db("nodedb");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/profile", (req, res) => {
  console.log(req.files);
  console.log(req.body);

  const imageFile = req.files.fileName;
  imageFile.mv(
    `${__dirname}/public/images/${imageFile.name}`,
    async (err, data) => {
      if (err) throw err;

      await db.collection("images").insertOne({
        name: req.body.imgName,
        path: `/images/${imageFile.name}`,
      });

      res.render("display", {
        title: req.body.imgName,
        image: imageFile.name,
      });
    }
  );
});

app.get("/viewall", async (req, res) => {
  const images = await db.collection("images").find().toArray();
  res.render("viewall", { images });
});
app.listen(port, () => {
  console.log("listening on port " + port);
});
