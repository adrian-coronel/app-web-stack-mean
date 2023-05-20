const {Router} = require('express');
const router = Router();

const Product = require('../models/Product');


// CREATE
router.post('/products', async (req, res) => {
  const {
    name, price,   
    description, stock
  } = req.body;

  const product = new Product({
    name, price,   
    description, stock
  });

  await product.save();

  res.json(200,{save: true, message: "The Product was created successfully"})
});


// READ
router.get('/products', async (req, res) => {
  const products = await Product.find({},{createdAt:0});

  if(!products){
    return res.status(401).send("An error occurred");
  }

  res.json(products);
});

// UPDATE
router.put('/products/:_id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params._id, req.body);
  res.json(product);
});


// DELETE
router.delete('/products/:_id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params._id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json({ message: 'Product deleted successfully' });
});

module.exports = router