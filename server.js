require("dotenv").config();
const app =  require("./src/app");
app.listen(8080, () =>
  console.log("Server is running on http://localhost:8080")
);

process.on("SIGINT", (signal) => {
  console.log(`Received signal ${signal}`);
  process.exit(0);
});
