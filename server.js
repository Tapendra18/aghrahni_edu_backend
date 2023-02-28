const http = require("http");
const express = require("express");
const apps = require('./app');
const app = express();
const mongoose = require("mongoose");

// const port = '192.168.1.57' || 5000;

mongoose.set("strictQuery" , true);

const server = http.createServer(apps);

server.listen(4000, ()=>{
    console.log(`server start at Port No ${4000} `)
});