// ruta 'habits' donde se pueden consultar todos los habits o individualmente
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

// Obtener un habito por medio del id enviado
habits.get('/:id([0-9]{1,3})',async(req, res, next) => {
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

// Agregar un nuevo habito al usuario
habits.post('/', async(req, res, next) =>{
    try {
        // Obtenemos los datos de la peticion 
        const {userName, habitId} = req.body;
        // Obtenemos el id del usuario 
        let userId = await db.query(`SELECT userId FROM users WHERE userName = '${userName}';`);
        // Agregamos el nuevo habito al usuario
        let rows = await db.query(`INSERT INTO usersHabits(userId, habitId) VALUES(${userId[0].userId}, ${habitId});`);
    
        // Si las filas afectadas son diferentes de 1 se manda un error
        if(rows.affectedRows !== 1){
            return res.status(404).json({code : 404, message : 'No se pudo registrar el habito'})
        }
    
        // Enviamos mensaje de confirmacion
        return res.status(201).json({code : 201, message : 'Habito agregado'});
    } catch{
        return res.status(404).json({code : 404, message : 'Error en la ruta'});
    }
});

module.exports = habits;