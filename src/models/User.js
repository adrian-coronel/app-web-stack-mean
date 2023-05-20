// Se importa el objeto Schema y model, desde la librería mongoose
const { Schema, model} = require('mongoose');
// se importa la librería bcriptjs
const bcrypt = require('bcryptjs');

/* Schema permite especificar los campos y sus tipos presentes en 
los documentos de una coleccion en MongoDB */
const userSchema = new Schema({
  username: String,
  email: String,
  password: String
});

/* "encryptPassword": Es una función que se agrega al esquema userSchema 
 * y se utiliza para realizar el proceso de hash de una contraseña. */
userSchema.methods.encryptPassword = async (password) => { 
// async indica que la funcion es asíncrona y permite usar el operador "await" dentro de ella

  // await pausa la ejecución de la función en espera de una promesa, en este caso al de "genSalt(10)"
  const salt = await bcrypt.genSalt(10);// genera un salt(valor aleatorio unico) con un factor de "costo" de 10.

  // toma la contraseña y el salt generado y realiza el hash(lo transforma en una cadena única irreversible)
  return bcrypt.hash(password, salt);
};


//validatePassword definida en userSchema se utiliza para validar una contraseña ingresada por el usuario
userSchema.methods.validatePassword = function (password) {
  //compará la contraseña ingresada con el hash almacenado(this.password)
  return bcrypt.compare(password, this.password); // retorna un boleano
}

module.exports = model('User', userSchema);