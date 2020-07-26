var express = require('express');
var app = express();
const fs = require('fs');
const path = require('path')
const PORT = process.argv[2];
const gfs = require('get-folder-size');
app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/saveImage', (req, res) => {
    res.send('EN construccion' )
})

app.get('/spaceUsage', (req, res) => {
    checkUsageSpace((size) => {
        res.json({size: size});
    });
})

app.listen(PORT, function (){
  console.log('Servidor de imagenes en puerto ', PORT)
})

function checkUsageSpace(cb) {
    gfs(path.join(__dirname, '/public/uploads'), (err, size) => {
        if(err) {
            console.log('Error al obtener espacio utilizado');
            return null;
        }else {
            console.log(size);
            cb((size / 1024 / 1024).toFixed(2));
        }
    })
}