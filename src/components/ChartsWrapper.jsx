// Defines States Used in Charts, avoids crowded App.js

import React, { useState, useEffect } from 'react';
import Charts from "./Charts";
import Charts_Region from "./Charts_Region";
import Charts_Vacc from "./Vacc_T"
import { useAlert } from 'react-alert';


const ChartsWrapper = (props) => {

    // A List of all Countries / Regions
    const [countryList,setcountryList] = useState([]);
    const [RegionList,setRegionList] = useState([]);
    // states to keep track of the user entered start and end date in the datepicker for displaying chart data
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [step, setStep] = useState({ value: 'd', label: 'Day' });
    const [relativeState, setRelativeState] = useState(false);
    // hook to let charts know which country was selected in the map
    const [selectedCountries,setSelectedCountries] = useState([{ value: 'World', label: 'World'}]);
    const [selectedRegions,setSelectedRegions] = useState([]);
    // a state to store the World data. This data is computed once at the beginning from the inital per country data
    const [WorldData, setWorldData] = useState([]);
    // should Vaccination be visible
    const [showVac, setShowVac] = useState(false);
    const [vacCumulative, setVacCumulative] = useState(false);
    // hook for the alert, when to many countries were selected
    const alert = useAlert();

    return (
      <div className="VBox">
          {props.activeFocus === "World" ? (
              <Charts  activeLegend={props.activeLegend} activeCountry={props.activeCountry} completeData={props.completeData} lastUpdate={props.lastUpdate}
                      startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}
                      countryList={countryList} setcountryList={setcountryList} step={step} setStep={setStep} relativeState={relativeState} setRelativeState={setRelativeState}
                      selectedCountries={selectedCountries} setSelectedCountries={setSelectedCountries} WorldData={WorldData} setWorldData={setWorldData}
                      alert={alert} activeFocus={props.activeFocus} activeLanguage={props.activeLanguage} completeRegionData={props.completeRegionData}
                      showVac={showVac} setShowVac={setShowVac} 
                      setVacCumulative={setVacCumulative} vacCumulative={vacCumulative}/>
          ):(
              <Charts_Region  activeLegend={props.activeLegend} activeRegion={props.activeRegion} completeRegionData={props.completeRegionData} lastUpdate={props.lastUpdate}
                      startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}
                      setRegionList={setRegionList} RegionList={RegionList} step={step} setStep={setStep} relativeState={relativeState} setRelativeState={setRelativeState}
                      selectedRegions={selectedRegions} setSelectedRegions={setSelectedRegions} 
                      alert={alert} activeFocus={props.activeFocus} activeLanguage={props.activeLanguage}
                      showVac={showVac} setShowVac={setShowVac} 
                      setVacCumulative={setVacCumulative} vacCumulative={vacCumulative}/>
          )}
          {showVac ? (
              <Charts_Vacc 
                      step={step} 
                      startDate={startDate} 
                      endDate={endDate} 
                      activeLanguage={props.activeLanguage}
                      lastUpdate={props.lastUpdate}
                      completeRegionData={props.completeRegionData}
                      activeFocus={props.activeFocus}
                      relativeState={relativeState}
                      vacCumulative={vacCumulative}
                  />
          ):(
            <></>
          )}
        </div>
    );
}

export default ChartsWrapper;

//step und relative props in region chart