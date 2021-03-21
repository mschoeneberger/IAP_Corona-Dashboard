import React from 'react';
import "./TopRow.css";
import UpdatePanel from "./UpdatePanel";
import DropdownMenuButton from "./DropdownMenuButton";
import MapFocusButton from "./MapFocusButton";

const TopRow = (props) => {
    return (<div className="flex-container">
        <div className="titleArea">
            <h1><b>Yet Another Corona Dashboard</b></h1>
        </div>
        <MapFocusButton activeFocus={props.activeFocus} setActiveFocus={props.setActiveFocus} activeLanguage={props.activeLanguage}/>
        <UpdatePanel lastUpdate = {props.lastUpdate} activeLanguage={props.activeLanguage}/>
        <DropdownMenuButton activeLanguage={props.activeLanguage}/>
    </div>);
}
 
export default TopRow;