const express = require("express")
const Router = require("./routes")

const app = express()
app.use(express.json())

//setting up the mongodb
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Social-Network-Api',{
    useNewUrlParser: true
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(Router);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});