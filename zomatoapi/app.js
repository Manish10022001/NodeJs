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

let authKey = process.env.AuthKey;

function auth(key) {
  if (key == authKey) {
    return true;
  } else {
    return false;
  }
}

//get heart beat : to check if api calls are working properly
app.get("/", (req, res) => {
  res.status(200).send("Health Ok");
});
//we do not want everywon to acces this api so we give auth key so without it on one can acces the api
app.get("/location", async (req, res) => {
  // let key = req.header("x-basic-token"); //used header because it is not browser generated
  // if (auth(key)) {

  const data = await db.collection("location").find({}).toArray();
  res.status(200).send(data);
});

//getting restaurant wrt to citties and menuType
app.get("/restaurant", async (req, res) => {
  let query = {};
  let stateId = Number(req.query.stateId);
  let mealId = Number(req.query.mealId);

  if (stateId && mealId) {
    query = { state_id: stateId, "mealTypes.mealtype_id": mealId };
  } else if (stateId) {
    query = { state_id: stateId };
  } else if (mealId) {
    query = { "mealTypes.mealtype_id": mealId };
  } else {
    query = {};
  }

  const data = await db.collection("restaurants").find(query).toArray();
  res.status(200).send(data);
});

app.get("/meals", async (req, res) => {
  // let query = {};

  const data = await db.collection("mealType").find({}).toArray();
  res.status(200).send(data);
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

//getting list of restaurants
// app.get("/restaurant", async (req, res) => {
//   const data = await db.collection("restaurants").find().toArray();
//   res.status(200).send(data);
// });

//getting restaurant list wrt cities
// app.get("/restaurant", async (req, res) => {
//   let query = {};
//   let stateId = Number(req.query.stateId);
//   if (stateId) {
//     query = { state_id: stateId };
//   } else {
//     query = {};
//   }
//   const data = await db.collection("restaurants").find(query).toArray();
//   res.status(200).send(data);
// });
