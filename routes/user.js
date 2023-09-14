const express = require('express');
const user = express.Router();
const db = require('../config/database');

user.post('/', async(req, res, next) => {
    const {userName} = req.body;

    //Hacemos la consulta a la base de datos
    const userInfo = await db.query(`SELECT userName, email FROM users WHERE userName = '${userName}';`);

    console.log(userInfo);

    res.status(200).json(userInfo);
});

module.exports = user;