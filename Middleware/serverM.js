var express = require('express');
var app = express();
const path = require('path');
const hbs = require('express-handlebars');
const axios = require('axios');
const multer = require('multer');
const connection = require('./connection/connection');
const getInfo = require('./db/dbModule').getInfoImages
//-----------------------------------------
const PORT = 3010;
const servers = ['http://localhost:3011', 'http://localhost:3012', 'http://localhost:3013']
///------------------------------------
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', hbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, 'public')));
///----------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//var storage = multer.memoryStorage()
var upload = multer();
//app.use();
///----------------------------------
app.get('/', function (req, res) {
    getInfo((results) => {
        //console.log(results)
        res.render('index', {results: results} );
    })
});
app.get('/form', function (req, res) {
    res.render('formImage')
})
app.get('/server', (req, res) => {
    selectServer((indexServer) => {
        axios.get(servers[indexServer] + '/').
        then((response) => {
            console.log(response.data);
            res.send(response.data);
        }).catch((err)=>{
            console.log(err);
        })
    });
})

app.post('/saveImage', upload.single('selectedImage'),(req, res) => {
    console.log('Enviando imagen a servidor');
    //console.log(req.body);
    console.log(req.file);
    selectServer((indexServer) => {
        connection.sendImage(servers[indexServer], req.file);
    });
    res.redirect('/');
})

//--------------------------------------
function selectServer(cb) {
    var endPoint = '/spaceUsage';
    axios.all([
        axios.get(servers[0] + endPoint),
        axios.get(servers[1] + endPoint),
        axios.get(servers[2] + endPoint)
    ])
        .then(axios.spread((data1, data2, data3) => {
            // output of req.
            console.log('data1', data1.data.size, 'data2', data2.data.size, 'data3', data3.data.size)
            var min = data1.data.size;
            var indexServer = 0;
            if (min > data2.data.size) {
                min = data2.data.size;
                indexServer = 1;
            }
            if (min > data3.data.size) {
                min = data3.data.size;
                indexServer = 2;
            }
            console.log(indexServer)
            cb(indexServer);
        }));
}
//--------------------------------------

app.listen(PORT, function () {
    console.log('Middleware en puerto ', PORT)
})

