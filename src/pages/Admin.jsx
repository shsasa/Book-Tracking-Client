import UserCard from '../components/UserCard';
import { useState, useEffect } from 'react';
import { getAllUsers } from '../services/User';
const Admin = () => {

  const [users, setUsers] = useState([]);




  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await getAllUsers();
        setUsers(userList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);


  return (
    <div className="admin-page">
      <h1>Admin Page</h1>
      <p>This is the admin page where you can manage the application.</p>
      {users.length > 0 ? (
        <div className="user-list">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}


export default Admin;