import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { BACKEND_URL } from "../../variable";
import { Button, Container} from "react-bootstrap";
import { Offcanvas } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import NewAlert from "./newAlert";


const AlertDetails = (props) => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {serverName,alertType,alertDetails} = props.data

    return (
      <>
        <Button variant="outline-primary" onClick={handleShow}>
          Details
        </Button>
  
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>{serverName}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <p>Alert Type: <b>{alertType}</b></p>
            {alertDetails.map((detail,index)=>(
                <p key={index}> <b>{detail}</b></p>
            ))}
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }

const Alerts = () => {
    const { search } = useLocation();
    const [alertsOnServer, setAlertsOnServer] = useState([])
    const params = new URLSearchParams(search);
    const [serverDetail , setServerDetail] = useState()
    const serverName = params.get('serverName');
    const [deleted, setDeleted] = useState(0)
    const history = useHistory();

    useEffect(()=>{
        const apiUrl = `${BACKEND_URL}/alert/server/${serverName}`;
        fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((response) => response.json())
          .then((data) => {
            setAlertsOnServer(data.data)
          })
          .catch((error) => {
            console.log("Error:",error)
            alert(`An error ${error.message}. Redirecting to home page.`);
        })
        getServerDetails(serverName)

    },[history,deleted,serverName])

    const getServerDetails = async (serverName) =>{

      const apiUrl = `${BACKEND_URL}/servers/${serverName}`;
      fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json())
        .then((data) => {
          setServerDetail(data)
        })
        .catch((error) => {
          console.log("Error:",error)
          alert(`An error ${error.message}. Redirecting to home page.`);
      })
    }

    const deleteServer = (id) =>{
        const apiUrl = `${BACKEND_URL}/alert/${id}`
        fetch(apiUrl,{
          method : "DELETE",
          headers:{
            'Content-Type' : 'appplication/json',
          },
        }).then((response)=>response.json())
        .then((data)=>{
            alert(`ID: ${id} is deleted`)
            setDeleted(deleted+1)
        }).catch((error)=>{
          console.log("Error:",error)
          alert(`An error ${error.message}. Redirecting to home page.`);
          history.push("/");
        })
    }

    return(
        <div>
            <h1>Alerts</h1>
            <Container>    
                <NewAlert data={serverDetail}/>   
                <table>
                <tbody>
                {alertsOnServer.map((alertOnServer,index)=>(
                    <tr key={index}>
                    <td>{alertOnServer.serverName}</td>
                    <td>{alertOnServer.alertType}</td>

                    <td><AlertDetails data={alertOnServer}/></td>
                    <td> <Button variant="outline-danger" onClick={()=>deleteServer(alertOnServer._id)}> Delete </Button> </td>
                    </tr>
                ))}
                </tbody>
                </table>
            </Container>
        </div>
    )
}

export default Alerts
