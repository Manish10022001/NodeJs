const express = require("express");
const app = express();
const Mongo = require("mongodb");
const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

//connect to db
async function main() {
  await client.connect();
}
// one one row/record there so give it here
const collection = client.db("nodedb").collection("dashboard");

const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.evn.PORT || 9000;

//swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json"); //swagger is alternative of postman and create swagger.jsonn file
const package = require("./package.json");

app.use(bodyParser, urlencoded({ extended: true }));
app.use(bodyParser.json);
app.use(cors());

//Health Check
app.get("/health", (req, res) => {
  console.log("Health Ok");
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
