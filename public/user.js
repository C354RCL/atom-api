document.addEventListener('DOMContentLoaded', function(){
    const userName = localStorage.getItem('userName');
    axios({
        method : 'post',
        url : 'http://localhost:3000/user',
        data: {
            userName
        }
        }).then(function(res){
            console.log(res.data);
        });
});