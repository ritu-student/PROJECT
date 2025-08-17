import React, { useState } from 'react';
import axios from 'axios';

export default function AddFoodPost({ onPostAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');

  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return alert('Please login first');

    try {
      await axios.post(
        'http://localhost:5000/api/foodposts',
        { title, description, quantity, location },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Food post created successfully!');
      setTitle('');
      setDescription('');
      setQuantity('');
      setLocation('');

      if (onPostAdded) onPostAdded();
    } catch (err) {
      console.error(err);
      alert('Failed to create post');
    }
  };

  return (
    <div>
      <h2>Add Food Post</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required /><br />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} /><br />
        <input type="text" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} /><br />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} /><br />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
}