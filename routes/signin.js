//Ruta a la que se le envian los datos de inicio de sesion y comprueba si son correctos
const express = require('express');
const signin = express.Router();
const db = require('../config/database');
const jwt = require('jsonwebtoken');

//Creamos la ruta
signin.post('/', async(req, res, next) => {
    //Obtenemos los datos qye vienen del cuerpo de la peticion
    const {userName, passwd} = req.body;

    //Hacemos la consulta
    const query = `SELECT * FROM users WHERE userName = ?;`;
    
    //Traemos los datos que nos regresa la consulta
    const user = await db.query(query, [userName]);

    //Comprobamos si los datos coinciden
    if(userName === user[0].userName && passwd === user[0].passwd) {
        //Creamos un objeto user con los datos obtenidos
        const User = {id : user[0].id, userName : user[0].userName};
        //Le asignamos un token de inicio de sesion
        const token = jwt.sign(User, 'clave');
        console.log(token);
        return res.status(200).json({code : 200, message : 'Credenciales correctas', token});
    } else {
        return res.status(201).json({code : 201, message : 'Credenciales incorrectas'});
    }
});


module.exports = signin;