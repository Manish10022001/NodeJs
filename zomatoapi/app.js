const express = require("express");
const mongo = require("mongodb");
const { MongoClient } = require("mongodb");
let dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();
const app = express();
const mongoUrl = process.env.mongoUrl;
let port = process.env.PORT;
let db;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//get heart beat : to check if api calls are working properly
app.get("/", (req, res) => {
  res.status(200).send("Health Ok");
});

async function connectDb() {
  const client = new MongoClient(mongoUrl);
  await client.connect();
  db = client.db("restaurantdb"); //connect to database

  app.listen(port, () => {
    console.log("running on port " + port);
  });
}
connectDb();
// mongoClient.connect(mongoUrl,(err,client)=>{
//     if(err) console.log("Error while connecting mongo")

//     db = client.db('restaurantdb');
//     app.listen(port,()=>{
//         console.log("Running on port "+ port)
//     })
// })
