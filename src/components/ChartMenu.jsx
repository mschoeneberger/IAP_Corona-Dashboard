import React from 'react';
import "./ChartMenu.css"
import TimeRange from "./ChartMenu/TimeRange.jsx"
import Stepsize from "./ChartMenu/Stepsize.jsx"
import AddCountry from "./ChartMenu/AddCountry.jsx"

const ChartMenu = (props) => {

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
       </div>
    </div>
  );
}

export default ChartMenu;
