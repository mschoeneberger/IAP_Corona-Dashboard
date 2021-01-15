import React, {useState} from 'react';
import styled from 'styled-components';

const views = ["Cumulative Cases", "Active Cases", "7-Day-Incedence", "ICU-Occupancy", "Cumulative Fatalities", "Testing Rate", "Vaccinated Population"];

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

function MapSelectionButtons() {
  const [active, setActive] = useState(views[0])
    return (
      <div style={{height:"10vh", width:"70vw", overflow:"hidden"}}>
        {
          views.map(view=>
              <Tab
                key={view}
                active={active === view}
                onClick={() => setActive(view)}
              >
                <p>{view}</p>
              </Tab>
            )
        }
      </div>
    );
  }

  export default MapSelectionButtons;