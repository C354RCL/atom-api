const express = require('express');
const habits = express.Router();
const db = require('../config/database');

habits.get('/', async(req, res) => {
    //Creamos la consulta para obtener todos los habitos
    const allHabits = await db.query("SELECT * FROM habits");
    console.log(allHabits);
    //Enviamos los resultados al cliente
    res.status(200).send(allHabits);
});

habits.post('/', async(req, res, next) =>{
    const {userName, habitId} = req.body;
    let userId = await db.query(`SELECT userId FROM users WHERE userName = '${userName}';`);
    let rows = await db.query(`INSERT INTO usersHabits(userId, habitId) VALUES(${userId[0].userId}, ${habitId});`);

    if(rows.affectedRows !== 1){
        return res.status(201).json({code : 201, message : 'No se pudo registrar el habito'})
    }

    return res.status(200).json({code : 200, message : 'Habito agregado'});
});

module.exports = habits;