const express = require('express');
const main = express.Router();
const db = require('../config/database');

main.post('/', async(req, res, next) => {
    //Obtenemos los datos de la peticion
    const {userName} = req.body;

    //Hacemos la consulta a la base de datos
    const userHabits = await db.query(`SELECT * FROM view_users_habits WHERE userId = (SELECT userId FROM users WHERE userName = '${userName}');`);

    console.log(userHabits);

    if(userHabits.length === 0){
        res.status(201).json({code : 201, message : 'No tienes habitos guardados'});
    }
    
    res.status(200).json(userHabits);
});

module.exports = main;