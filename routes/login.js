const express = require('express');
const login = express.Router();
const db = require('../config/database');

//Creamos la ruta
login.post('/', async(req, res, next) => {
    //Obtenemos los valores del cuerpo de la peticion
    const {userName, email, passwd} = req.body;

    //Hacemos la consulta
    let query = `INSERT INTO users (userName, email, passwd) VALUES ('${userName}', '${email}', '${passwd}');`;

    //Creamos la fila
    const rows = await db.query(query);

    //Comprobamos si se inserto correctamente y devolvemos un mesaje
    if(rows.affectedRows !== 1) {
        return res.status(201).json({code : 201, message : 'No se pudo registrar el usuario'});
    }
    
    return res.status(200).json({code : 200, message : 'Usario registrado correctamente'});
    
});

//Exportamos el modulo
module.exports = login;