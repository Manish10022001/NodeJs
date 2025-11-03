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

let {
  getData,
  getDataWithSort,
  getDataWithSortWithLimit,
} = require("./controller/apiController");

function auth(key) {
  if (key == authKey) {
    return true;
  } else {
    return false;
  }
}

//p-1.4.2
// async function getData(colName, query) {
//   return db.collection(colName).find(query).toArray();
// } this is commong data so we put it in separate file apicontroller  and import it or requreit it wherever necessary

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

//p-1.4.1
app.get("/meals", async (req, res) => {
  let query = {};
  let collection = "mealType";
  const output = await getData(db, collection, query); //also pass db as parameter ad it is not defined in controller

  res.status(200).send(output);
});

//p-1 // FIltering
app.get("/filter/:mealId", async (req, res) => {
  let query = {};
  let collection = "restaurants";

  //p-2.4.2
  let sort = { cost: 1 }; //true ->ascending it is now defauilt

  //p-2.5.2
  let skip = 0;
  let limit = 1000000;

  //p-1.2.1 fitler basis on mealType and cuisine id
  let mealId = Number(req.params.mealId);
  let cuisineId = Number(req.query.cuisineId);
  //p-1.3.1 filter basis of price ie from min cost to max cost
  let hcost = Number(req.query.hcost);
  let lcost = Number(req.query.lcost);

  //p-2.5.3 if skip and limit not given in query then default but if given then select that
  if (req.query.skip && req.query.limit) {
    skip = Number(req.query.skip);
    limit = Number(req.query.limit);
  }
  //p-2.4.3 if in query sort is giving then choose that
  if (req.query.sort) {
    sort = { cost: req.query.sort };
  }

  if (cuisineId && hcost && lcost) {
    //-02.3.3
    query = {
      "mealTypes.mealtype_id": mealId,
      $and: [{ cost: { $gt: lcost, $lt: hcost } }],
      "cuisines.cuisine_id": cuisineId,
    };
  }
  //p-2.3.2
  else if (hcost && lcost) {
    query = {
      "mealTypes.mealtype_id": mealId,
      //we use $and mongo db condigion that returns all condition that are ture
      $and: [{ cost: { $gt: lcost, $lt: hcost } }],
    };
  }
  //p-1.2.2
  else if (cuisineId) {
    query = {
      "mealTypes.mealtype_id": mealId,
      "cuisines.cuisine_id": cuisineId,
    };
  }

  //p-2.4.1 : sorting on basis of price, we already have sort method so we just declare sort variable and initialize cost =1 (i.e true. sort in ascending of cost) for true or false and make new function in controller
  //to get data with sort

  //p-2.5.1: pagination requires sorting, skip and limit and all thre methed already there so just declare the variables for it skip =0 so nohing skipsna and set defaut limit and
  //creat new function to get data withpaginatio
  // const output = await getData(db, collection, query);

  // const output = await getDataWithSort(db, collection, query, sort);
  const output = await getDataWithSortWithLimit(
    db,
    collection,
    query,
    sort,
    skip,
    limit
  );
  res.send(output);
});

//p-3
//Details of the restaurants: there are 2 ways to get it
//first by using restaurant_id directly and second by using mongo.ObjectId
app.get("/details/:id", async (req, res) => {
  //1 st
  // let id = Number(req.params.id);
  // let query = {
  //   restaurant_id: id,
  // };

  //2nd
  let _id = new mongo.ObjectId(req.params.id);
  let query = { _id: _id };

  let collection = "restaurants";
  const output = await getData(db, collection, query);
  res.send(output);
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
