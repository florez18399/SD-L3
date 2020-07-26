var express = require('express');
var app = express();

const PORT = process.argv[2];

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/saveImage', (req, res) => {
    res.send('Espacio utilizado...')
})

app.listen(PORT, function (){
  console.log('Servidor de imagenes en puerto ', PORT)
})

function checkUsageSpace() {
    
}