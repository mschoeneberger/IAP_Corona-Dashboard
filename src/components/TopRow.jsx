import React from 'react';
import "./TopRow.css";
import UpdatePanel from "./UpdatePanel";
import DropdownMenuButton from "./DropdownMenuButton";

const TopRow = (props) => {
    return (<div className="myRow">
        <div className="titleArea">
            <h1><b>Yet Another Corona Dashboard</b></h1>
        </div>
        <UpdatePanel/>
        <DropdownMenuButton dropdownOpen={props.dropdownOpen} setOpen={props.setOpen}/>
    </div>);
}
 
export default TopRow;