const { Schema, model} = require('mongoose');

employeeSchema = new Schema(
  {
    name:        String ,
    lastname:    String ,
    email:       String ,  
    specialty:   String ,
    phoneNumber: String ,
    state:       Boolean
  },
  {
    timestamps:true
  }
);


module.exports = model('Employee', employeeSchema);