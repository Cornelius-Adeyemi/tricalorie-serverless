
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const myRouer = require("../server/controller");
const Serverless = require("serverless-http");




const app = express();
mongoose.connect(process.env.DB, {useNewUrlParser: true, useUnifiedTopology:true });
const db = mongoose.connection;

db.on("error", function(err){
    console.log(err)
})

db.once("open", function(){
    console.log("connection establish");
});



app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
    );
    next();
  });

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use("/.netlify/functions/server", myRouer);


module.exports.handler = Serverless(app)