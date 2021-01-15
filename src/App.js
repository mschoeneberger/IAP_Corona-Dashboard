import React, { useState, useEffect } from 'react';
import './App.css';
import TopRow from "./components/TopRow";
import InfoPanel from "./components/InfoPanel";
import LoadingMap from "./components/LoadingMap";
import CovidMap from "./components/CovidMap";
import MapSelectionButtons from "./components/MapSelectionButtons";
import LoadCountriesTask from "./tasks/LoadCountriesTask";
import legendItemsCCases from "./entities/LegendItems";
import buildLegends from "./tasks/BuildLegendsTask";
import Charts from "./components/Charts"

const App = () => {
    const [countries, setCountries] = useState([]);

    const load = () => {
        const loadCountriesTask = new LoadCountriesTask();
        loadCountriesTask.load(setCountries);
    };

    // const legends = buildLegends(["cases", "active", "incedence", "icu", "deaths", "tests", "vaccination"]);
    useEffect(load, []);

    return (
        <div className="page">
            <TopRow/>
            <InfoPanel legendItems={legendItemsCCases}/>
            <div style={{height:"90vh", width:"70vw", float:"left"}}>
               {countries.length === 0 ? (
                   <LoadingMap/>
               ) : (
                   <CovidMap countries={countries}/>
               )}
            <MapSelectionButtons/>
            </div>
            <Charts/>
        </div>
    );
};

export default App;
