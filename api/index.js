const express = require('express');
const mongoose = require('mongoose');
const dotenv= require('dotenv').config();
const app = express();
const authRoute= require("./routes/auth");
const hotelsRoute = require("./routes/hotels");
const roomsRoute= require("./routes/rooms");
const usersRoute = require("./routes/users");
var cookieParser = require('cookie-parser')




mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("Connected to MongoDb")})
.catch((err)=>{console.log("Error connecting to Mongo")});

//middleware
app.use(express.json());
app.use(cookieParser());



app.use("/api/auth",authRoute);
app.use("/api/hotels",hotelsRoute);
app.use("/api/rooms",roomsRoute);
app.use("/api/users",usersRoute);




app.use((err,req,res,next)=>{

    const errorStatus= err.status|| 500;
    const errorMessage= err.message|| "Oops Something went wrong";

    res.status(errorStatus).json({
        succuss:false,
        errorStatus,
        errorMessage,
        stack:err.stack,
    })


})


app.listen(8000,()=>{
    console.log("listing on port 8000");
})