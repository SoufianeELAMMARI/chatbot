var express = require('express')
    request = require('request')
    bodyParser=require('body-parser');

var app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(5000, () => console.log('Express server is listening on port 5000'));
app.get('/',function(req,res){
      res.send("hi")
});
