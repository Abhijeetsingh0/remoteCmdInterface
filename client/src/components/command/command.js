import React from "react"
// import { useParams } from 'react-router-dom';

const CommandPage = (props) =>{
    const par = props.match.params
    console.log(par);
    return(
        <div>
            <h1>Hi command</h1>
        </div>
    )
}

export default CommandPage