// const storage = require("../storages/storage");

exports.basicGet = (req, res) => {
  //   res.send(`Hello world`);
  res.render("index", { data: "" });
};
