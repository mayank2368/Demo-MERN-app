const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const server = express();
const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
  console.log("db connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

server.use(cors());
server.use(bodyParser.json());

// CRUD - Create
server.post("/demo", async (req, res) => {
  let user = new User();

  user.username = req.body.username;
  user.password = req.body.password;
  const doc = await user.save();

  console.log(doc);
  res.json(doc);
});

// CRUD - View
server.get("/demo", async (req, res) => {
  const docs = await User.find({});
  res.json(docs);
});

server.listen(8080, () => {
  console.log("server is listening");
});
