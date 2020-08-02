const FormData = require('form-data');
const insertInfoImage = require('../db/dbModule');
const axios = require('axios').default;
const insertInDb =  require('../db/dbModule').insertInfoImage

const sendImage = async function(addressServer, file) {
    console.log('Subiendo imagen ...');
    console.log(file);
    //let stream = await bts(file.buffer); 
    let formData = new FormData();
    //console.log(formData);
    formData.append('file', file.buffer, file.originalname);
    //console.log(formData);
    let configImageSchema = {
        'headers': {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
        }
    }
    ///var stream = bufferToStream(file.buffer);
    axios.post(addressServer + '/saveImage', formData, configImageSchema)
        .then((res) => {
            let imageInfo = {
                server_host: addressServer,
                path_image: res.data.pathImage,
                date_upload: '2016-06-22 19:10:25',
                size: res.data.size
            } 
            insertInDb(imageInfo);
            console.log(imageInfo);
        }).catch((err) => {
            console.log(err.message);
            console.log('ERROR');
        })
    return false;
}

exports.sendImage = sendImage;