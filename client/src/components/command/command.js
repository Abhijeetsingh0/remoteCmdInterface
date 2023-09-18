import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const CommandPage = (props) => {
  const { serverName } = props.match.params;
  const [serverData, setServerData] = useState([]); // Initialize as an empty array
  const [serverDetails, setServerDetails] = useState({});

  useEffect(() => {
    const apiUrl = `http://localhost:8001/command/server/${serverName}`;
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setServerData( Object.values(data)); // Now serverData is an array
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [serverName]);

  useEffect(() => {
    const apiUrl = `http://localhost:8001/servers/${serverName}`;
    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setServerDetails(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [serverName]);

  console.log(typeof(serverData))
  console.log(serverData)

  return (
    <div>
      <h1>
        <Button>Run command on the server</Button>
      </h1>
    </div>
  );
};

export default CommandPage;
