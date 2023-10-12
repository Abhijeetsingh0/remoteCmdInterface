import { useEffect } from "react";

const Test = () =>{

    useEffect(()=>{
        
    },[])

    function showDesktopNotification() {

        const myNotification = new Notification("heading of the notification", {
          icon: 'demo2.jpg',
          body: "This is the body of the notification, Its a demo for learnig browser notification",
        });
  
        myNotification.onclick = (e) => {
          alert('Notification  clicked')
        }
      }
  
      console.log("1. ", Notification.permission); // Notification.permission => :default", "granted" and "denied"
      if (Notification.permission === "granted") {
        showDesktopNotification();
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission()
          .then(permission => {
            if (permission === "granted") {
              showDesktopNotification();
            }
          })
      }
    
    
    return (
        <div className="box">
            <button onClick={showDesktopNotification}></button>
        </div>
    )
}

export default Test