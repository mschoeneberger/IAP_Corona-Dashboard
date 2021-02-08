import React from 'react';
import styled from 'styled-components';

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
`;

function nextFocus(activeFocus){
    if(activeFocus === "World"){
       return "Germany";
    }
    else{
        return "World";
    }
}

function MapFocusButton (props) {
    return (<Button onClick={() => props.setActiveFocus(nextFocus(props.activeFocus))}>
            <p>Active Focus: </p>{props.activeFocus}
        </Button>);
};
 
export default MapFocusButton;