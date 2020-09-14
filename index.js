const express = require('express')
//database
require('./database/mongoose')
//user 
const app = express()

const userRoute = require('./routes/user')
app.use(express.json());

app.use("/api", userRoute)

app.listen(3000, () => {
    console.log("Done");
})