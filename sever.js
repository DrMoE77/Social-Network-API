const express = require("express")
const PORT = process.env.PORT|| 27017
const app = express()
app.use(express.json())

//setting up the mongodb
const mongoose = require("mongoose")
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/Social-Network-Api',{
    //TO DO connecting to mongoDB
})

app.listen(PORT,()=>{
    console.log("connected to port: ${PORT}")
})