import React from 'react';
import "./DropdownMenu.css";
import styled from 'styled-components';

const Tab = styled.button`
  padding: calc(min(0.5vh,0.5vw));
  height: 33.333%;
  width: 20vw;
  cursor: pointer;
  opacity: 1;
  background: transparent;
  color: white;
  outline: 0;
  border: 0;
  border-bottom: 1px solid #222222;
  font-size: calc(min(1.6vh,1.6vw));
  float: right;
`;

const DropdownMenu = (props) => {
    const tabNames = {
        "English": ["Graphs", "Sources", "About Us"],
        "Deutsch": ["Graphen", "Quellen", "Über Uns"]
    }
    var vis = "hidden";
    if(props.dropdownOpen){
        vis = "visible";
    }
    var a = (<div className="DropdownMenu" style={{visibility: "hidden"}}>
            <Tab 
            onClick={() => {
                props.setOpen(false);
                window.scrollBy({top: 500, left: 0, behavior: "smooth"});
            }}>
                {tabNames[props.activeLanguage][0]}
            </Tab>
            <Tab
            onClick={() => {
                props.setOpen(false);
                props.setInfoWindow("sources");
            }}>
                {tabNames[props.activeLanguage][1]}
            </Tab>
            <Tab
            onClick={() => {
                props.setOpen(false);
                props.setInfoWindow("aboutus");
            }}>
                {tabNames[props.activeLanguage][2]}
            </Tab>
        </div>);
    a.props.style.visibility = vis;
    return a;
}
 
export default DropdownMenu;