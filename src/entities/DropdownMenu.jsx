import React from 'react';
import "./DropdownMenu.css";
import styled from 'styled-components';

const Tab = styled.button`
  padding: calc(min(0.5vh,0.5vw));
  height: 25%;
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
    var vis = "hidden";
    if(props.dropdownOpen){
        vis = "visible";
    }
    var a = (<div className="DropdownMenu" style={{visibility: "hidden"}}>
            <Tab>Mobile Mode</Tab>
            <Tab>Graphs</Tab>
            <Tab>Sources</Tab>
            <Tab>About Us</Tab>
        </div>);
    a.props.style.visibility = vis;
    return a;
}
 
export default DropdownMenu;