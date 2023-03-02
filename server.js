const server = require("./app");
const connectMongo = require("./db/connection");
const { PORT } = process.env;

async function start() {
  try {
    await connectMongo();
    console.log("Database connection successful");
    server.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log("status 500, server or db error " + error);
    process.exit();
  }
}

start();
