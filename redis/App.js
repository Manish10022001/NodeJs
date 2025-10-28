let express = require("express");
let axios = require("axios");
let redis = require("@redis/client");
let port = process.env.PORT || 7000;
let app = express();

//connet to db usring version v5.x
let client = redis.createClient({
  url: "redis://localhost:6379",
});

//ensure redis is connected: use .connect() to establish connection
client.connect().catch(console.error);

//get data
app.get("/data", async (req, res) => {
  let userInput = req.query.country?.trim();
  userInput = userInput ? userInput : "india";

  if (!userInput) {
    return res.status(400).send({ error: "country parameter is required" });
  }

  const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`;

  try {
    //check redis for cached data
    const result = await client.get(userInput);
    if (result) {
      const output = JSON.parse(result);
      res.send(output);
    } else {
      //get data from db and save in redis for future rrequests
      const response = await axios.get(url);
      const output = response.data;

      //save response data to redis for future request
      await client.setEx(
        userInput,
        3600,
        JSON.stringify({ source: "Redis Cache", output })
      );

      //return api response
      res.send({ source: "API response", output });
    }
  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).send({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
