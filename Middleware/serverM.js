var express = require('express');
var app = express();

const PORT = 3011;

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function (){
  console.log('Middleware en puerto ', PORT)
})