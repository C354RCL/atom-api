document.addEventListener('DOMContentLoaded', function(){
    const userName = localStorage.getItem('userName');
    axios
        .get("http://localhost:3000/habits")
        .then((res) => {
            crearHbaitos(res.data);
            addEvent(); 
        }).catch((err) => {
            console.log(err);
        })
    
    //Funcion que crea cada DIV a base de la respuesta obtenida
    const divHabitos = document.querySelector('#habitos');
    function crearHbaitos(data){
        //Recorremos el arreglo
        data.forEach(e => {
            const divHabito = document.createElement('DIV');
            const titulo = document.createElement('p');
            titulo.textContent = e.habitName;
            const btnAgregar = document.createElement('button');
            btnAgregar.textContent = 'AGREGAR';
            btnAgregar.id = `btnAgregar-${e.habitId}`;
            btnAgregar.className = 'btnAgregar';
            divHabito.appendChild(titulo);
            divHabito.appendChild(btnAgregar);
            divHabitos.appendChild(divHabito);
        });
    }

    // function addEvent(){
    //     const btnsAgregar = document.querySelectorAll('.btnAgregar');
    //     console.log(btnsAgregar);
    //     btnsAgregar.forEach((e, i) => {
    //         e.addEventListener('click', function(){
    //             console.log("Hiciste click en el boton no.", e.id);
    //         })
    //     });
    // }
    
    function getBtns(){
        return new Promise((resolve, reject) => {
            const btnsAgregar = document.querySelectorAll('.btnAgregar');
            if(btnsAgregar.length == 0){
                reject(new Error("No hay botones"));
            }
            resolve(btnsAgregar);
        });
    }

    async function addEvent(){
        const btnsAgregar = await getBtns();
        btnsAgregar.forEach(e => {
            e.addEventListener('click', function(){
                // console.log("Diste click en el boton", e.id);
                const habitId = e.id.slice(11);
                console.log(habitId);
                axios({
                    method : 'post',
                    url : 'http://localhost:3000/habits',
                    data : {
                        userName,
                        habitId
                    }
                }).then(function(res){
                    console.log(res);
                }).catch(function(err){
                    console.log(err);
                })
            });
        });
    } 

    
});