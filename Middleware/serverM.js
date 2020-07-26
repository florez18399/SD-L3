var express = require('express');
var app = express();
const path = require('path');
const hbs = require('express-handlebars');
//-----------------------------
const PORT = 3010;
const servers = ['http:localhost:3011', 'http:localhost:3012', 'http:localhost:3013']
///------------------------------------
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

app.listen(PORT, function (){
  console.log('Middleware en puerto ', PORT)
})