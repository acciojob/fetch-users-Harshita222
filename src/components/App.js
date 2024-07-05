import React, { useState } from 'react';
import axios from 'axios';
import UserTable from './UserTable';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://reqres.in/api/users');
      setUsers(response.data.data);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>User List</h1>
      <button className="btn" onClick={fetchUsers}>Get User List</button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && users.length === 0 && <p>No users available</p>}
      {!loading && !error && users.length > 0 && <UserTable users={users} />}
    </div>
  );
};

export default App;
