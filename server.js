"use strict";

const express = require("express");
const moment = require("moment");
const faker = require("faker");
const bodyParser = require("body-parser");
const _ = require("lodash")

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

var generateData=(numberOfItems)=>{
    if(numberOfItems === undefined)numberOfItems=9;
    let tleData = [] 
    _.times(numberOfItems, ()=>{
        tleData.push({
            partner: faker.company.companyName(),//Y'xx',
            type: _.sample(['PO',"Invoice"]),
            direction: _.sample(["Inbound", "Outbound"]),
            dateReceived: faker.date.past(),
            poNumber: faker.random.alphaNumeric(4) + faker.random.number() + faker.random.alphaNumeric(4) ,//"00" + faker.finance.account(),
            id:  faker.random.number(),
            additionalData:{}
        })
    })
    return {values:tleData, serverResponse:new Date()};
}

app.get("/getGridData", (req, res)=>{
    console.log('getGridData')
    res.json(generateData(req.query.items))
})

/*
app.get("getTLEData", (req, res)=>{
    var retData ={
        values:[ {
            "ShortCutID": 11,
            "Title": "Send Request for Quote to ERP",
            "GroupName": "Quote",
            "ControlID": 60031,
            "ControlName": "Send Request for Quote to ERP",
            "MethodCall": "QuoteMenuItem1",
            "func_code": "",
            "MethodParams": "",
            "Type": "1",
            "BeginGroup": false,
            "GroupColor": "&H00C0C000",
            "GroupOrder": 0,
            "ControlOrder": 1
        },]
    }
})

app.get("odata/getAllTileData", (req, res)=>{
    var retData ={
        values:[ {
            "ShortCutID": 11,
            "Title": "Send Request for Quote to ERP",
            "GroupName": "Quote",
            "ControlID": 60031,
            "ControlName": "Send Request for Quote to ERP",
            "MethodCall": "QuoteMenuItem1",
            "func_code": "",
            "MethodParams": "",
            "Type": "1",
            "BeginGroup": false,
            "GroupColor": "&H00C0C000",
            "GroupOrder": 0,
            "ControlOrder": 1
        },]
    }
})
*/
const appListener = app.listen(process.env.PORT || 3001, ()=>{
    console.log(`app.listen; port ${appListener.address().port}`);
})