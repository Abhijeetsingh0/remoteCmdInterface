// ServerForm.js
import React, { useState } from 'react';
import './addServer.css'
import { useHistory } from 'react-router-dom';

const AddServerForm = () => {
  const [formData, setFormData] = useState({
    serverName: '',
    host: '',
    userName: '',
    password: '',
  });

  const history = useHistory();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming you have an API endpoint to send the data to
    const apiUrl = 'http://localhost:8001/servers';
    // console.log(formData)

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('Server data sent:', data);
        // Handle the response as needed
        history.push("/servers")
      })
      .catch((error) => {
        console.log("Error:",error)
        alert(`An error ${error.message}. Redirecting to home page.`);
        history.push("/");
      });
  };

  return (
    <div className="form-ind server-form-container">
      <label><h2>Fill the Server Information</h2></label>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="serverName">Server Name:</label>
          <input
            type="text"
            id="serverName"
            name="serverName"
            value={formData.serverName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="host">Hostname:</label>
          <input
            type="text"
            id="host"
            name="host"
            value={formData.host}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="userName">Username:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Server</button>
      </form>
    </div>
  );
}

export default AddServerForm;