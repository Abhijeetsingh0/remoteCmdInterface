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
    const [empty, setEmpty] = useState(true)

    useEffect(()=>{
      setInterval(() => {
        setTemp((prevTemp)=>prevTemp+1)
      }, 1000);
    })

    useEffect(()=>{
      fetchData()
    },[temp])

    const fetchData = async () =>{
        // console.log("test")
        const apiUrl = `${BACKEND_URL}/alert/message`;
        await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((response) => response.json())
          .then((data) => {
            if(data.data == [] || data.data.length > 0){
                setEmpty(false)
            }
            if(messageCount !== data.data.length){
                // push notification
                // const lastMessage = data.data[data.data.length-1]
                setMessageCount(data.data.length)
                setMessages(data.data)
            }
          })
          .catch((error) => {
            console.log("Error:",error)
            alert(`An error ${error.message}. Redirecting to home page.`);
        })
    }

    
      return(
        <>
            <h1>Alerts</h1>
            <span/>
            {empty ? (
              <div>
                  WOOOHUU there is no alert
              </div>
            ) : (
              <div>
                  {messages.slice(0).reverse().map((message,index)=>(
                    <Container key={index}>
                        <MessageList message={message}/>
                    </Container>
                  ))}
              </div>
            )}
        </>
      )
    }



export default AlertMessage;