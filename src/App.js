import React, { useState, useEffect } from 'react';
import './App.css';
import TopRow from "./components/TopRow";
import InfoPanel from "./components/InfoPanel";
import LoadingMap from "./components/LoadingMap";
import CovidMap from "./components/CovidMap";
import MapSelectionButtons from "./components/MapSelectionButtons";
import LoadCountriesTask from "./tasks/LoadCountriesTask";
import buildLegends from "./tasks/BuildLegendsTask";

const App = () => {
    const views = ["Cumulative Cases", "Active Cases", "7-Day-Incedence", "ICU-Occupancy", "Cumulative Fatalities", "Testing Rate", "Vaccinated Population"];
    const [countries, setCountries] = useState([]);
    const [activeLegend, setActiveLegend] = useState(views[0]);

    const legends = buildLegends(
        views,
        [5_000_000, 50_000, 500, 100, 500_000, 100_000, 500_000]
    );

    const load = () => {
        const loadCountriesTask = new LoadCountriesTask();
        loadCountriesTask.load(setCountries);
    };

    useEffect(load, []);

    return (
        <div className="page">
            <TopRow/>
            <InfoPanel legends={legends} active={activeLegend}/>
            <div style={{height:"90vh", width:"70vw", float:"left"}}>
               {countries.length === 0 ? (
                   <LoadingMap/>
               ) : (
                   <CovidMap countries={countries} legends={legends} active={activeLegend}/>
               )}
            <MapSelectionButtons active={activeLegend} setActiveLegend={setActiveLegend} views={views}/>
            </div>
        </div>
    );
};

export default App;
