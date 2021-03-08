import React, { useState, useEffect } from 'react';
import './App.css';
import TopRow from "./components/TopRow";
import InfoPanel from "./components/InfoPanel";
import LoadingMap from "./components/LoadingMap";
import CovidMap from "./components/CovidMap";
import MapSelectionButtons from "./components/MapSelectionButtons";
import LoadCountriesTask from "./tasks/LoadCountriesTask";
import buildLegends from "./tasks/BuildLegendsTask";
import Charts from "./components/Charts"


import { useAlert } from 'react-alert'

const App = () => {
    const views = ["Cumulative Cases", "New Cases(21 Days)", "7-Day-Incidence", "ICU-Occupancy", "Cumulative Fatalities", "Testing Rate", "Vaccinated Population"];
    const [countries, setCountries] = useState([]);
    const [activeLegend, setActiveLegend] = useState(views[0]);
    const [activeFocus, setActiveFocus] = useState("World");
    const [lastUpdate, setLastUpdate] = useState();
    /* -------------------------------------------------
    * Tassias Code : 
    * -------------------------------------------------- */
    // Sate um nachzuvollziehen, welche Country auf der CovidMap ausgewählt wurde
    const [activeCountry, setActiveCountry] = useState("World");
    // State um die kompletten Daten der API zu speichern (ohne Formatierung für die CovidMap) für die Charts
    const [completeData, setCompleteData] = useState();//{World:[]}
    const [countryList,setcountryList] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [selectedCountries,setSelectedCountries] = useState([{ value: 'World', label: 'World'}]);
    const [WorldData, setWorldData] = useState([]);
    const alert = useAlert()

    const legends = buildLegends(
        views,
        [5_000_000, 500_000, 5000, 100, 100_000, 500_000, 500_000]
    );

    const load = () => {
        const loadCountriesTask = new LoadCountriesTask();
        loadCountriesTask.load(setCountries, setLastUpdate, setCompleteData);
    };
    
    useEffect(load, []);
      
    return (
        <div className="page">
            <TopRow lastUpdate={lastUpdate} activeFocus={activeFocus} setActiveFocus={setActiveFocus}/>
            <InfoPanel legends={legends} active={activeLegend}/>
            <div style={{height:"90vh", width:"70vw", float:"left"}}>
               {countries.length === 0 ? (
                   <LoadingMap/>
               ) : (<>
                        <CovidMap countries={countries} legends={legends} active={activeLegend} setActiveCountry={setActiveCountry}/>
                   </>
               )}
            <MapSelectionButtons active={activeLegend} setActiveLegend={setActiveLegend} views={views}/>
            </div>
            <Charts  activeLegend={activeLegend} activeCountry={activeCountry} completeData={completeData} lastUpdate={lastUpdate}
                startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}
                countryList={countryList} setcountryList={setcountryList} 
                selectedCountries={selectedCountries} setSelectedCountries={setSelectedCountries} WorldData={WorldData} setWorldData={setWorldData}
                alert={alert}/>
        </div>
    );
};

export default App;
