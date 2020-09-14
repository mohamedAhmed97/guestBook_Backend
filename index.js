const express = require('express')
//database
require('./database/mongoose')
//user 
const app = express()
app.use(express.json());
const userRoute = require('./routes/user')


app.use("/api", userRoute)

app.listen(3000, () => {
    console.log("Done");
})