import React from 'react';
import "./UpdatePanel.css"

const UpdatePanel = (props) => {
    return (
    <div className="panel">
        <h2>Last Update: <br/>{props.lastUpdate.toLocaleString()}</h2>
    </div>
    );
}
 
export default UpdatePanel;