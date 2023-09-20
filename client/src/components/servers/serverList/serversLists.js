// ServerList.js
import React, { useState, useEffect } from 'react';
import "./serversList.css"
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';


function ServerList() {
  const [servers, setServers] = useState([]);
  const history = useHistory();

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
        // Handle the response as needed
        setServers(data)
      })
      .catch((error) => {
        console.log("Error:",error)
        alert(`An error ${error.message}. Redirecting to home page.`);
        history.push("/");
      })
  }, [history,servers]);

  const deleteServer = (id) => {
      const apiUrl = `http://localhost:8001/servers/${id}`
      fetch(apiUrl,{
        method : "DELETE",
        headers:{
          'Content-Type' : 'appplication/json',
        },
      }).then((response)=>response.json())
      .then((data)=>{
        alert(`ID: ${id} is deleted`)
      }).catch((error)=>{
        console.log("Error:",error)
        alert(`An error ${error.message}. Redirecting to home page.`);
        history.push("/");
      })
  }

  return (
    <div>
      <h1>Server List</h1>
      <table>
        <thead>
          <tr>
            <th>Server Name</th>
            <th>Host</th>
            <th>User Name</th>
            <th>GoTo</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {servers.map((server, index) => (
            <tr key={index}>
              <td>{server.serverName}</td>
              <td>{server.host}</td>
              <td>{server.userName}</td>
              <td> <Link to={`/command/server/${server.serverName}`} > <Button variant="primary">Click</Button></Link></td>
              <td> <Button variant="outline-danger" onClick={()=>deleteServer(server._id)}> Delete </Button> </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ServerList;
