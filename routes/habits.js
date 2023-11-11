const express = require('express');
const habits = express.Router();
const db = require('../config/database');

// Obtener todos los habitos
habits.get('/', async(req, res) => {
    try{
        //Creamos la consulta para obtener todos los habitos
        const allHabits = await db.query("SELECT h.icon, h.habitName, h.description, c.categoryName FROM habits h JOIN categories c ON h.categoryId = c.categoryId;");
        //Enviamos los resultados al cliente
        return res.status(200).json(allHabits);
    } catch {
        return res.status(404).json({code : 404, message : "Error al conseguir los habitos"})
    }
});

// Obtener un habito especifico por medio del id enviado
habits.get('/:id([0-9]{1,3})',async(req, res) => {
    try{
        // Obtenemos el id del cuerpo de la peticion
        const id = req.params.id;
        // Creamos la consulta 
        const habit = await db.query(`SELECT icon, habitName, description FROM habits WHERE habitId = ${id};`);
        // Comporbamos si hay un habito con el id enviado 
        habit.length > 0 ? 
        //Enviamos el habito si es que existe
        res.status(200).json(habit) 
        //Enviamos un error si es que no existe
        : res.status(404).json({code : 404, message : `Error al conseguir el habito con id : ${id}`})
    } catch {
        res.status(201).json({code : 201, message : `Error en la ruta`});
    }
});

// Obtener los habitos completados de un usuario
habits.get('/completed', async(req, res) => {
    try{
        // Obtenemos el id del cuerpo de la peticion
        const userName = req.body.userName;
        console.log(userName)
        // Creamos la consulta
        let query = `SELECT h.habitName, c.categoryName, uh.timesDone
        FROM usershabits uh
        JOIN habits h ON uh.habitId = h.habitId
        JOIN users u ON uh.userId = u.userId
        JOIN categories c ON h.categoryId = c.categoryId
        WHERE uh.completed = 1 AND u.userName = '${userName}';`;
        let completedHabits = await db.query(query);
        if(completedHabits.length > 0){
            return res.status(200).json(completedHabits);
        }

        return res.status(200).json({code : 200, message : 'No tienes habitos completados'})
    } catch {
        return res.status(404).json({code : 404, message : 'Error en la ruta'});
    }
});

module.exports = habits;