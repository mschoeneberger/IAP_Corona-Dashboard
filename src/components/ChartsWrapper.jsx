// Defines States Used in Charts, avoids crowded App.js

import React, { useState, useEffect } from 'react';
import Charts from "./Charts";
import Charts_Region from "./Charts_Region";
import { useAlert } from 'react-alert';


const ChartsWrapper = (props) => {

    // A List of all Countries / Regions
    const [countryList,setcountryList] = useState([]);
    const [RegionList,setRegionList] = useState([]);
    // states to keep track of the user entered start and end date in the datepicker for displaying chart data
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    // hook to let charts know which country was selected in the map
    const [selectedCountries,setSelectedCountries] = useState([{ value: 'World', label: 'World'}]);
    const [selectedRegions,setSelectedRegions] = useState([]);
    // a state to store the World data. This data is computed once at the beginning from the inital per country data
    const [WorldData, setWorldData] = useState([]);
    // hook for the alert, when to many countries were selected
    const alert = useAlert();
    
  if(props.activeFocus === "World"){
    return (
      <Charts  activeLegend={props.activeLegend} activeCountry={props.activeCountry} completeData={props.completeData} lastUpdate={props.lastUpdate}
              startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}
              countryList={countryList} setcountryList={setcountryList}
              selectedCountries={selectedCountries} setSelectedCountries={setSelectedCountries} WorldData={WorldData} setWorldData={setWorldData}
              alert={alert} activeFocus={props.activeFocus}/>
    );
  }
  else {
    return (
      <Charts_Region  activeLegend={props.activeLegend} activeRegion={props.activeRegion} completeRegionData={props.completeRegionData} lastUpdate={props.lastUpdate}
                startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}
                setRegionList={setRegionList} RegionList={RegionList}
                selectedRegions={selectedRegions} setSelectedRegions={setSelectedRegions} 
                alert={alert} activeFocus={props.activeFocus}/>
    )
  }
}

export default ChartsWrapper;
