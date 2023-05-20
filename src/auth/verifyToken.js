const jwt = require('jsonwebtoken')
const config = require('../config')


/**
 * La función verifyToken actua com o lun middleware para verificar
 * la autenticación del usuario mediante un token de acceso
 */
function verifyToken(req, res, next){
  // Extrae el token de acceso del encabezado con la clave 'x-access-token'
  const token = req.headers['x-access-token'];

  // Si no se proporcionó ningun token, se devolverá un estado 401
  if(!token){
    return res.status(401).json({
      // tambien se devuelve un objeto json
      auth: false,
      message: 'No token provided'
    });
  }

  // Verifica la validez del token utilizando la función verify()
  // Se usa clave secreta "config.secret" para verificar la firma del token y decodificarlo
  const decoded = jwt.verify(token, config.secret);
  
  // Asigna el ID del usuario extraído del token decodificado (decoded.id) a la propiedad userId del objeto req, permite que otros controladores o middlewares accedan al ID del usuario autenticado.
  req.userId = decoded.id;


  // next() para pasar el control al siguiente middleware en la cadena de manejo de solicitudes.
  next();

}


module.exports = verifyToken;