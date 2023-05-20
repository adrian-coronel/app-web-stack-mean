// Se importa la clase Router
const { Router } = require('express');
const router = Router(); // se crea una instancia de la clase


const jwt = require('jsonwebtoken');
const config = require('../config');
const verifyToken = require('../auth/verifyToken');

const User = require('../models/User');

router.post('/signup', async (req, res, next) => {
  // Extrae las propiedades del cuerpo de la solicitud, espera que contenga los datos del usuario
  const {username, email, password } = req.body;
  // crea un objeto con los valores proporcionados
  const user = new User(
    {
      username,
      email,
      password
    } 
  );

  // console.log(username, email, password);

  // hace un hash a la contraseña con la función encryptPassword()
  user.password = await user.encryptPassword(user.password);
  // guarda el objeto en la base de datos
  await user.save();

  // Genera un token de autenticación que contendrá el ID del usuario
  const token = jwt.sign({id: user._id}, config.secret, {// se firma con la clave secreta "config.secret"
    expiresIn: 60 * 60 * 24 // El token expirará en 1 día (60 * 60 * 24 segundos).
  });

  // Devuelve una respuesta JSON al cliente
  res.json({auth: true, token});
  /**
   * Esto indica que el registro fue exitoso y se incluye el token de autenticación 
   * para que el cliente pueda utilizarlo en las futuras solicitudes.
   */
});


// verifyToken(Middleware) verifica la atutenticación del usuario utilizando el token de aunteticación
router.get('/me', verifyToken, async (req, res, next) => {

  // pasando el id del usuario extraído del token, retorna los datos del usuario excluyendo su contraseña,
  const user = await User.findById(req.userId, { password: 0 });
  
  // Si no existe el usuario se devuelve una respuesta de estad 404
  if(!user) return res.status(404).send('No user found...!!!');
  
  // enviamos el usuario en formato json
  res.json(user);

  //sendFile() se utiliza archivos staticos al cliente
  // res.sendFile(`${__dirname}../public/dashboard.html`);
});


// Al ingresar a la ruta /register se devolverá el archivo register.html
router.get('/register', (req, res, next) => {
  res.sendFile(`C:/Users/Adrian/Escritorio/BDA/BDA-Class08/prueba08/src/public/register.html`);
}); 


router.get('/login', (req, res, next) => {
  res.sendFile(`C:/Users/Adrian/Escritorio/BDA/BDA-Class08/prueba08/src/public/login.html`)
});


router.post('/signin', async (req, res, next) => {

  // se extrae las propiedades email y password, que se espera que req.body contenga
  const { email, password } = req.body;

  // Busca en la bd el usuario qeu tenga el mismo "email"
  const user = await User.findOne({email: email});

  // Si no existe el usuario se devuelve una respuesta de estad 404
  if(!user){ return res.status(404).send('The user doen´t exists');}

  // compara la contraseña con el hash de la contraseña almacenada en la base de datos 
  const validPassword = await user.validatePassword(password); // retorna booleano
  
  // si la contraseña no es valida, devuelve un estado 401, indicando que la autenticación fallo
  if(!validPassword){ return res.status(401).json({auth: false, token: null});}

  // Genera un token de autenticación que contiene el ID y se firma con la clave secreta "config.secret" del archivo config.js
  const token = jwt.sign({id: user._id}, config.secret, {
    //El token expirará en 1 día (60 * 60 * 24 segundos).
    expiresIn: 60 * 60 * 24
  });

  // Se envia una respuesta que indica que la autenticación fue exitosa y se incluye el token de autenticación para que el cliente pueda utilizarlo en las futuras solicitudes.
  res.json({auth: true, token});
});


// verifyToken se asegura que el token sea valido antes de continuar con la ejecución del controlador
router.get('/dashboard', verifyToken, (req, res, next) => {

  // La función simplemente devuelve una respuesta JSON con el mensaje "dashboard".
  res.json('dashboard');
});


module.exports = router;





