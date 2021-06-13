import React from 'react';
import "./UpdatePanel.css"

const UpdatePanel = (props) => {
    var lastUpdate;
    if(props.lastUpdate == null){
        if (props.activeLanguage === "English"){
            lastUpdate = "Loading"
        }
        else{
            lastUpdate = "Lade"
        }
    }
    else{
        lastUpdate = props.lastUpdate.toLocaleString()
    }
    return (
    <div className="panel">
        <h2>{props.activeLanguage === "English" ? ("Last Update:") : ("Letzte Aktualisierung:")}<br/>{lastUpdate}</h2>
    </div>
    );
}
 
export default UpdatePanel;