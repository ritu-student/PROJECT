const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const foodPostRoutes = require('./routes/foodPostRoutes'); // ✅ Import your FoodPost routes
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Middleware to parse JSON
app.use(express.json());

// ✅ Routes
app.use('/api/users',require('./routes/userRoutes'));
app.use('/api/foodposts', foodPostRoutes); // ✅ Register FoodPost routes

// ✅ DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  // Start server only after DB connects
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => console.error('DB connection error:', err));