import React, {useState} from 'react';
import styled from 'styled-components';
import Tooltipbox from "./Tooltipbox";

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
    const [tooltipOpen,setTooltipOpen] = useState("None");
    return (<>
        <div style={{height:"10vh", width:"70vw", overflow:"hidden"}}>
          {
            props.views.map(view=>
                <Tab
                  key={view}
                  active={props.active === view}
                  onClick={() => props.setActiveLegend(view)}
                  onMouseEnter ={() => setTooltipOpen(view)}
                  onMouseLeave ={() => setTooltipOpen("None")}
                >
                  <p>{view}</p>
                </Tab>
              )
              }
        </div>
        <Tooltipbox tooltipOpen={tooltipOpen}/>
      </>
    );
  }

  export default MapSelectionButtons;