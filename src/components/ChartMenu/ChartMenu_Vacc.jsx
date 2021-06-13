import React from 'react';
import "../ChartMenu.css"
import TimeRange from "./TimeRange.jsx"
import Stepsize from "./Stepsize.jsx"
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { purple,white } from '@material-ui/core/colors';

const ChartMenu_Vacc = (props) => {

  const handleChange = (event) => {
   props.setRelativeState(event.target.checked);
  };
  const PurpleSwitch = withStyles({
    switchBase: {
      color: "#ffffff",
      '&$checked': {
        color: "#ffffff",
      },
      '&$checked + $track': {
        backgroundColor: "#b8b8b8",
      },
    },
    checked: {},
    track: {
      backgroundColor: "#7d7d7d"
    }
  })(Switch);

 /* -------------------------------------------------
    * ToDo: kritische Linien
    * -------------------------------------------------- */    
    return (
      <div className="slidecontainer">
        <div className="centering">
          {props.activeLanguage === "English" ? (<h3>Options</h3>) : (<h3>Optionen</h3>)}
            {props.activeLanguage === "English" ? (<label>Time Range</label>) : (<label>Zeitraum</label>)}
              <TimeRange startDate={props.startDate} endDate={props.endDate} setEndDate={props.setEndDate} setStartDate={props.setStartDate} lastUpdate={props.lastUpdate}/>
              {props.activeLanguage === "English" ? (<label>Stepsize</label>) : (<label>Schrittgröße</label>)}
            
              <Stepsize setStep={props.setStep} />
              <FormControlLabel
                control={
                  <PurpleSwitch
                    style={{zIndex: 999}}
                    checked={props.relativeState}
                    onChange={handleChange}
                    color="primary"
                  />
                }
                label="relative (%)"
              />
        </div>
      </div>
    );
}

export default ChartMenu_Vacc;
