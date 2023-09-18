// ServerList.js
import React, { useState, useEffect } from 'react';
import "./serversList.css"
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


function ServerList() {
  const [servers, setServers] = useState([]);


  useEffect(() => {
    const apiUrl = 'http://localhost:8001/servers';
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Server data sent:', data);
        // Handle the response as needed
        setServers(data)
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }, []);

  return (
    <div>
      <h1>Server List</h1>
      <table>
        <thead>
          <tr>
            <th>Server Name</th>
            <th>Host</th>
            <th>User Name</th>
            <th>Password</th>
            <th>GoTo</th>
          </tr>
        </thead>
        <tbody>
          {servers.map((server, index) => (
            <tr key={index}>
              <td>{server.serverName}</td>
              <td>{server.host}</td>
              <td>{server.userName}</td>
              <td>{server.password}</td>
              <td> <Link to={`/command/${server._id}`} > <Button variant="primary">Click</Button></Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServerList;
