let express = require("express");
let axios = require("axios");
let redis = require("@redis/client");
let port = 7900;
const { MongoClient } = require("mongodb");
let { createClient } = require("@redis/client");
const app = express();

const url = "mongodb://localhost:27017";
const mClient = new MongoClient(url);
const rClient = createClient({ host: "localhost", port: 6379 });

//connecting to redis
rClient.on("err", (err) => console.log(err));

//connectin mongo
async function main() {
  await mClient.connect();
  await rClient.connect();
}

//const collection = mClient.db('nodedb').collection('products') : if data common
const collection = mClient.db("nodedb"); // if data not common

app.get("/data", async (req, res) => {
  let userInput = req.query.color.trim();
  let result = await rClient.get(userInput);
  if (result) {
    const output = JSON.parse(result);
    res.send(output);
  } else {
    //as data is not in redis get from mongo
    const output = [];
    //if data is not changing then give one common is not common then in this
    const cursor = collection.collection("products").find({ Color: userInput });
    //loop for getting deta
    for await (const data of cursor) {
      output.push(data); // it will push data in cursor
    }
    //wherever taking to server or db using await as we have to wait
    await rClient.set(
      userInput,
      JSON.stringify({ source: "redis cache", output }),
      { EX: 10, NX: true }
    ); //ex->expiry nx-> not existent
    cursor.closed;

    res.send({ source: "MongoDB", output });
  }
});

app.listen(port, (err) => {
  main();
  console.log(`Server is runnning on ${port}`);
});
