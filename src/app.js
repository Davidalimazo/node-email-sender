require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const router  = require('./route/route');
const app = express();
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
const url = process.env.DB;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

const db = mongoose.connection;
db.on("error", (err)=>{
    console.log("error connecting to database "+err)
});
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(cors());
app.use(router);

module.exports = app;
