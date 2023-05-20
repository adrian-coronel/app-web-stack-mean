const { Schema, model} = require('mongoose');


productSchema = new Schema({
  name:         { type:String, required:true },
  price:        { type:Number, required:true },
  description:  { type:String, required:true },  
  stock:        { type:Number, required:true }
},
{
  timestamps:true
});


module.exports = model('Product', productSchema);