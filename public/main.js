document.addEventListener('DOMContentLoaded', function(){
    //Obtenemos el dato de userName guardado en el localStorage
    const userName = localStorage.getItem('userName');
    //Enviamos los datos al servidor
    axios({
        method : 'post',
        url : 'http://localhost:3000/main',
        data : {
            userName
        }
        }).then(function(res){
            console.log(res.data);
        });     
});

