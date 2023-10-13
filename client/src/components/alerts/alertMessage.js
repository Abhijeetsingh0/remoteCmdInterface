import React from "react";
import {useEffect, useState} from "react";
import { BACKEND_URL } from "../../variable";
import { Container, ListGroup, Badge } from "react-bootstrap";
import "./alerts.css"

function MessageList({ message }) {
    const timestamp = new Date(message.createdAt);
    const formattedDateTime = timestamp.toLocaleString();
    return (
      <div>
          <div className="message sent">
            <ListGroup>
            <ListGroup.Item variant="light"><i>{message.serverName}:</i> <h5>{message.message}</h5>    
            {/* {console.log(message)} */}
            <Badge bg="secondary" pill>
                {formattedDateTime}
            </Badge></ListGroup.Item>
            </ListGroup>
          </div>
      </div>
    );
  }
  

const AlertMessage = () =>{

    const [temp, setTemp] = useState(0)
    const [messageCount, setMessageCount] = useState(0)
    const [messages , setMessages] = useState([])

    useEffect(()=>{
      setInterval(() => {
        setTemp((prevTemp)=>prevTemp+1)
      }, 1000);
    }, [])

    useEffect(()=>{
      fetchData()
    }, [temp])

    const fetchData = () =>{
        // console.log("test")
        const apiUrl = `${BACKEND_URL}/alert/message`;
        fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((response) => response.json())
          .then((data) => {
            if(messageCount !== data.data.length){
                // push notification
                const lastMessage = data.data[data.data.length-1]
                setMessageCount(data.data.length)
                setMessages(data.data)
            }
          })
          .catch((error) => {
            console.log("Error:",error)
            alert(`An error ${error.message}. Redirecting to home page.`);
        })
    }

    if(messages === null){
        return(
          <>
            <h1>Alerts</h1>
            <span/>
            <h3>WOOOHUU there is no alert</h3>
          </>
        )
    }else{
      return(
        <>
            <h1>Alerts</h1>
            <span/>
            {messages.slice(0).reverse().map((message,index)=>(
                <Container key={index}>
                    <MessageList message={message}/>
                </Container>
            ))}
        </>
      )
    }

}

export default AlertMessage;