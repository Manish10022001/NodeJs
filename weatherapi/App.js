// First way to call API -> request

let express = require("express");
let request = require("request");
let port = process.env.PORT || 7700;

let app = express();

app.get("/weather", (req, res) => {
  //need to take city from user so use queryParam
  let city = req.query.city ? req.query.city : (req.query.city = "Delhi");
  let url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29`;

  //calling api , using request package, it has two parameters 1st url, 2nd (err,response,(or body if necessary)) and in the same order
  request(url, (err, response) => {
    if (err) throw err;
    res.send(response.body);
  });
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Running on port ${port}`);
});
