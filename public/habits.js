document.addEventListener('DOMContentLoaded', function(){
    axios
        .get("http://localhost:3000/habits")
        .then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
});