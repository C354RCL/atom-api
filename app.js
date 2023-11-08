const morgan = require("morgan");
const express = require("express");
const app = express();
const auth = require("./middleware/auth");

//rutas
const signin = require("./routes/signin");
const login = require("./routes/login");
const main = require("./routes/main");
const habits = require("./routes/habits");
const user = require("./routes/user");

//middleware
const cors = require("./middleware/cors");
const notFound = require("./middleware/notFound");

app.use(cors);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Demas rutas
app.use("/login", login);
app.use("/signin", signin);
app.use("/main", main);
app.use("/habits", habits);
app.use("/user", user);

//Middleware de autentificacion

//Ruta protegida
// app.get('/main.html', (req, res) => {
//     if (req.isAuthenticated()) {
//         //Creamos la ruta principal
//         const completeRoute = path.join(__dirname, '../public/index.html');
//         //Enviamos el archivo principal
//         res.sendFile(completeRoute);
//     } else {
//         // El usuario no está autenticado, redirige a la página de inicio de sesión
//         res.redirect('/login.html');
//     }
//   });

//Ruta si la url no es valida
app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running in port 3000");
});
