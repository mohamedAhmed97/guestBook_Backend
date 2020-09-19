const express = require('express')
//dontenv
require('dotenv').config({ path: './config/config.env' });
//database
require('./database/mongoose')

//user 
const app = express()
app.use(express.json());
const userRoute = require('./routes/user')
const messageRoute = require('./routes/message')
//CROS
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type,Authorization ,Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE,PATCH, OPTIONS');
  next();
});


//users routes
app.use("/api", userRoute)
//messages routs
app.use("/api/", messageRoute);

app.listen(3001||process.env.PORT, () => {
  console.log("Server Running on port" + process.env.PORT);
})