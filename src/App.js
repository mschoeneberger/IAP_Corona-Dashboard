import React, { useState, useEffect } from 'react';
import './App.css';
import TopRow from "./components/TopRow";
import InfoPanel from "./components/InfoPanel";
import LoadingMap from "./components/LoadingMap";
// Neue Implementierung von CovidMap als Klasse. 
// Das ermöglicht das Zeigen der Popups und Selektieren der Länder für den Chart.
// Genaueres in Kommentaren in CovidMap_Class.xjs
import CovidMap from "./components/CovidMap_Class";
import MapSelectionButtons from "./components/MapSelectionButtons";
import LoadCountriesTask from "./tasks/LoadCountriesTask";
import buildLegends from "./tasks/BuildLegendsTask";
import LoadEuropeTask from "./tasks/LoadEuropeTask.js";
import EuropeCovidMap from "./components/EuropeCovidMap";
import ChartsWrapper from "./components/ChartsWrapper";
import InfoWindow from "./components/InfoWindow";
import Charts_Vacc from './components/Vacc';

// TODO: 
// Code für Präsentation auskommentieren
// DropdownMenü Einträge sollten etwas tun oder entfernt werden
// Nicht benötigte MapSelectionButtons entfernen
// Coronadaten für Regions einlesen
// Zugriff für Weltdaten überprüfen (veraltet?)
// Anpassung für mobile Geräte
// Generelles Styling überarbeiten
// Map-Translation: Gebietsnamen übersetzen?
// Map/Legend Anpassungen: Tilelayer-OSM? Farbkorrektur aufgrund von Transparenz?

const App = () => {
    // views are the different categories of data we want to display
    const worldViews = ["Cumulative Cases", "New Cases(21 Days)", "7-Day-Incidence", "Cumulative Fatalities"];
    const regionViews = ["Cumulative Cases", "New Cases(21 Days)", "7-Day-Incidence", "ICU-Occupancy", "Cumulative Fatalities"];
    // countries for the world focus
    const [countries, setCountries] = useState([]);
    // "countries" aka regions for the regional focus
    const [europeCountries, setEuropeCountries] = useState([]);
    // hook to display the correct (map)legend for the active view
    const [activeLegend, setActiveLegend] = useState(worldViews[0]);
    // hook to display the correct (map)focus: world/regions
    const [activeFocus, setActiveFocus] = useState("World");
    // hook to display the correct Date for the UpdatePanel
    const [lastUpdate, setLastUpdate] = useState();
    const [activeLanguage, setActiveLanguage] = useState("English");
    // hook to display or hide the InfoWindow component.
    const [infoWindow,setInfoWindow] = useState("hidden");

    //Building the legends for the world focus
    const legends = buildLegends(
        worldViews,
        // These numbers are arbitrary, but the coloured map looks cool.
        [10_000_000, 500_000, 200, 500_000]
    );
    //Doing the same for the region focus, with slightly different values though
    const regionLegends = buildLegends(
        regionViews,
        [200_000, 10_000, 200, 85, 10_000])
    
    // states for the charts:
    // Sate um nachzuvollziehen, welche Country auf der CovidMap ausgewählt wurde
    const [activeCountry, setActiveCountry] = useState("World");
    const [activeRegion, setActiveRegion] = useState();
    // State um die kompletten Daten der API zu speichern (ohne Formatierung für die CovidMap) für die Charts
    const [completeData, setCompleteData] = useState();//{World:[]}
    // hook to save the list of all countries once the data is acquired. This list is needed for the country select box 
    const [completeRegionData, setCompleteRegionData] = useState();

    //Function to load the Geo- & Coronadata for both focuses
    const load = () => {
        const loadCountriesTask = new LoadCountriesTask();
        loadCountriesTask.load(setCountries, setLastUpdate, setCompleteData);
        const loadEuropeTask = new LoadEuropeTask();
        loadEuropeTask.load(setEuropeCountries, setCompleteRegionData);
    };


    useEffect(load, []);
      
    if (activeFocus === "Vaccination") return (
        <div style={{overflow: "hidden"}}>
            <div className="page">
                <TopRow lastUpdate={lastUpdate} activeFocus={activeFocus} setActiveFocus={setActiveFocus} activeLanguage={activeLanguage} setInfoWindow={setInfoWindow} activeLegend={activeLegend} setActiveLegend={setActiveLegend}/>
                <div style={{height:"90%", width:"100%", display:"flex", flexDirection:"row"}}>
                    <InfoPanel legends={legends} regionLegends={regionLegends} focus={activeFocus} active={activeLegend} activeLanguage={activeLanguage} setActiveLanguage={setActiveLanguage}/>
                    <div style={{height:"100%", flexBasis:"70%", flexGrow:"2", display:"flex", flexDirection:"column"}}>
                        {/* This div is only there to fix a visual glitch when changing focus */}
                        <div style={{flexGrow:"16", flexBasis:"80%", width:"100%", display:"flex"}}>
                            <Charts_Vacc completeRegionData={completeRegionData} activeFocus={activeFocus} lastUpdate={lastUpdate}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    else if(infoWindow === "hidden") return (
        <div style={{overflow: "hidden"}}>
            <div className="page">
                <TopRow lastUpdate={lastUpdate} activeFocus={activeFocus} setActiveFocus={setActiveFocus} activeLanguage={activeLanguage} setInfoWindow={setInfoWindow} activeLegend={activeLegend} setActiveLegend={setActiveLegend}/>
                <div style={{height:"90%", width:"100%", display:"flex", flexDirection:"row"}}>
                    <InfoPanel legends={legends} regionLegends={regionLegends} focus={activeFocus} active={activeLegend} activeLanguage={activeLanguage} setActiveLanguage={setActiveLanguage}/>
                    <div style={{height:"100%", flexBasis:"70%", flexGrow:"2", display:"flex", flexDirection:"column"}}>
                        {/* This div is only there to fix a visual glitch when changing focus */}
                        <div style={{flexGrow:"16", flexBasis:"80%", width:"100%", display:"flex"}}>
                            {/* Depending on the activeFocus either the CovidMap or the EuropeCovidMap is displayed. */}
                            {activeFocus === "World" ? (countries.length === 0 ? (
                                // If the background loading of the data is not quite done yet, display a loading symbol.
                               <LoadingMap/>
                            ) : (<>
                                    <CovidMap countries={countries} legends={legends} active={activeLegend} activeLanguage={activeLanguage} setActiveCountry={setActiveCountry}/>
                                </>
                                  
                            )) : (europeCountries.length === 0 ? (
                               <LoadingMap/>
                            ) : (<>
                                    <EuropeCovidMap rerenderMap={completeRegionData} regions={europeCountries} legends={regionLegends} active={activeLegend} activeLanguage={activeLanguage} setActiveRegion={setActiveRegion}/>
                                </>
                            ))}
                        </div>
                        <MapSelectionButtons active={activeLegend} setActiveLegend={setActiveLegend} views={[worldViews,regionViews]} activeLanguage={activeLanguage} focus={activeFocus}/>
                    </div>
                </div>
            </div>
            <ChartsWrapper  activeLegend={activeLegend} activeCountry={activeCountry} activeRegion={activeRegion} completeData={completeData} completeRegionData={completeRegionData} activeFocus={activeFocus} lastUpdate={lastUpdate}/>
        </div>   
        );
    else return (
        <div className="page">
            <InfoWindow infoWindow={infoWindow} setInfoWindow={setInfoWindow} activeLanguage={activeLanguage}/>
        </div>
    )
};

export default App;
