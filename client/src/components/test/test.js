import { useState,useEffect } from "react"

const Test = () =>{
    const [number, setNumber] = useState(0);
    return(
        <div>
            Test {number}
        </div>
    )
}

export default Test