let express = require("express");
let axios = require("axios");
let redis = require("redis");
let port = process.env.PORT || 7800;
let app = express(); //express object

// connect redis to database
let client = redis.createClient({
  //host and port
  host: "localhost",
  port: 6379,
});

//get data
app.get("/data", (req, res) => {
  //we want input from use so
  let userInput = req.query.country.trim(); //trim() to remove all whitespaces
  userInput = userInput ? userInput : "india";
  const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`;

  //check data in redis
  return client.get(userInput, function (err, result) {
    if (result) {
      const output = JSON.parse(result);
      res.send(output);
    } else {
      //data not part of redis call api
      //get data saved in redis from db for next time
      axios.get(url).then((response) => {
        const output = response.data;

        //save response in redis for next time
        client.setex(
          userInput,
          3600,
          JSON.stringify({ sourse: "Redis Cache", output })
        );

        //for first time return data from db
        res.send({ source: "API response", output });
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
