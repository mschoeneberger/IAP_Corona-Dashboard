import React from 'react';
import "./TopRow.css";
import UpdatePanel from "./UpdatePanel";
import DropdownMenuButton from "./DropdownMenuButton";
import MapFocusButton from "./MapFocusButton";

const TopRow = (props) => {
    return (<div className="myRow">
        <div className="titleArea">
            <h1><b>Yet Another Corona Dashboard</b></h1>
        </div>
        <MapFocusButton activeFocus={props.activeFocus} setActiveFocus={props.setActiveFocus}/>
        <UpdatePanel lastUpdate = {props.lastUpdate}/>
        <DropdownMenuButton/>
    </div>);
}
 
export default TopRow;