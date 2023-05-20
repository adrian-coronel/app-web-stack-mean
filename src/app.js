const express = require('express');
const app = express();

//Indico que se usará json
app.use(express.json());
// Middleware para analizar los datos codificados en URL de las solicitudes entrantes y hacerlos accesibles en req.body
app.use(express.urlencoded({extended: false}));

app.use(require('./controllers/authController'));
app.use(require('./controllers/EmployeeController'));
app.use(require('./controllers/ProductController'));
//Este modulo se exportará como una libreria con el método "app"
module.exports = app;

