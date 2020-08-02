const client = require('./connectionDB');

module.exports = {
    insertInfoImage : (infoImage) => {
        //console.log(client);
        const query = `INSERT INTO IMAGES (server_host, pathImage, date_upload, size) VALUES ('${infoImage.server_host}', '${infoImage.path_image}', '${infoImage.date_upload}', ${infoImage.size});`
        console.log(query);
        client.query(query, (err, results) => {
            //client.query(`SELECT * FROM IMAGES`, (err, results) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log('Insertado en base de datos')
                console.log(results);
            }
        });
    },
    getInfoImages : (cb) => {
        const query = `SELECT * FROM IMAGES;`
        console.log(query);
        client.query(query, (err, results) => {
            //client.query(`SELECT * FROM IMAGES`, (err, results) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log('Insertado en base de datos')
                console.log(results.rows);
                cb(results.rows);
            }
        });
    }
}