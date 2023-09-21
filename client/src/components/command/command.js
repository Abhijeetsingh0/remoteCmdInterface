import React, { useState, useEffect } from "react";
import { Button,Card,ListGroup } from "react-bootstrap";
import "./command.css"
import {useHistory} from "react-router-dom"
import Offcanvas from 'react-bootstrap/Offcanvas';
import Table from 'react-bootstrap/Table';
import { BACKEND_URL } from "../../variable";


// import { Link } from "react-router-dom/cjs/react-router-dom.min";

    const OffCanvasExample = ({ name, outPut,date ,id ,...props }) => {
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        // console.log(date)
        const formattedDate = (new Date(date)).toLocaleString();

        // console.log(id)
        var command = name.replace(/ > \/tmp\/log.txt && cat \/tmp\/log.txt && > \/tmp\/log.txt/g, '');
        // command = command.replace(/log.txt/g, '')
        // command = command.replace(/>/g, '')
        // command = command.replace(/cat/g, '')
      


        return (
          <div >
              <div className="center-div" >
                <Button  variant="outline-info" size="lg" onClick={handleShow} style={{marginTop:'10px'}}>
                  -command: "<b>{command}</b>"| Date and Time : {formattedDate}
                </Button>
              </div>
            
           
            <Offcanvas show={show} onHide={handleClose} {...props}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title><b>{command}</b></Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <pre>
                    {outPut}
                </pre>
              </Offcanvas.Body>
            </Offcanvas>
          </div>
        );
    }

const CommandPage = (props) => {
  const { serverName } = props.match.params;
  const [serverData, setServerData] = useState([]); // Initialize as an empty array
  const [serverDetails, setServerDetails] = useState({});
  const history = useHistory()

  useEffect(() => {
    const apiUrl = `${BACKEND_URL}/command/server/${serverName}`;
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
    const apiUrl = `${BACKEND_URL}/servers/${serverName}`;
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
          // console.log("txt1:", txt1);
          // console.log("txt2:", txt2);
          return [txt1, txt2]
        } else {
          return inputText
        }
    }

  return (
    <div>
        <h1 className="marginHead">
        <Button onClick={RunCommandOnServerTrigger} variant="primary" size="lg" >Run command on the server</Button>
        </h1>

        <span/>
        <div className="serverDetails" style={{ display: 'flex', justifyContent: 'center' }}>
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

        <Card>
        <Table >
          <thead>
            <tr>
              <th style={{textAlign:'center'}}>click on below buttons to get the output also</th>
            </tr>
          </thead>
        </Table>
        {arrayData.map((item,index)=>(
            <div key={index}>
                <Table >
                    <thead>
                      <tr>
                        <th><OffCanvasExample key={index} placement="start" name={stringSpliterForSu(item.command).length === 2 ? stringSpliterForSu(item["command"])[1] : item.command } command={item.command} outPut={item.outPut} date={item.createdAt} id={item._id}/></th>
                      </tr>
                    </thead>
                </Table>
            </div>
        ))}
        </Card>
       
    </div>
  );
};

export default CommandPage;
