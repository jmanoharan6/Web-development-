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
var exphbs = require('express-handlebars');
var path = require("path");
const bodyParser = require("body-parser");
var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.engine('.hbs', exphbs({ extname: '.hbs' ,
   helpers:{ navLink: function(url, options){
    return '<li' +
    ((url == app.locals.activeRoute) ? ' class="nav-item active" ' : ' class="nav-item" ') +
    '><a class="nav-link" href="' + url + '">' + options.fn(this) + '</a></li>';},
    equal: function (lvalue, rvalue, options) {
        if (arguments.length < 3)
        throw new Error("Handlebars Helper equal needs 2 parameters");
        if (lvalue != rvalue) {
        return options.inverse(this);
        } else {
        return options.fn(this);
        }}
       }}));
app.set('view engine', '.hbs');
let moduleData = require("./modules/serverDataModule.js")
// setup a 'route' to listen on the default url path

app.get("/employees", (req, res) => {
    
    if(req.query.department==null)
{
    moduleData.intialize().then((data)=>{
        console.log(req.query);
        moduleData.getAllEmployees().then(function(data){
           res.render("employees",{employees:data});
       }).catch((data)=>{
       res.render("employees",{message: "no results"});
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





app.get("/departments", (req, res) => {
    moduleData.intialize().then((data)=>{
        //console.log(data);
        moduleData.getDepartments().then(function(data){
            res.render("departments",{departments: data});
        }).catch((data)=>{
            res.render("departments",{message: "no results"});
        });
    });   
});

app.get("/employee/:num", (req, res) => {
    moduleData.intialize().then((data)=>{
        console.log(req.params.num);
        moduleData.getEmployeeByNum(req.params.num).then(function(data){
            console.log(data);
            res.render("employee",{employee:data});
        }).catch((data)=>{
           res.render("employee",{message: "no results"});
           //res.send(data);
        });
    });   
});

app.get("/department/:id", (req, res) => {
    moduleData.intialize().then((data)=>{
        console.log(req.params.id);
        moduleData.getDepartmentById(req.params.id).then(function(data){
            console.log(data);
            res.render("department",{department:data});
        }).catch((data)=>{
           res.render("department",{message: "no results"});
           //res.send(data);
        });
    });   
});

app.use(function(req,res,next){
    let route = req.baseUrl + req.path;
    app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
    next();
   });

app.get("/", (req, res) => {
    res.render('home');
});

app.get("/about",(req, res)=>{
    res.render('about');
});

app.get("/htmlDemo",(req, res)=>{
    res.render('htmlDemo');
});

app.get("/employees/add",(req, res)=>{
    res.render('addEmployee');
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

app.post("/employee/update", (req, res) => {
    moduleData.intialize().then((data)=>{
        console.log(req.body);
        moduleData.updateEmployee(req.body).then(function(data){
            console.log("+++++++++");
            console.log(data);
            
            res.redirect("/employees");
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