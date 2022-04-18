//installing dependencies
const express = require('express')
const app = express()
const PORT = 3005
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// connecting to mongodb
const mongoose = require('mongoose')
const uri = "mongodb://127.0.0.1:27017/Social-Network-Api"
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () =>
console.log('Connection to MongoDB successful!')
);
//incase of error in connection
mongoose.connection.on('error', (err) =>
console.log(`Error-Disconnection: ${err}`)
);
mongoose.set('debug', true)

app.use(require('./routes'));

//Starting the server 
app.listen(PORT, () => {
console.log((`Connected on localhost:${PORT}`))
})