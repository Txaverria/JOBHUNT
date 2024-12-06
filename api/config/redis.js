const redis = require("redis");
const client = redis.createClient({
  socket: {
    host: "localhost", // Assuming Redis runs on localhost in WSL
    port: 6379, // Default Redis port
  },
});

client.on("connect", () => {
  console.log("Connected to Redis");
});

client.on("error", (err) => {
  console.error("Redis connection error:", err);
});

client.connect(); // Use async/await if required in some contexts

module.exports = client;
