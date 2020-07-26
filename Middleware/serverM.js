var express = require('express');
var app = express();
const path = require('path');
const hbs = require('express-handlebars');
const axios = require('axios');
//-----------------------------------------
const PORT = 3010;
const servers = ['http:localhost:3011', 'http:localhost:3012', 'http:localhost:3013']
///------------------------------------
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', hbs({
    defaultLayout: 'main', 
    layoutsDir : path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
///----------------------------------

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/form', function(req, res) {
    res.render('formImage')
})

app.post('/saveImage', multipartMiddleware, (req, res) => {
    console.log(req.body, req.files);
    //selectServer();
    res.send('Enviando imagen a servidor')
})

//--------------------------------------
function selectServer() {
    servers.forEach(element => {
        axios.get(element + '/spaceUsage').
        then((res) => {
            console.log('Espacio usado', res.data)
        }).catch((error) => {
            console.log('Error al solicitar espacio de servidor usado');
        })
    });
}
//--------------------------------------

app.listen(PORT, function (){
  console.log('Middleware en puerto ', PORT)
})