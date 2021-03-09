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
    // views are the different categories of data we want to display
    const views = ["Cumulative Cases", "New Cases(21 Days)", "7-Day-Incidence", "ICU-Occupancy", "Cumulative Fatalities", "Testing Rate", "Vaccinated Population"];
    // countries for the world focus
    const [countries, setCountries] = useState([]);
    // "countries" aka regions for the regional focus
    const [europeCountries, setEuropeCountries] = useState([]);
    // hook to display the correct (map)legend for the active view
    const [activeLegend, setActiveLegend] = useState(views[0]);
    // hook to display the correct (map)focus: world/regions
    const [activeFocus, setActiveFocus] = useState("World");
    // hook to display the correct Date for the UpdatePanel
    const [lastUpdate, setLastUpdate] = useState();

    //Building the legends for the world focus
    const legends = buildLegends(
        views,
        // These numbers are arbitrary, but the coloured map looks cool.
        [5_000_000, 500_000, 500, 100, 100_000, 500_000, 500_000]
    );
    //Doing the same for the region focus, with slightly different values though
    const regionLegends = buildLegends(
        views,
        [200_000, 20_000, 150, 100, 10_000, 50_000, 50_000]
    );

    //Function to load the Geo- & Coronadata for both focuses
    const load = () => {
        const loadCountriesTask = new LoadCountriesTask();
        loadCountriesTask.load(setCountries, setLastUpdate);
        const loadEuropeTask = new LoadEuropeTask();
        loadEuropeTask.load(setEuropeCountries);
    };

    //Executing the load function in the background
    useEffect(load, []);

    return (
        <div className="page">
            <TopRow lastUpdate={lastUpdate} activeFocus={activeFocus} setActiveFocus={setActiveFocus}/>
            <InfoPanel legends={legends} active={activeLegend}/>
            <div style={{height:"90vh", width:"70vw", float:"left"}}>
                {/* This div is only there to fix a visual glitch when changing focus */}
                <div style={{height:"80vh", width:"70vw", float:"left"}}>
                    {/* Depending on the activeFocus either the CovidMap or the EuropeCovidMap is displayed. */}
                    {activeFocus === "World" ? (countries.length === 0 ? (
                        // If the background loading of the data is not quite done yet, display a loading symbol.
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
                </div>
                <MapSelectionButtons active={activeLegend} setActiveLegend={setActiveLegend} views={views}/>
            </div>
        </div>
    );
};

export default App;
