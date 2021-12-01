 const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/rectangleDB', { useNewUrlParser: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
const rectangleSchema = new mongoose.Schema({
  main : String,
  x : Number,
  y : Number,
  width : Number,
  height : Number
});

const Rectangle = mongoose.model('Rectangle', rectangleSchema);

const main = new Rectangle({
  name: "main",
  x : 5,
  y : 5,
  width : 10,
  height : 20,
  detail: 3
})

main.save();
app.post('/',function(req, res){
  const dateAndTime = Date.now();
  const x = parseInt(req.body.x);
  const y = parseInt(req.body.y);
  const width = parseInt(req.body.width);
  const height = parseInt(req.body.height);
  const input = new Rectangle({
    x, y, width, height, dateAndTime
  })
  const details = (width + height) / (x + y) == 3;
  if (details){
    input.save();
    res.json(input)
  }else{
    res.send("<h1>Error</h1")
  }
})

Rectangle.deleteMany({x: 5}, function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Done");
  }
})

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
})





















app.listen(3000, function(){
  console.log("Server is running on port 3000!");
})
