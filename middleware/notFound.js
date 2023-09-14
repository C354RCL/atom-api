//Creamos el modulo
module.exports = (req, res, next) => {
    //Mensaje que regresa en caso de que no se encuentre la URL
    return res.status(400).send({code : 404, message : 'URL not found'});
}