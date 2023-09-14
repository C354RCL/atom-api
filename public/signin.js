document.addEventListener('DOMContentLoaded', function(){
    //Obtenemos los inputs del html
    const btnSignin = document.querySelector('#submit');
    const userNameInput = document.querySelector('#userName');
    const passwdInput = document.querySelector('#passwd');
    
    //Creamos un objeto que enviaremos a la base de datos
    const User = {
        userName : '',
        passwd : ''
    }

    //Les agregamos eventos a los inputs 
    userNameInput.addEventListener('input', validate);
    passwdInput.addEventListener('input', validate);
    btnSignin.addEventListener('click', sendForm);

    //Funcion que obtiene los datos de los inputs y los ingresa al objeto
    function validate(e){
        User[e.target.name] = e.target.value.trim();
    }

    //Funcion que envia el formulario
    function sendForm(e){
        e.preventDefault();
        //Hacemos destructuring del objeto User
        const {userName, passwd} = User;

        //Enviamos los datos para ser comprobados si son correctos 
        axios({
            method : 'post',
            url : 'http://localhost:3000/signin',
            data : {
                userName,
                passwd
            }
        }).then(function(res){
            //Comprobamos si los datos fueron correctos
            if (res.status === 200) {
                //Creamos un token para el inicio de sesion
                const token = res.data.token;
                console.log(token);
                //Guardamos el token en el localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('userName', userName);
                //Enviamos al usuario a la pagina principal
                window.location.href = './main.html';
            }
        }).catch(function(err){

        })

        //Reiniciamos el objeto despues de dos segundos
        setTimeout(() => {
            User.userName = '';
            User.passwd = '';
        }, 2000);
    }
});