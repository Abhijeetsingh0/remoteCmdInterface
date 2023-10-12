import { useState} from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { BACKEND_URL } from "../../variable";
import { useHistory } from "react-router-dom";

const NewAlert = ({data}) => {
    const [alerType, setAlertType] = useState("");
    const [formData, setFormData] = useState({
        first:'',
        second:'',
        third:'none'
    }) 
    
    const history = useHistory()
    
    while(data === undefined){
        return (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          );   
    }

    const serverDetails = data[0]

    const handleOptionChange = (e) => {
        setAlertType(e.target.value);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const submitForm = (e) =>{
        e.preventDefault();
        const alertData = {
            serverName: serverDetails.serverName,
            host: serverDetails.host,
            userName: serverDetails.userName,
            password: serverDetails.password,
            alertType: alerType,
            alertDetails:[formData.first,formData.second,formData.third]
        }

        const apiUrl = `${BACKEND_URL}/alert?serverName=${serverDetails.serverName}`;
        // console.log(formData)

        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(alertData),

        })
          .then((response) => response.json())
          .then((data) => {
            alert("Alert added",data)
            history.push(`/command/server/${serverDetails.serverName}`)
          })
          .catch((error) => {
            console.log("Error:",error)
            alert(`An error ${error.message}. Redirecting to home page.`);
            history.push("/");
          })
    }

    
    

    return(
        <div>
            <Container>
               
                <label>Select an Alert Type:</label>
                <select value={alerType} onChange={handleOptionChange}>
                  <option value="">Select an option</option>
                  <option value="tcp">TCP</option>
                  <option value="exec">Exec</option>
                  <option value="url">URL</option>
                </select>
                
                <p>Alert Type: <b>{alerType.toUpperCase()}</b></p>
                <div className="form-group"><input type="text" placeholder="Tcp port" id="first" name="first" value={formData.first} onChange={handleChange}/> </div>
                <div className="form-group"><input type="text" placeholder="Message" id="second" name="second" value={formData.second} onChange={handleChange}/> </div>
                <div className="form-group"> <input type="text" placeholder="Enter the webhook url or none" id="third" name="third" value={formData.third} onChange={handleChange}/> </div>
                <Button variant="outline-success" onClick={submitForm}>submit</Button>
            </Container>
        </div>
    )
}

export default NewAlert;