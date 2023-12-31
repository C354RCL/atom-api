const express = require('express');
const main = express.Router();
const db = require('../config/database');

// Obtener todos los habitos del usuario
main.get('/', async(req, res) => {
    try {
        // Obtenemos los datos de la peticion
        const userName = req.query.userName;
        console.log(userName)

        // Consulta para comprobar si el usuario existe
        const userExistQuery = `SELECT userId FROM users WHERE userName = ?;`;
        const userExist = await db.query(userExistQuery, [userName]);

        // Comprobamos si el usuario existe 
        if(userExist.length === 0) {
            return res.status(404).json({code : 404, message : 'El usuario no existe'})
        }
    
        // Hacemos la consulta a la base de datos
        const userHabits = await db.query(`SELECT icon, habitId, habitName, timesDone FROM view_users_habits WHERE completed = 0 AND userId = (SELECT userId FROM users WHERE userName = '${userName}');`);
        
        // Verificamos si tiene más de un habito agregado
        if(userHabits.length === 0){
            return res.status(404).json({code : 404, message : 'No tienes habitos guardados'});
        }
        
        // Retornamos los habitos del usuario
        return res.status(200).json(userHabits);
    } catch {
        return res.status(500).json({code : 404, message : 'Error, intentelo más tarde'})
    }
});

module.exports = main;