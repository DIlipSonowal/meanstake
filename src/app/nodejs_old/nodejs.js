const express = require('express');
const bodyParser = require("body-parser");
const app = express();
var cors = require('cors')
app.use(bodyParser.json(), cors());
const path = require('path');
const db = require("./db");
const collection = "todo";

db.connect((err) =>{
    if(err){
        console.log("Unable to connect to database");
        process.exit(1);
    } else {
        app.listen(8080, ()=>{
            console.log('Connected to database, app listening at port 8080!!');
        });
    }
});

app.post('/createPost', (req, res) => {
    const userInput = req.body;
    db.getDB().collection(collection).insertOne(userInput, (err, result) =>{
        if(err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.get('/createPost', function(req, res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    db.getDB().collection(collection).find({}).toArray( (err , documents) => {
        if(err) {
            res.json(err);
        } else {
           // console.log(documents);
            res.json(documents);
        }
    });   
});

app.put('/createPost/:id', (req, res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
   const todoID = req.params.id; 
   const userInput = req.body;
   db.getDB().collection(collection).findOneAndUpdate({
       _id: db.getPrimaryKey(todoID) 
   }, {
       $set : {
           name: userInput.name,
           mobile: userInput.phone,
           email: userInput.email,
           address: userInput.address
       }
   }, {returnOriginal : false}, (err, result) =>{
       if(err) {
           console.log(err);
        } else {
           res.json(result);
       }
   });
});

app.delete('/createPost/:id', (req, res) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    const todoId  = req.params.id;
    db.getDB().collection(collection).findOneAndDelete({_id:db.getPrimaryKey(todoId)}, (err, result) =>{
        if(err){
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.post('/search', (req, res) =>{
    const txt1 = req.body;
    const txt = txt1.stext;
    db.getDB().collection(collection).find({ $or: [{name:new RegExp(txt)}, {mobile:new RegExp(txt)}, {email:new RegExp(txt)}, {address:new RegExp(txt)}] }).toArray((err, result) =>{
        if(err){
            res.json(err);
        } else {
            res.json(result);
        }
        //console.log(result);
    });
   
});

 