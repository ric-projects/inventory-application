const express = require("express");
const app = express();
// To modify to a type of router, like usersRouter
const router = require("./routes/router");

// Only if using EJS as view engine
app.set("view engine", "ejs");
// To parse the url data into req.body
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => res.send("Hello, world!"));
app.use("/", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening: ${PORT}`);
});
