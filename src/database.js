const mongoose = require('mongoose');

// Nos conectamos a MongoDB usando mongoose
mongoose.connect('mongodb://127.0.0.1:27017/simplejwt',{

  useNewUrlParser: true, // Analiza correctamente la cadena de conexión
  useUnifiedTopology: true // abilita el nuevo motor de topología unificada para la conexión.

}).then(db => console.log('Database is connected'));
// then() se utiliza para manejar el caso de éxito de una promesa
