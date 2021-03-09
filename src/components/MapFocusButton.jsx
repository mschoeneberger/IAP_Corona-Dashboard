import React, {useState} from 'react';
import styled from 'styled-components';
import {FaChevronCircleDown} from 'react-icons/fa';
import FocusMenu from "../entities/FocusMenu";

const Button = styled.button`
  padding: calc(min(0.5vh,0.5vw));
  height: 10vh;
  width: 20vw;
  cursor: pointer;
  opacity: 1;
  background: black;
  color: white;
  outline: 0;
  border:0;
  border-right: 2px solid #222222;
  border-bottom: 2px solid #222222;
  float: left;
  font-size: calc(min(2vh,2vw));
  text-align: left;
`;

function MapFocusButton (props) {
    const [focusSelectionOpen, setOpen] = useState(false);
    return (<>
                <Button onClick={() => setOpen(!(focusSelectionOpen))}>
                    <p style={{padding: "2px"}}>
                        {props.activeFocus}
                        {focusSelectionOpen ? (
                            <FaChevronCircleDown style={{float:"right", height:"3vh", width:"3vw", opacity:"0.7"}}/>
                        ) : (
                            <FaChevronCircleDown style={{float:"right", height:"3vh", width:"3vw"}}/>
                        )
                        }
                    </p>
                </Button>
                <FocusMenu focusSelectionOpen={focusSelectionOpen} setActiveFocus={props.setActiveFocus} setOpen={setOpen}/>
            </>
    );
};
 
export default MapFocusButton;