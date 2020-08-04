var express = require('express');
var app = express();
const path = require('path');
const hbs = require('express-handlebars');
const axios = require('axios');
const multer = require('multer');
const connection = require('./connection/connection');
const getInfo = require('./db/dbModule').getInfoImages;
//-----------------------------------------
const PORT = 3009;
//const servers = ['http://localhost:3011', 'http://localhost:3012', 'http://localhost:3013']
const servers = ['http://172.18.0.3:3010', 'http://172.18.0.4:3010', 'http://172.18.0.5:3010']
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
    getInfo(async (results) => {
        //console.log(results)
        res.render('index', { results: results });
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
            }).catch((err) => {
                console.log(err);
            })
    });
})

app.post('/saveImage', upload.single('selectedImage'), (req, res) => {
    console.log('Enviando imagen a servidor');
    selectServer((error, indexServer) => {
        console.log(undefined);
        if (!error) {
            connection.sendImage(servers[indexServer], req.file);
            res.redirect('/');
        } else {
            console.log('Enviando error');
            //res.redirect(500, '/');
            res.status(500).render('error', {message: String(error)});
        }
    });
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
            let size = [{i:0, size:data1.data.size}, {i:1, size:data2.data.size}, {i:2, size: data3.data.size}];
            var min = data1.data.size;
            var indexServer = 0;
            size.forEach(element => {
                if(Number(element.size) < Number(min)){
                    min = element.size;
                    indexServer = element.i;
                }
            });            
            console.log(min);
            if (min > 10.0) {
                cb(new Error("Ningun servidor tiene la capacidad de almacenar la imagen"));
            } else {
                console.log(indexServer)
                cb(null, indexServer);
            }
        })).catch((error) => {
            cb(new Error("Hay un servidor caido"));
        });;
}
//--------------------------------------

app.listen(PORT, function () {
    console.log('Middleware en puerto ', PORT)
})

