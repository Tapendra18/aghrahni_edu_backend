const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");


mongoose.connect('mongodb://localhost:27017/aghrahni_backend',{useNewUrlParser: true});
mongoose.set('strictQuery',true);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));
app.use('/uploads', express.static(path.join("uploads")));

require('./api/routes/routes')(app);
module.exports = app;
