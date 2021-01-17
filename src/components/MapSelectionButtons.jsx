import React from 'react';
import styled from 'styled-components';

const Tab = styled.button`
  padding: calc(min(0.8vh,0.8vw));
  height: 10vh;
  width: 10vw;
  cursor: pointer;
  opacity: 0.6;
  background: black;
  color: white;
  outline: 0;
  border: 1px solid #222222;
  border-top: 2px solid #222222;
  float: left;
  font-size: calc(min(1.6vh,1.6vw));
  ${({ active }) =>
    active &&
    `
      border-top: 2px solid blue;
      opacity: 1;
    `}
`;

function MapSelectionButtons(props) {
    return (
      <div style={{height:"10vh", width:"70vw", overflow:"hidden"}}>
        {
          props.views.map(view=>
              <Tab
                key={view}
                active={props.active === view}
                onClick={() => props.setActiveLegend(view)}
              >
                <p>{view}</p>
              </Tab>
            )
        }
      </div>
    );
  }

  export default MapSelectionButtons;