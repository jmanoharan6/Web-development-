const express = require("express");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const http = require("http");
const https = require("https");
const app = express();

const HTTP_PORT = process.env.PORT || 8080;
const HTTPS_PORT = 4433;

const https_options = {
    key: fs.readFileSync(__dirname + "/server.key"),
    cert: fs.readFileSync(__dirname + "/server.crt")
}

app.get("/", (req,res)=>{
    res.send("Hello World");
});

app.get("/passwordEncrypt", (req,res)=>{

    bcrypt.hash(req.query.password, 10).then(hashedPassword=>{
        res.json({plainText: req.query.password, hashed: hashedPassword});
    })    
});

app.get("/passwordCheck", (req,res)=>{
    bcrypt.compare(req.query.password, req.query.hash).then(match=>{
        res.json({password: req.query.password, hash: req.query.hash, matches: match});
    });
});

http.createServer(app).listen(HTTP_PORT, ()=>{
    console.log("http server listening on: " + HTTP_PORT);
});

https.createServer(https_options, app).listen(HTTPS_PORT, ()=>{
    console.log("https server listening on: " + HTTPS_PORT);
});

