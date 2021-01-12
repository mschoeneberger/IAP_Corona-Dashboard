import React, { useState, useEffect } from 'react';
import './App.css';
import TopRow from "./components/TopRow";
import InfoPanel from "./components/InfoPanel";
import LoadingMap from "./components/LoadingMap";
import CovidMap from "./components/CovidMap";
import MapSelectionButtons from "./components/MapSelectionButtons";
import LoadCountriesTask from "./tasks/LoadCountriesTask";
import legendItems from "./entities/LegendItems";

const App = () => {
    const [countries, setCountries] = useState([]);

    const load = () => {
        const loadCountriesTask = new LoadCountriesTask();
        loadCountriesTask.load(setCountries);
    };

    useEffect(load, []);

    return (
        <div className="page">
            <TopRow/>
            <InfoPanel legendItems={legendItems}/>
            <div style={{height:"90vh", width:"70vw", float:"left"}}>
               {countries.length === 0 ? (
                   <LoadingMap/>
               ) : (
                   <CovidMap countries={countries}/>
               )}
            <MapSelectionButtons/>
            </div>
        </div>
    );
};

export default App;
