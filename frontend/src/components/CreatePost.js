import React, { useState } from 'react';
import axios from 'axios';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');

  const handleCreate = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post(
        'http://localhost:5000/api/foodposts',
        { title, description, quantity, location },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Post created!');
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert('Error creating post');
    }
  };

  return (
    <div>
      <h2>Create Food Post</h2>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} /><br/>
      <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} /><br/>
      <input placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} /><br/>
      <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} /><br/>
      <button onClick={handleCreate}>Create Post</button>
    </div>
  );
}