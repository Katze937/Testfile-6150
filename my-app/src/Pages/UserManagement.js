import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserManagement.css';

function UserManagement() {
    
  const [customers, setCustomers] = useState([
    { id: 1, email: 'customer1@example.com', password: 'password123', deleted: false },
    { id: 2, email: 'customer2@example.com', password: 'password456', deleted: false },
  ]);
  const [staffs, setStaffs] = useState([
    { id: 1, email: 'staff1@example.com', password: 'password789', deleted: false },
    { id: 2, email: 'staff2@example.com', password: 'password101', deleted: false },
  ]);

  const handleAdd = (users, setUsers) => {
    const newId = users.length ? Math.max(...users.map((user) => user.id)) + 1 : 1;
    const newUser = { id: newId, email: '', password: '', deleted: false, editing: true };
    setUsers([...users, newUser]);
  };

  const handleEditToggle = (users, setUsers, id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, editing: !user.editing } : user
      )
    );
  };

  const handleSaveField = (users, setUsers, id, field, value) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, [field]: value } : user
      )
    );
  };

  const handleDelete = (users, setUsers, id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, deleted: !user.deleted } : user
      )
    );
  };
  const navigate = useNavigate();
  const renderTable = (users, setUsers, title) => (
    <div className="user-table">
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className={user.deleted ? 'deleted-row' : ''}>
              <td>{user.id}</td>
              <td>
                {user.editing ? (
                  <input
                    type="text"
                    value={user.email}
                    onChange={(e) =>
                      handleSaveField(users, setUsers, user.id, 'email', e.target.value)
                    }
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {user.editing ? (
                  <input
                    type="text"
                    value={user.password}
                    onChange={(e) =>
                      handleSaveField(users, setUsers, user.id, 'password', e.target.value)
                    }
                  />
                ) : (
                  user.password
                )}
              </td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEditToggle(users, setUsers, user.id)}
                >
                  {user.editing ? 'Save' : 'Edit'}
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(users, setUsers, user.id)}
                >
                  {user.deleted ? 'Undo' : 'Delete'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="add-button"
        onClick={() => handleAdd(users, setUsers)}
      >
        Add {title.split(' ')[0]}
      </button>
      
    </div>
  );

  return (
    <div className="user-management-container">
      <h1 className="user-management-title">User Management</h1>
      <button 
        className="order-management-button"
        onClick={() => navigate('/ordermanagement')}
        >
        Order Management
        </button>
      {renderTable(customers, setCustomers, 'Customer Management')}
      {renderTable(staffs, setStaffs, 'Staff Management')}
    </div>
  );
}

export default UserManagement;
