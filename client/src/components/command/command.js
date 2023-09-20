import React, { useState, useEffect } from "react";
import { Button,Card,ListGroup } from "react-bootstrap";
import "./command.css"
import {useHistory} from "react-router-dom"
// import { Link } from "react-router-dom/cjs/react-router-dom.min";

const CommandPage = (props) => {
  const { serverName } = props.match.params;
  const [serverData, setServerData] = useState([]); // Initialize as an empty array
  const [serverDetails, setServerDetails] = useState({});
  const history = useHistory()

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
        setServerData(data.data); // Now serverData is an array
      })
      .catch((error) => {
        console.error("Error:", error);
        // Show an alert message
        alert("An error occurred. Redirecting to home page.");
        // Redirect to the home page
        history.push("/");
      });
  }, [serverName,history]);

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
        setServerDetails(data[0]);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Show an alert message
        alert("An error occurred. Redirecting to home page.");
        // Redirect to the home page
        history.push("/");
      });
  }, [serverName,history]);

//   console.log(typeof(serverData))
  const arrayData = []
  for(let i = 0 ; i < serverData.length ; i++){
    arrayData.push(serverData[i])
  }

  const RunCommandOnServerTrigger = () =>{
    history.push({
        pathname: "/commandOnServer",
        state: { data: serverDetails },
      });
  }

  return (
    <div>
        <h1>
        <Button onClick={RunCommandOnServerTrigger} variant="outline-success">Run command on the server</Button>
        </h1>

        <span/>
        <div className="serverDetails">
        <Card style={{ width: '18rem' }}>
            <Card.Header>Name: {serverDetails.serverName}</Card.Header>
            <ListGroup variant="flush">
                <ListGroup.Item>Host: {serverDetails.host}</ListGroup.Item>
                <ListGroup.Item>User: {serverDetails.userName}</ListGroup.Item>
                <ListGroup.Item>ID: {serverDetails._id}</ListGroup.Item>
             </ListGroup>
        </Card>
        </div>
        <span/>

        {arrayData.map((item,index)=>(
            <div key={index}>
            <Card>
            <Card.Header>Here date and time will come</Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <pre>
                  {' '}
                  {item["outPut"]}
                  {' '}
                </pre>
                <footer className="blockquote-footer">
                  command run is <cite title="Source Title">{item["command"]}</cite>
                </footer>
              </blockquote>
            </Card.Body>
          </Card>
            </div>
        ))}
       
    </div>
  );
};

export default CommandPage;
