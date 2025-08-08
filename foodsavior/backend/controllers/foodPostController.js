const FoodPost = require('../models/foodPost');

// Create a new food post
exports.createFoodPost = async (req, res) => {
  try {
    const { title, description, quantity, location, donor } = req.body;

    const post = new FoodPost({ title, description, quantity, location, donor });
    await post.save();

    res.status(201).json({ message: 'Food post created', post });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all food posts
exports.getAllFoodPosts = async (req, res) => {
  try {
    const posts = await FoodPost.find().populate('donor', 'name email');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update a food post
exports.updateFoodPost = async (req, res) => {
  try {
    const updatedPost = await FoodPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPost) return res.status(404).json({ message: 'Post not found' });

    res.json({ message: 'Food post updated', updatedPost });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete a food post
exports.deleteFoodPost = async (req, res) => {
  try {
    const deleted = await FoodPost.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Post not found' });

    res.json({ message: 'Food post deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};