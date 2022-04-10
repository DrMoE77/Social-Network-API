const express = require("express")
const PORT = process.env.PORT|| 3000
const app = express()
app.use(express.json())

//setting up the mongodb
const mongoose = require("mongoose")
mongoose.connect(process.env.mongodb)