import styled from 'styled-components';
import React, {useState} from 'react';
import DropdownMenu from '../entities/DropdownMenu';
import {FaBars} from 'react-icons/fa';

const Button = styled.button`
  padding: calc(min(0.8vh,0.8vw));
  height: 10vh;
  flex-basis: 10vw;
  flex-grow: 10;
  cursor: pointer;
  opacity: 1;
  background: black;
  color: white;
  outline: 0;
  border: 1px solid #222222;
  border-top: 2px solid #222222;
  font-size: calc(min(1.6vh,1.6vw));
`;

const DropdownMenuButton = (props) => {
  const [dropdownOpen, setOpen] = useState(false);
  return (<>
      <Button onClick={() => setOpen(!(dropdownOpen))}>
        <FaBars/>
      </Button>
      <DropdownMenu dropdownOpen={dropdownOpen} activeLanguage={props.activeLanguage} setOpen={setOpen} setInfoWindow={props.setInfoWindow}/>
    </>
  );
}
 
export default DropdownMenuButton;