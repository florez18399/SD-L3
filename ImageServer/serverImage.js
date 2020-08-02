var express = require('express');
var app = express();
const path = require('path')
const PORT = process.argv[2];
const gfs = require('get-folder-size');
const multer = require('multer');
//---------------------------------------------
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/public',express.static(path.join(__dirname, 'public/images')));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/images'),
    filename: (req, file, cb) => {  
        console.log(file);
        return cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
var upload = multer({storage}).single('file'); 
// app.use(multer({storage}).single('selectedIImage'));
//--------------------------------------------
app.get('/', function (req, res) {
  res.send('Hello World from port ' + PORT);
});

app.post('/saveImage', upload, (req, res) => {
    console.log('Recibiendo imagen');
    console.log(req.file);
    if(req.file) {
        console.log('Verdadero');
        res.status(200).json({ pathImage: `/public/${req.file.filename}`, size: req.file.size/1024/1024});
    }else {
        res.status(500).json({ message: 'Error al cargar imagen'});
    }
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
    gfs(path.join(__dirname, '/public/uploads' + PORT), (err, size) => {
        if(err) {
            console.log('Error al obtener espacio utilizado');
            return null;
        }else {
            console.log(size);
            cb((size / 1024 / 1024).toFixed(2));
        }
    })
}