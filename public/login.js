document.addEventListener('DOMContentLoaded', function(){
    //Obtenemos los elementos
    const userNameInput = document.querySelector('#userName');
    const emailInput = document.querySelector('#email');
    const passwdInput = document.querySelector('#passwd');
    const btnSend = document.querySelector('#btnSend');

    //Creamos un objeto donde se guardaran los datos del usuario
    const userRegister = {
        userName,
        email,
        passwd
    }

    //Le agregamos un evento a los inputs y al boton de registrarse
    userNameInput.addEventListener('input', validate);
    emailInput.addEventListener('input', validate);
    passwdInput.addEventListener('input', validate);
    btnSend.addEventListener('click', sendForm);

    //Funcion que toma el valor del input y lo agrega al objeto
    function validate(e){
        userRegister[e.target.name] = e.target.value.trim();
    }

    //Funcion que envia el formulario a la base de datos
    function sendForm  (e) {
        e.preventDefault();

        //Hacemos destructuring del objeto userRegistrer
        const {userName, email, passwd} = userRegister;

        //Enviamos los datos obtenidos
        axios({
            method : 'post',
            url : 'http://localhost:3000/login',
            data : {
                userName,
                email,
                passwd
            }
        }).then(function(res){
            console.log(res);
        }).catch(function(err){
            console.log(err);
        })

        //Reiniciamoe le objeto despues de 2 segundos
        setTimeout(() => {
            userRegister.userName = '';
            userRegister.email = '';
            userRegister.passwd = '';
        }, 2000);
    }
});