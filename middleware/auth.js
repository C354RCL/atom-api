//Importamos la libreria
const jwt = require('jsonwebtoken');

//Creamos el modulo a exportar
module.exports = (req, res, next) => {
    //Obtenmos el token del encabezado
    const token = req.header('Authorization');

    // Verificamos si se proporciona un token
    if (!token) {
        return res.status(401).json({ error: 'Autenticación fallida: Token no proporcionado' });
    }

    try {
        // Verifica y decodifica el token
        const decoded = jwt.verify(token, 'token');

        // Agregamos los datos decodificados del usuario al objeto de solicitud para su uso posterior
        req.user = decoded;

        // Llamamos a next() para pasar la solicitud al siguiente middleware o enrutador
        next();
    } catch (error) {
        // Manejo de errores si el token no es válido
        res.status(401).json({ error: 'Autenticación fallida: Token no válido' });
    }
}
