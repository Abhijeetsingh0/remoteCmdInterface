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
        console.log("Error:",error)
        alert(`An error ${error.message}. Redirecting to home page.`);
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
        console.log("Error:",error)
        alert(`An error ${error.message}. Redirecting to home page.`);
        history.push("/");
      });
  }, [serverName,history]);

//   console.log(typeof(serverData))
  const arrayData = []
  for(let i = serverData.length-1 ; i >= 0 ; i--){
    arrayData.push(serverData[i])
  }

  const RunCommandOnServerTrigger = () =>{
    history.push({
        pathname: "/commandOnServer",
        state: { data: serverDetails },
      });
  }

    const stringSpliterForSu = (inputText) =>{
        const parts = inputText.split('-S');
        if (parts.length === 2) {
          const txt1 = parts[0].trim() + '-S';
          const txt2 = parts[1].trim();       
          console.log("txt1:", txt1);
          console.log("txt2:", txt2);
          return [txt1, txt2]
        } else {
          return inputText
        }
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
                  command run is <cite title="Source Title">{stringSpliterForSu(item["command"]).length === 2 ? stringSpliterForSu(item["command"])[1] : item.command }</cite>
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
