//Ruta principal
const express = require('express');
const index = express.Router();
const path = require('path');

index.get("/", (req, res) => {
    //Creamos la ruta principal
    const completeRoute = path.join(__dirname, '../public/index.html');
    //Enviamos el archivo principal
    res.sendFile(completeRoute);
})

module.exports = index;