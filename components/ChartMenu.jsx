import React from 'react';
import "./ChartMenu.css"
import TimeRange from "./ChartMenu/TimeRange.jsx"
import Stepsize from "./ChartMenu/Stepsize.jsx"
import AddCountry from "./ChartMenu/AddCountry.jsx"
import AddRegion from "./ChartMenu/AddRegion.jsx"
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { purple,white } from '@material-ui/core/colors';

const ChartMenu = (props) => {

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
  if(props.activeFocus === "World")  {
    return (
      <div className="slidecontainer">
        <div className="centering">
          <h3>Options</h3>
            <label>Add Country</label>
            
              <AddCountry showing={props.showing} number_of_colors={props.number_of_colors} alert={props.alert} country_list={props.country_list} selectedCountries={props.selectedCountries} setSelectedCountries={props.setSelectedCountries}/>
            <label>Time Range</label>
              <TimeRange startDate={props.startDate} endDate={props.endDate} setEndDate={props.setEndDate} setStartDate={props.setStartDate} lastUpdate={props.lastUpdate}/>
            <label>Stepsize</label>
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
  else {
    return (
      <div className="slidecontainer">
        <div className="centering">
          <h3>Options</h3>
            <label>Add Region</label>
            
              <AddRegion showing={props.showing} number_of_colors={props.number_of_colors} alert={props.alert} region_list={props.region_list} selectedRegions={props.selectedRegions} setSelectedRegions={props.setSelectedRegions}/>
            <label>Time Range</label>
              <TimeRange startDate={props.startDate} endDate={props.endDate} setEndDate={props.setEndDate} setStartDate={props.setStartDate} lastUpdate={props.lastUpdate}/>
            <label>Stepsize</label>
              <Stepsize setStep={props.setStep} />
              <FormControlLabel
                control={
                  <PurpleSwitch
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
}

export default ChartMenu;
