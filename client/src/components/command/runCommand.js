import React from 'react'
import "./runCommand.css"
import { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import { Form } from 'react-bootstrap';
import { BACKEND_URL } from '../../variable';

const RunCommandOnServer = (props) =>{

    const serverDetails = props.location.state.data

    const [showA, setShowA] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData,setFormData] = useState({
        serverName : serverDetails.serverName,
        userName   : serverDetails.userName,
        host       : serverDetails.host,
        password   : serverDetails.password,
        command    : ''
    })
    const history = useHistory()
    const [isSudo, SetIsSudo] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = (e) => {
        if(isSudo){
            formData.command = `echo ${formData.password} | sudo -S ${formData.command} > /tmp/log.txt && cat /tmp/log.txt && > /tmp/log.txt`
        }else{
          formData.command = `${formData.command} > /tmp/log.txt && cat /tmp/log.txt && > /tmp/log.txt`
        }

        e.preventDefault();
        setIsLoading(true);


        // Assuming you have an API endpoint to send the data to
        const apiUrl = `${BACKEND_URL}/command`;
        
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          
        })
          .then((response) => response.json())
          .then((data) => {
            // console.log('command form data :', data);
            // Handle the response as needed
            history.push(`/command/server/${serverDetails.serverName}`)
          })
          .catch((error) => {
            console.log("Error:",error)
            alert(`An error ${error.message}. Redirecting to home page.`);
            console.log(error)
        }).finally(() => {
            setIsLoading(false); // Stop loading after API call is complete
        });
    };

    const toggleShowA = () => setShowA(!showA);
    return(
        <div>
       <div className='toggler'>
        <Row>
            <Col md={6} className="mb-2">
            <Button onClick={toggleShowA} className="mb-2">
            <b>"{serverDetails.serverName}"</b>  Click to get more details
            </Button>
                <Toast show={showA} onClose={toggleShowA}>
                    <Toast.Header>
                      <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                      />
                      <strong className="me-auto">user: {serverDetails.userName}</strong>
                      <small>:)</small>
                    </Toast.Header>
                  <Toast.Body>host: {serverDetails.host}</Toast.Body>
                </Toast>
            </Col>
        </Row>
       </div>


       {isLoading && (
            <div className="loading-overlay">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )}


        <div className="form-ind server-form-container">
        <label><h2>Fill the Server Information</h2></label>

        <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="serverName">Command :</label>
              <input
                type="text"
                id="command"
                name="command"
                value={formData.command}
                onChange={handleChange}
                required
              />
            </div>
        <button type="submit">Add Server</button>
        </form>
    
        <Form.Check
            type="switch"
            id="custom-switch"
            label="Click here if command required sudo"
            onClick={()=>SetIsSudo(!isSudo)}
        />
        </div>
        </div>
    )
}

export default RunCommandOnServer;