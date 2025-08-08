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

module.exports = router;