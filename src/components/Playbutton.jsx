import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {FaPauseCircle,FaPlayCircle} from 'react-icons/fa';

const Button = styled.button`
  padding: calc(min(0.8vh,0.8vw));
  height: 100%;
  flex-basis: 5%;
  flex-grow: 1;
  cursor: pointer;
  opacity: 1;
  background: black;
  color: white;
  outline: 0;
  border: 0px;
${({ disabled }) =>
    disabled &&
    `
      opacity: 0.5;
      cursor: not-allowed;
    `}
`;

const Playbutton = (props) => {
    return (
        <Button 
        onClick={() => {
            if(props.playStatus === "Pause"){props.setPlayStatus("Play");}
            else{props.setPlayStatus("Pause");}
        }}
        disabled={(props.focus === "World") ? (props.countries.length === 0) : (props.regions.length ===0)}
        >
            {props.playStatus === "Pause" ? (<FaPlayCircle/>) : (<FaPauseCircle/>)}
        </Button>
    );
}
 
export default Playbutton;