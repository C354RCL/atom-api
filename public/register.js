document.addEventListener('DOMContentLoaded', function(){
    const userNameInput = document.querySelector('#userName');
    const emailInput = document.querySelector('#email');
    const passwdInput = document.querySelector('#passwd');

    const userRegister = {
        userName,
        email,
        passwd
    }

    userNameInput.addEventListener('input', validate);
    emailInput.addEventListener('input', validate)
    passwdInput.addEventListener('input', validate)

    function validate(e){
        userRegister[e.target.name] = e.target.value.trim();
        console.log(userRegister);
    }
});