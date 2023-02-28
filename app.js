const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const routes = require('./api/routes')


mongoose.connect('mongodb://localhost:27017/aghrahni_backend',{useNewUrlParser: true});
mongoose.set('strictQuery',true);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors({
    origin: '*'
}));
app.use('/uploads', express.static(path.join("uploads")));
app.use('/api/v1', routes)
// require('./api/routes/routes')(app);
module.exports = app;
