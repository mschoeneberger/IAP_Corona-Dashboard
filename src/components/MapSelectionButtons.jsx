import React, {useState} from 'react';
import styled from 'styled-components';
import Tooltipbox from "./Tooltipbox";

const Tab = styled.button`
  padding: calc(min(0.8vh,0.8vw));
  height: 100%;
  flex-grow: 1;
  flex-basis: 15%;
  cursor: pointer;
  opacity: 0.6;
  background: black;
  color: white;
  outline: 0;
  border: 1px solid #222222;
  border-top: 2px solid #222222;
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
    const germanViews = {
      "Cumulative Cases": "Kumulative Fälle",
      "New Cases(21 Days)": "Neue Fälle (21 Tage)",
      "7-Day-Incidence": "7-Tages-Inzidenz",
      "ICU-Occupancy": "Intensivbetten-Belegung",
      "Cumulative Fatalities": "Kumulative Todesfälle",
      "Testing Rate": "Test Rate",
      "Vaccinated Population": "Geimpfte Bevölkerung"
    }
    var currentView=props.views[0];
    if (props.focus === "World"){
      currentView = props.views[0];
    }
    else{
      currentView = props.views[1];
    }
    return (<>
        <div style={{flexBasis:"10vh", flexGrow:"0", width:"100%", display:"flex", overflow:"hidden"}}>
          {
            currentView.map(view=>
                <Tab
                  key={view}
                  active={props.active === view}
                  onClick={() => props.setActiveLegend(view)}
                  onMouseEnter ={() => setTooltipOpen(view)}
                  onMouseLeave ={() => setTooltipOpen("None")}
                >
                  <p>{
                    props.activeLanguage === "English" ? (view) : (germanViews[view])
                  }</p>
                </Tab>
              )
              }
        </div>
        <Tooltipbox tooltipOpen={tooltipOpen} activeLanguage={props.activeLanguage}/>
      </>
    );
  }

  export default MapSelectionButtons;