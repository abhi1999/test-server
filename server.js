"use strict";

const express = require("express");
const moment = require("moment");
const faker = require("faker");
const bodyParser = require("body-parser");
const app = express();


app.use("/", express.static(__dirname+ "/static"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use((req,res, next)=>{
    console.log("app.originHeader");
    res.header("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Credentials","true");
    res.setHeader("Access-Control-Allow-Methods","GET,HEAD,OPTIONS,POST,DELETE,UPDATE");
    res.setHeader("Access-Control-Allow-Headers","Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
    next();
})

app.get("/", (req, res)=>{
    console.log('app.root');
    res.json({"name":"server  root", date: new Date().getTime()})
})


const appListener = app.listen(process.env.PORT || 3001, ()=>{
    console.log(`app.listen; port ${appListener.address().port}`);
})