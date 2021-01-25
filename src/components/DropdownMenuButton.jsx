import styled from 'styled-components';
import React from 'react';

const Button = styled.button`
  padding: calc(min(0.8vh,0.8vw));
  height: 10vh;
  width: 10vw;
  cursor: pointer;
  opacity: 1;
  background: black;
  color: white;
  outline: 0;
  border: 1px solid #222222;
  border-top: 2px solid #222222;
  float: left;
  font-size: calc(min(1.6vh,1.6vw));
`;



const DropdownMenuButton = (props) => {
  return (
    <Button onClick={() => props.setOpen(!(props.dropdownOpen))}>
      <p>-<br/>-<br/>-</p>
    </Button>
  );
}
 
export default DropdownMenuButton;