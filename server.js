const mongoose = require("mongoose");
const express = require("express");
const app = express()
const router = express.Router();
const port = 3000;

app.use(express.json())

//setting up the mongodb

var uri = "mongodb://127.0.0.1:27017/Social-Network-Api";
mongoose.connect(uri,{
  useUnifiedTopology: true, 
  useNewUrlParser: true
})

const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "connection error: "));
connection.once("open", function () {
  console.log("Connected successfully");
});

app.use("/", router);

app.listen(port, function() {
  console.log("Server is running on Port: " + port);
});