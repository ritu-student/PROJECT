const express = require('express');
const router = express.Router();
const foodPostController = require('../controllers/foodPostController');
const { verifyToken } = require('../middlewares/authMiddleware');

// Create food post → only logged in users!
router.post('/', verifyToken, foodPostController.createFoodPost);

// Get all food posts
router.get('/', foodPostController.getAllFoodPosts);

// Update food post
router.put('/:id', foodPostController.updateFoodPost);

// Delete food post
router.delete('/:id', foodPostController.deleteFoodPost);

module.exports = router;