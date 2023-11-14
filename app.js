const morgan = require("morgan");
const express = require("express");
const app = express();

// rutas
const signin = require("./routes/signin");
const login = require("./routes/login");
const auth = require("./middleware/auth");
const main = require("./routes/main");
const habits = require("./routes/habits");
const habit = require('./routes/habit');
const user = require("./routes/user");

// middleware
const cors = require("./middleware/cors");
const notFound = require("./middleware/notFound");

app.use(cors);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Uso de rutas
app.use("/login", login);
app.use("/signin", signin);
app.use(auth);
app.use("/main", main);
app.use("/habits", habits);
app.use("/habit", habit);
app.use("/user", user);
app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running in port 3000");
});
