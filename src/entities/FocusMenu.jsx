import React from 'react';
import styled from 'styled-components';
import "./FocusMenu.css";

const Tab = styled.button`
  padding: calc(min(0.5vh,0.5vw));
  height: 50%;
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


const FocusMenu = (props) => {
    const buttonNames= {
        "English": ["World", "Regions"],
        "Deutsch": ["Welt", "Regionen"],
    }
    var vis = "hidden";
    if(props.focusSelectionOpen){
        vis = "visible";
    }
    var a = (<div className="FocusMenu" style={{visibility: "visible"}}>
            <Tab onClick={() => {
                //Since ICU-Occupancy is not defined in world focus
                if(props.activeLegend === "ICU-Occupancy"){
                    //We default to cumulative cases view
                    props.setActiveLegend("Cumulative Cases");
                }
                props.setActiveFocus("World")
                props.setOpen(false)
                }
            }>
                {buttonNames[props.activeLanguage][0]}
            </Tab>
            <Tab onClick={() => {
                props.setActiveFocus("Regions")
                props.setOpen(false)
                }
            }>
                {buttonNames[props.activeLanguage][1]}
            </Tab>
        </div>);
    a.props.style.visibility = vis;
    return a;
}
 
export default FocusMenu;