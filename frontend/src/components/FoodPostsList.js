import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function FoodPostsList() {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');
  const loggedInUserId = localStorage.getItem('userId');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/foodposts');
      setPosts(res.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching posts');
    }
  };

  const handleDelete = async (id) => {
    if (!token) return alert('Please login first');
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/foodposts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Post deleted successfully');
      fetchPosts();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    }
  };

  return (
    <div>
      <h2>Available Food Posts</h2>
      {posts.length === 0 ? (
        <p>No food posts available at the moment.</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <p><strong>Quantity:</strong> {post.quantity}</p>
            <p><strong>Location:</strong> {post.location}</p>
            <p><strong>Status:</strong> {post.status}</p>
            <p><strong>Donor:</strong> {post.donor?.name || 'Unknown'}</p>
            {post.donor && post.donor._id === loggedInUserId && (
              <div>
                <button onClick={() => alert('Edit coming soon')}>Edit</button>
                <button onClick={() => handleDelete(post._id)} style={{ color: 'red', marginLeft: '5px' }}>Delete</button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}