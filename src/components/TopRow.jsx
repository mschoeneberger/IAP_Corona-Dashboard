import React from 'react';
import "./TopRow.css";
import UpdatePanel from "./UpdatePanel";
import ContextMenuButton from "./ContextMenuButton";

const TopRow = () => {
    return (<div className="myRow">
        <div className="titleArea">
            <h1><b>Yet Another Corona Dashboard</b></h1>
        </div>
        <UpdatePanel/>
        <ContextMenuButton/>
    </div>);
}
 
export default TopRow;