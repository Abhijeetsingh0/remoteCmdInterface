// ServerList.js
import React, { useState, useEffect } from 'react';
import "./serversList.css"
import { Link, useHistory } from 'react-router-dom';
import { Button,Container } from 'react-bootstrap';
import { BACKEND_URL } from '../../../variable';

function ServerList() {

  

  const [servers, setServers] = useState([]);
  const [deleted, setDeleted] = useState(0)
  const history = useHistory();

  useEffect(() => {
    // console.log(BACKEND_URL)
    const apiUrl = `${BACKEND_URL}/servers`;
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
  }, [history,deleted]);

  const deleteServer = (id,serverName) => {
      const apiUrl = `${BACKEND_URL}/servers/${id}/${serverName}`
      fetch(apiUrl,{
        method : "DELETE",
        headers:{
          'Content-Type' : 'appplication/json',
        },
      }).then((response)=>response.json())
      .then((data)=>{

        alert(`ID: ${id} is deleted`)
        // const updatedServers = servers.filter((server) => server.id !== id);
        // setServers(updatedServers);
        setDeleted(deleted+1)

      }).catch((error)=>{
        console.log("Error:",error)
        alert(`An error ${error.message}. Redirecting to home page.`);
        history.push("/");
      })
  }

  return (
    <div>
      <h1>Server List</h1>
      <Container>
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
                <td> <Button variant="outline-danger" onClick={()=>deleteServer(server._id,server.serverName)}> Delete </Button> </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Container>
    </div>
  );
}

export default ServerList;
