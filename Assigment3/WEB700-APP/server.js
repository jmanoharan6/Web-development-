/*********************************************************************************
* WEB700 – Assignment 04
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Janani Manoharan Student ID: 122627201 Date: 11-mar-2021
*
* Online (Heroku) Link: https://git.heroku.com/arcane-brushlands-68603.git
*
********************************************************************************/

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var path = require("path");
const bodyParser = require("body-parser");
var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
let moduleData = require("./modules/serverDataModule.js")
// setup a 'route' to listen on the default url path

app.get("/employees", (req, res) => {
    
    if(req.query.department==null)
{
    moduleData.intialize().then((data)=>{
        console.log(req.query);
        moduleData.getAllEmployees().then(function(data){
           res.json(data);
       }).catch((data)=>{
       res.json({message: "no results"});
       });
    });

}else{

    moduleData.intialize().then((data)=>{
        console.log(req.query);
        console.log(+req.query.department);
       moduleData.getEmployeesByDepartment(+req.query.department).then(function(data){
        res.json(data);
       }).catch(function(data){
        res.send({message: "no results"});
       });
    });
} 
});




app.get("/managers", (req, res) => {
    moduleData.intialize().then((data)=>{
        //console.log(data);
        moduleData.getManagers().then(function(data){
            res.json(data);
        }).catch((data)=>{
            res.json({message: "no results"});
        });
    });   
});

app.get("/departments", (req, res) => {
    moduleData.intialize().then((data)=>{
        //console.log(data);
        moduleData.getDepartments().then(function(data){
            res.json(data);
        }).catch((data)=>{
            res.json({message: "no results"});
        });
    });   
});

app.get("/employee/:num", (req, res) => {
    moduleData.intialize().then((data)=>{
        console.log(req.params.num);
        moduleData.getEmployeeByNum(req.params.num).then(function(data){
            console.log(data);
            res.send(data);
        }).catch((data)=>{
           res.json({message: "no results"});
           //res.send(data);
        });
    });   
});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"/views/home.html"));
});

app.get("/about",(req, res)=>{
    res.sendFile(path.join(__dirname,"/views/about.html"));
});

app.get("/htmlDemo",(req, res)=>{
    res.sendFile(path.join(__dirname,"/views/htmlDemo.html"));
});

app.get("/employees/add",(req, res)=>{
    res.sendFile(path.join(__dirname,"/views/addEmployee.html"));
});

app.post("/employees/add",(req, res)=>{
    moduleData.intialize().then((data)=>{
        console.log(req.body);
        moduleData.addEmployee(req.body).then(function(data){
            console.log(data);
            res.json(data);
        }).catch((data)=>{
           res.json({message: "no results"});
           //res.send(data);
        });
    });   
    
});

app.use((req,res,next)=>{
    res.status(404).send("Requested Page not found");
});



// setup http server to listen on HTTP_PORT
moduleData.intialize().then(()=>{
app.listen(HTTP_PORT, ()=>{
    console.log("server listening on port: " + HTTP_PORT);
});
}).catch((err)=>{
    console.log(err);
});