import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Users = () => {
  const [user, setUser] = useState([]);
  const [page1, setPage1] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const getUsers = async () => {
    await axios
      .get('https://crud-server-1-2fgr.onrender.com/api/items')
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const CreateUsers = async () => {
    await axios
      .post('https://crud-server-1-2fgr.onrender.com/api/items', {
        email: email,
        userName: name,
        password: 'root'
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload()
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteUser = async (user_id) => {
    try {
      await fetch(`https://crud-server-1-2fgr.onrender.com/api/items/${user_id}`, {
        method: 'DELETE'
      });
      // Refetch the users after a successful delete operation
      await getUsers();
      alert(`User with ID ${user_id} deleted successfully`);
    } catch (error) {
      alert(`Error deleting user: ${error}`);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="wrapper2">
        <h2 className={page1 ? 'left active' : 'left'} onClick={() => setPage1(true)}>Get Users</h2>
        <h2 className={!page1 ? 'right active' : 'right'} onClick={() => setPage1(false)}>Create User</h2>
      </div>
      {page1 ? (
        <div className="wrapper">
        <h1>Users</h1>
        {user.map((el) => (
          <Link to={`/user/${el?._id}`} className="card" key={el._id}>
            <b>{el.userName}</b>
            <b>{el.email}</b>
            <button onClick={() => deleteUser(el._id)}>Delete</button>
          </Link>
        ))}
      </div>
      ) : (
        <div className="wrapper">
          <div className="card card1">
            <h1>Create User</h1>
            <form onSubmit={CreateUsers}>
              <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required/>
              <input type="text" placeholder='Name' onChange={(e) => setName(e.target.value)} required/>
              <button type='submit'>Create</button>
            </form>
          </div>
    </div>
      )}
    </>
  );
};

export default Users;
