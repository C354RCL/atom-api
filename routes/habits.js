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

module.exports = habits;