import React, {useState} from 'react';
import styled from 'styled-components';
import {FaChevronCircleDown} from 'react-icons/fa';
import FocusMenu from "../entities/FocusMenu";

const Button = styled.button`
  padding: 2px;
  display: flex;
  flex-direction: row;
  height: 10vh;
  flex-grow: 20;
  flex-basis: 20vw;
  cursor: pointer;
  opacity: 1;
  background: black;
  color: white;
  outline: 0;
  border:0;
  border-right: 2px solid #222222;
  border-bottom: 2px solid #222222;
  font-size: calc(min(2vh,2vw));
  align-items: center;
  justify-content: center;
`;

function MapFocusButton (props) {
    const germanFocuses = {
        "World": "Welt",
        "Regions": "Regionen"
    }
    const [focusSelectionOpen, setOpen] = useState(false);
    return (<>
                <Button onClick={() => setOpen(!(focusSelectionOpen))}>
                    <p style={{padding: "2px", flexGrow:"3"}}>
                        {props.activeLanguage === "English" ? (props.activeFocus) : (germanFocuses[props.activeFocus])}
                    </p>
                    {focusSelectionOpen ? (
                        <FaChevronCircleDown style={{flexGrow:"1", height:"3vh", width:"3vw", opacity:"0.7"}}/>
                    ) : (
                        <FaChevronCircleDown style={{flexGrow:"1", height:"3vh", width:"3vw"}}/>
                    )
                    }
                </Button>
                <FocusMenu focusSelectionOpen={focusSelectionOpen} setActiveFocus={props.setActiveFocus} setOpen={setOpen} activeLanguage={props.activeLanguage}/>
            </>
    );
};
 
export default MapFocusButton;