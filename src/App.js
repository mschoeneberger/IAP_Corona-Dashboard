import React, { useState, useEffect } from 'react';
import './App.css';
import TopRow from "./components/TopRow";
import InfoPanel from "./components/InfoPanel";
import LoadingMap from "./components/LoadingMap";
import CovidMap from "./components/CovidMap";
import MapSelectionButtons from "./components/MapSelectionButtons";
import LoadCountriesTask from "./tasks/LoadCountriesTask";
import buildLegends from "./tasks/BuildLegendsTask";
import LoadEuropeTask from "./tasks/LoadEuropeTask.js";
import EuropeCovidMap from "./components/EuropeCovidMap";

const App = () => {
    const views = ["Cumulative Cases", "New Cases(21 Days)", "7-Day-Incidence", "ICU-Occupancy", "Cumulative Fatalities", "Testing Rate", "Vaccinated Population"];
    const [countries, setCountries] = useState([]);
    const [europeCountries, setEuropeCountries] = useState([]);
    const [activeLegend, setActiveLegend] = useState(views[0]);
    const [activeFocus, setActiveFocus] = useState("World");
    const [lastUpdate, setLastUpdate] = useState();

    const legends = buildLegends(
        views,
        [5_000_000, 500_000, 500, 100, 100_000, 500_000, 500_000]
    );
    const regionLegends = buildLegends(
        views,
        [200_000, 20_000, 150, 100, 10_000, 50_000, 50_000]
    );

    const load = () => {
        const loadCountriesTask = new LoadCountriesTask();
        loadCountriesTask.load(setCountries, setLastUpdate);
        const loadEuropeTask = new LoadEuropeTask();
        loadEuropeTask.load(setEuropeCountries);
    };

    useEffect(load, []);

    return (
        <div className="page">
            <TopRow lastUpdate={lastUpdate} activeFocus={activeFocus} setActiveFocus={setActiveFocus}/>
            <InfoPanel legends={legends} active={activeLegend}/>
            <div style={{height:"90vh", width:"70vw", float:"left"}}>
               {activeFocus === "World" ? (countries.length === 0 ? (
                   <LoadingMap/>
               ) : (<>
                        <CovidMap countries={countries} legends={legends} active={activeLegend}/>
                   </>
               )) : (europeCountries.length === 0 ? (
                   <LoadingMap/>
               ) : (<>
                        <EuropeCovidMap regions={europeCountries} legends={regionLegends} active={activeLegend}/>
                   </>
               ))}
            <MapSelectionButtons active={activeLegend} setActiveLegend={setActiveLegend} views={views}/>
            </div>
        </div>
    );
};

export default App;
