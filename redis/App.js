let express = require("express");
let axios = require("axios");
let redis = require("@redis/client");  // Import the new Redis client for version 5.x
let port = process.env.PORT || 7800;
let app = express(); // Express object

// Connect Redis to the database using version 5.x
let client = redis.createClient({
  url: "redis://localhost:6379",  // Redis connection URL for v5.x
});

// Ensure Redis is connected
client.connect().catch(console.error);  // Use .connect() to establish connection

// Get data
app.get("/data", async (req, res) => {
  let userInput = req.query.country?.trim(); // Use optional chaining to prevent errors when country is undefined
  userInput = userInput ? userInput : "india"; // Default to "india" if no country is provided
  
  if (!userInput) {
    return res.status(400).send({ error: "Country parameter is required" });
  }

  const url = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=${userInput}`;

  try {
    // Check Redis for cached data
    const result = await client.get(userInput);  // Use async/await for Redis commands

    if (result) {
      // Parse and return cached data from Redis
      const output = JSON.parse(result);
      res.send(output);
    } else {
      // If no data is found in Redis, call the API
      const response = await axios.get(url);
      const output = response.data;

      // Save the response data to Redis for future requests (expires in 1 hour)
      await client.setEx(userInput, 3600, JSON.stringify({ source: "Redis Cache", output }));

      // Return the API response
      res.send({ source: "API response", output });
    }
  } catch (err) {
    console.error("Error with Redis or API:", err);
    res.status(500).send({ error: "An error occurred. Please try again later." });
  }
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
