// ServerForm.js
import {Link} from "react-router-dom"
import ServerList from "./serverList/serversLists";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Servers() {
  return (
    <div>
        <div>
      <Card>
        <Card.Header>Let's add some server</Card.Header>
        <Card.Body>
          <Card.Title>If you dont see any server below then you sould add some</Card.Title>
          <Card.Text>
            Click on the below button to add a new servers details 
          </Card.Text>
          <Link to="/addServer"> <Button variant="primary">Add Server</Button></Link>
        </Card.Body>
      </Card>
    </div>
        <ServerList></ServerList>
    </div>
  );
}

export default Servers;