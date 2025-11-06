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
const port = process.env.PORT || 9000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//Swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const package = require("./package.json");

//pick swagger document version from package.version
swaggerDocument.info.version = package.version;
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
//Health Check
app.get("/health", (req, res) => {
  res.send("Health Ok");
});

//insert user
app.post("/addUser", async (req, res) => {
  await collection.insertOne(req.body);
  res.send("Data Added");
});

//get users details
app.get("/users", async (req, res) => {
  const output = []; // want data in array;
  let query = {};
  if (req.query.city && req.query.role) {
    query = { city: req.query.city, role: req.query.role, isActive: true };
  } else if (req.query.city) {
    query = { city: req.query.city };
  } else if (req.query.role) {
    query = { role: req.query.role };
  } else if (req.query.isActive) {
    //by default query is string , but our values are boolean so we use condition
    let isActive = req.query.isActive;
    if (isActive == "false") {
      isActive = false;
    } else {
      isActive = true;
    }
    query = { isActive };
  } else {
    query = { isActive: true };
  }
  const cursor = collection.find(query);
  //loop to get all data
  for await (const data of cursor) {
    output.push(data);
  }
  cursor.closed;
  res.send(output);
});

//get particular user
app.get("/users/:id", async (req, res) => {
  const output = [];
  let query = { _id: new Mongo.ObjectId(req.params.id) };
  const cursor = collection.find(query);
  for await (const data of cursor) {
    output.push(data);
  }
  cursor.closed;
  res.send(output);
});

//update user
app.put("/updateUser", async (req, res) => {
  await collection.updateOne(
    {
      _id: new Mongo.ObjectId(req.body._id),
    },
    {
      $set: {
        name: req.body.name,
        city: req.body.city,
        phone: req.body.phone,
        role: req.body.role,
        isActive: true,
      },
    }
  );
  res.send("Record updated");
});
//hard delete : it totally removed data from db
app.delete("/deleteUser", async (req, res) => {
  await collection.deleteOne({
    _id: new Mongo.ObjectId(req.body._id),
  });
  res.send("User Deleted");
});

//soft delete: it means suppose some products is not available for some time so we do not want that data to be visible on the site. so instead of
//hard deleting ti we soft delete it i.e deactivate it.
//Soft delete is a update query only. because we set isActive to false or true
app.put("/deactivateUser", async (req, res) => {
  await collection.updateOne(
    {
      _id: new Mongo.ObjectId(req.body._id),
    },
    {
      $set: {
        isActive: false, //this deactivates user i.e do not show data
      },
    }
  );
  res.send("User Deactivated");
});

//soft delete -> activate user again
app.put("/activateUser", async (req, res) => {
  await collection.updateOne(
    {
      _id: new Mongo.ObjectId(req.body._id),
    },
    {
      $set: {
        isActive: true,
      },
    }
  );
  res.send("User Activated");
});

app.listen(port, () => {
  //call main method
  main();
  console.log(`Running on port ${port}`);
});
