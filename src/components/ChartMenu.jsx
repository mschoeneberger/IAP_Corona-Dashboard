import React from 'react';
import "./ChartMenu.css"
import TimeRange from "./ChartMenu/TimeRange.jsx"
import Stepsize from "./ChartMenu/Stepsize.jsx"
import AddCountry from "./ChartMenu/AddCountry.jsx"
import AddRegion from "./ChartMenu/AddRegion.jsx"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switches from './ChartMenu/Switches';

const ChartMenu = (props) => {
  
 /* -------------------------------------------------
    * ToDo: kritische Linien
    * -------------------------------------------------- */    
  if(props.activeFocus === "World")  {
    return (
      <div className="slidecontainer">
        <div className="centering">
          <h3>{props.activeLanguage === "English" ? (<label>Options</label>) : (<label>Optionen</label>)}</h3>
            {props.activeLanguage === "English" ? (<label>Add Country</label>) : (<label>Land hinzufügen</label>)}
            <AddCountry showing={props.showing} number_of_colors={props.number_of_colors} alert={props.alert} country_list={props.country_list} selectedCountries={props.selectedCountries} setSelectedCountries={props.setSelectedCountries}/>
            {props.activeLanguage === "English" ? (<label>Time Range</label>) : (<label>Zeitraum</label>)}
            <TimeRange startDate={props.startDate} endDate={props.endDate} setEndDate={props.setEndDate} setStartDate={props.setStartDate} lastUpdate={props.lastUpdate} activeLanguage={props.activeLanguage}/>
            {props.activeLanguage === "English" ? (<label>Stepsize</label>) : (<label>Schrittgröße</label>)}
            <Stepsize setStep={props.setStep} activeLanguage={props.activeLanguage}/>
            <Switches
              relativeState={props.relativeState}
              setRelativeState={props.setRelativeState}
              showVac={props.showVac}
              setShowVac={props.setShowVac}
              setVacRelative={props.setVacRelative} 
              vacRelative={props.vacRelative} 
              setVacCumulative={props.setVacCumulative} 
              vacCumulative={props.vacCumulative}
              activeLanguage={props.activeLanguage}
            />
        </div>
      </div>
    );
  }
  else {
    return (
      <div className="slidecontainer">
        <div className="centering">
        <h3>{props.activeLanguage === "English" ? (<label>Options</label>) : (<label>Optionen</label>)}</h3>
          {props.activeLanguage === "English" ? (<label>Add Region</label>) : (<label>Region hinzufügen</label>)}
            
              <AddRegion showing={props.showing} number_of_colors={props.number_of_colors} alert={props.alert} region_list={props.region_list} selectedRegions={props.selectedRegions} setSelectedRegions={props.setSelectedRegions}/>
              {props.activeLanguage === "English" ? (<label>Time Range</label>) : (<label>Zeitraum</label>)}
              <TimeRange startDate={props.startDate} endDate={props.endDate} setEndDate={props.setEndDate} setStartDate={props.setStartDate} lastUpdate={props.lastUpdate} activeLanguage={props.activeLanguage}/>
              {props.activeLanguage === "English" ? (<label>Stepsize</label>) : (<label>Schrittgröße</label>)}
              <Stepsize setStep={props.setStep} activeLanguage={props.activeLanguage}/>
              <Switches
                relativeState={props.relativeState}
                setRelativeState={props.setRelativeState}
                showVac={props.showVac}
                setShowVac={props.setShowVac}
                setVacCumulative={props.setVacCumulative} 
                vacCumulative={props.vacCumulative}
                activeLanguage={props.activeLanguage}
            />
        </div>
      </div>
    );
  }
}

export default ChartMenu;
