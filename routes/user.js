const express = require('express');
const user = express.Router();
const db = require('../config/database');

// Obtener los datos del usuario
user.get('/', async(req, res, next) => {
    try {
        // Obtenemos los datos del cuerpo de la peticion
        const userName = req.body.userName;
    
        // Hacemos la consulta a la base de datos
        const userInfo = await db.query(`SELECT userName, email FROM users WHERE userName = '${userName}';`);
        
        // Retornamos los datos del usuario
        return res.status(200).json(userInfo);
    } catch {
        return res.status(404).json({code : 404, message : 'Error en la ruta'});
    }
});

module.exports = user;