const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const UserModel = require("./models/Users");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:2701/Tracer");

app.post("/register", (req, res) => {
  UserModel.create(req.body)
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("Login Successfull!");
      } else {
        res.json("The Password is Incorrect");
      }
    } else {
      res.json("No Record Existed.");
    }
  });
});

app.listen(5000, () => {
  console.log("Server is Running...");
});
