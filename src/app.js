require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const router  = require('./route/route');
var morgan = require('morgan');
const path = require('path');
const app = express();

app.use(morgan('combined', {
  skip: function (req, res) { return res.statusCode < 400 }
}))
app.use(express.json());
app.set('views', path.join(__dirname,'./views'))
app.use(express.static(path.join(__dirname,'../public')))
app.use(express.urlencoded({extended:true}))
const url = process.env.DB;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

 
  app.use(morgan('combined'))

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
