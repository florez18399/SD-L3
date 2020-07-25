var express = require('express');
var app = express();

const PORT = 3010;

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function (){
  console.log('Servidor de imagenes en puerto ', PORT)
})