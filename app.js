require("dotenv").config();
const express = require("express");
const app = express();
// To modify to a type of router, like usersRouter
const itemsRouter = require("./routes/itemsRouter");
// const path = require('path');

// Only if using EJS as view engine
app.set("view engine", "ejs");
// To parse the url data into req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.static(("public")));

// app.get("/", (req, res) => res.send("Hello, world!"));
app.use("/", itemsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening: ${PORT}`);
});
