const express = require('express');
const habit = express.Router();
const db = require('../config/database');

// Agregar un nuevo habito al usuario
habit.post('/', async(req, res) => {
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

// Modificar timesDone
habit.patch('/', async(req, res) => {
    try{
        // Obtenemos los datos del cuerpo de la peticion
        const {habitId, userName} = req.body;
    
        // Obtenemos el ID del usuario
        let userId = await db.query(`SELECT userId FROM users WHERE userName = '${userName}';`);

        // Obtenemos si el habito ha sido completado o no
        let completed = await db.query(`SELECT completed FROM usershabits WHERE userId = ${userId[0].userId} AND habitId = ${habitId}`);

        // Obtenemos las veces que ha realizado el habito
        let timesDonev = await db.query(`SELECT timesDone FROM usershabits WHERE userId = ${userId[0].userId} AND habitId = ${habitId};`);
        
        if(timesDonev[0].timesDone < 21) {
            // Actualizamos timesDone
            let rows =  await db.query(`UPDATE usershabits SET timesDone = timesDone + 1 WHERE userId = ${userId[0].userId} AND habitId = ${habitId}`);
        
            // Si las filas afectadas son diferentes de 1 se manda un error
            if(rows.affectedRows !== 1){
                return res.status(404).json({code : 404, message : 'No se pudo actualizar las veces realizadas del habito'})
            }
        
            // Enviamos mensaje de confirmacion
            return res.status(201).json({code : 201, message : 'timesDone actualizado correctamente'});
        } else if(timesDonev[0].timesDone === 21 && completed[0].completed === 0) {
            let rows = await db.query(`UPDATE usershabits SET completed = completed + 1 WHERE userId = ${userId[0].userId} AND habitId = ${habitId}`);
            if(rows.affectedRows !== 1){
                return res.status(404).json({code : 404, message : 'No se pudo completar tu habito'});
            }
            return res.status(200).json({code : 200, message : 'Felicidades has completado tu habito'});
        } else {
            return res.status(200).json({code : 200, message : 'Este habito ya ha sido completado'});
        }

    } catch{
        return res.status(404).json({code : 404, message : 'Error en la ruta'});
    }
});

module.exports = habit;