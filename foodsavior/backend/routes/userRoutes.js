const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Auth routes
router.post('/register', userController.register);
router.post('/login', userController.login);

// CRUD routes for user
router.get('/getAllUsers', userController.getAllUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);



// Example hardcoded user data (replace with DB call)
const dummyUser = {
  name: 'Supriya',
  email: 'supriyanayek42@gmail.com',
  password: 'yourPassword' // Ideally, you'd hash passwords!
};

// POST /api/users/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Simulate user lookup
  if (email === dummyUser.email && password === dummyUser.password) {
    res.json({
      success: true,
      user: {
        name: dummyUser.name,
        email: dummyUser.email
      }
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});




module.exports = router;