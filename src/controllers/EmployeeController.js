const {Router} = require('express');
const router = Router();


const Employee = require('../models/Employee');


// CREATE
router.post('/employees', async (req, res) => {
  const {
    name, lastname, email, 
    specialty, phoneNumber, state
  } = req.body;

  const employee = new Employee({
    name, lastname, email, 
    specialty, phoneNumber, state
  });

  await employee.save();

  res.json(200,{save: true, message: "The employee was created successfully"})
});


// READ
router.get('/employees', async (req, res) => {
  const employees = await Employee.find({state:true},{state:0,createdAt:0});

  if(!employees){
    return res.status(401).send("An error occurred");
  }

  res.json(employees);
});

// UPDATE
router.put('/employees/:_id', async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params._id, req.body);
  res.json(employee);
});


// DELETE
router.delete('/employees/:_id', async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params._id, {state: false});

  if (!employee) {
    return res.status(404).json({ message: 'Employee not found' });
  }

  return res.status(200).json({ message: 'Employee deleted successfully' });
});

module.exports = router