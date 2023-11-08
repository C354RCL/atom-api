const express = require('express');
const login = express.Router();
const db = require('../config/database');

// Agregar un nuevo usuario a la base de datos
login.post('/', async(req, res, next) => {
    try {
        //Obtenemos los valores del cuerpo de la peticion
        const {userName, email, passwd} = req.body;
    
        //Hacemos la consulta
        let query = `INSERT INTO users (userName, email, passwd) VALUES ('${userName}', '${email}', '${passwd}');`;
    
        // Creamos la fila
        const rows = await db.query(query);
    
        //Comprobamos si se inserto correctamente y devolvemos un mesaje
        if(rows.affectedRows !== 1) {
            return res.status(404).json({code : 404, message : 'No se pudo registrar el usuario'});
        }
        
        return res.status(201).json({code : 201, message : 'Usario registrado correctamente'});
    } catch {
        return res.status(404).json({code : 404, message : "Error, intentalo más tarde"})
    }
    
});

//Exportamos el modulo
module.exports = login;