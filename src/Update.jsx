import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const UpdateUsers = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const response = await axios.patch(`https://crud-server-1-2fgr.onrender.com/api/items/${id}`, {
        userName: name,
        email: email,
        password: 'root'
      });
      console.log(response.data);
      navigate('/'); // Navigate to the home page after a successful update
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="wrapper">
      <button className='back' onClick={() => navigate('/')}>Back</button>
      <div className="card card1">
        <h1>Editor</h1>
        <form onSubmit={UpdateUsers}>
          <input
            type="email"
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder='Name'
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button type='submit'>Edit</button>
        </form>
      </div>
    </div>
  );
};

export default Update;
