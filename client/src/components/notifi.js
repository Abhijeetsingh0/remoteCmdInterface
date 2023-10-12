import {useEffect, useState} from "react";
import { BACKEND_URL } from "../variable";
import addNotification from 'react-push-notification'; 
import { Notifications } from 'react-push-notification'; 

const Notifi = () =>{

    const [temp, setTemp] = useState(10)
    const [messageCount, setMessageCount] = useState(2)

    useEffect(()=>{
      setInterval(() => {
        setTemp((prevTemp)=>prevTemp+1)
      }, 2000);
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
            // console.log(data.data.length)
            if(messageCount !== data.data.length){
                //push notification
                // addNotification({
                //     title: 'Message',
                //     subtitle: 'New Message recived',
                //     message: 'New Message recived',
                //     theme: 'darkblue'
                // });
                setMessageCount(data.data.length)
            }
          })
          .catch((error) => {
            console.log("Error:",error)
            alert(`An error ${error.message}. Redirecting to home page.`);
        })
    }
    // return(
    //     <Notifications/>
    // )
}

export default Notifi