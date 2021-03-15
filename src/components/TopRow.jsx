import React from 'react';
import "./TopRow.css";
import UpdatePanel from "./UpdatePanel";
import DropdownMenuButton from "./DropdownMenuButton";
import MapFocusButton from "./MapFocusButton";

const TopRow = (props) => {
    const title = {
        "English": "Yet Another Corona Dashboard",
        "Deutsch": "Noch Eine Weitere Corona Übersichtsseite"
    }
    return (<div className="flex-container">
        <div className="titleArea">
            <h1><b>{title[props.activeLanguage]}</b></h1>
        </div>
        <MapFocusButton activeFocus={props.activeFocus} setActiveFocus={props.setActiveFocus} activeLanguage={props.activeLanguage}/>
        <UpdatePanel lastUpdate = {props.lastUpdate} activeLanguage={props.activeLanguage}/>
        <DropdownMenuButton activeLanguage={props.activeLanguage}/>
    </div>);
}
 
export default TopRow;