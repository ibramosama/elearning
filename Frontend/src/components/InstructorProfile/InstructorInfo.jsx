import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import './InstructorInfo.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    phone_number: '',
    image: null,
    password: ''
  });
  const token = localStorage.getItem('access');

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:8000/user/profile/', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setUser(data);
      setFormData({
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        email: data.email,
        phone_number: data.phone_number
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('first_name', formData.first_name);
      formDataToSend.append('last_name', formData.last_name);
      formDataToSend.append('username', formData.username);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone_number', formData.phone_number);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }
      if (formData.password) {
        formDataToSend.append('password', formData.password);
      }

      const response = await fetch('http://localhost:8000/user/profile/', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (response.ok) {
        setEditMode(false);
        // Refresh the user profile
        fetchUserProfile();
      } else {
        console.error('Failed to update profile:', response);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  return (
    <div className="user-profile">
      {user ? (
        <div>
          <div className="profile-header">
            {user.image && (
              <Avatar className="avatar" alt="Profile Picture" src={user.image} />
            )}
            <div className="profile-info">
              <h2>{user.first_name} {user.last_name}</h2>
              <p>{user.username}</p>
            </div>
          </div>
          {editMode ? (
            <div className="profile-edit-form">
              <label>First Name:</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
              />
              <label>Last Name:</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
              />
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <label>Phone Number:</label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
              />
              <label>Profile Image:</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
              <button className="save-button" onClick={handleUpdateProfile}>
                Save
              </button>
              <button className="cancel-button" onClick={() => setEditMode(false)}>
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <p>Email: {user.email}</p>
              <p>Phone Number: {user.phone_number}</p>
              <button className="update-button" onClick={() => setEditMode(true)}>
                Update Profile
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </div>
  );
};

export default UserProfile;
