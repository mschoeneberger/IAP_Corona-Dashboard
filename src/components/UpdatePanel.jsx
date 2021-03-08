import React from 'react';
import "./UpdatePanel.css"

const UpdatePanel = (props) => {
    var lastUpdate;
    if(props.lastUpdate == null){
        lastUpdate = "Loading"
    }
    else{
        lastUpdate = props.lastUpdate.toLocaleString()
    }
    return (
    <div className="panel">
        <h2>Last Update: <br/>{lastUpdate}</h2>
    </div>
    );
}
 
export default UpdatePanel;