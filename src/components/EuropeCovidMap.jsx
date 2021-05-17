import React from 'react';
import {MapContainer, GeoJSON, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./EuropeCovidMap.css";
import formatNumberWithSpaces from "../tasks/formatNumberWithSpaces";
import {v4 as uuidv4} from "uuid";

//Cumulative: CCases, Population, CCases/Population-Ratio
//New Cases(21 Days): ACases, Population, ACases/Population-Ratio
//7-Day-Incendence: Incidence-Rate, 7-day-cases, 14-day-cases?
//ICU-Occupancy: Percentage, ICU-Beds, ICU-Occupancy
//CFatalities: CFatalities, Recovered, CFatalities/Recovered-Ratio
//Testing Rate: Tests/week, Population, Tests/week/population-Ratio
//Vaccinated Pop: Vaccinated, Population, Vaccinated/Population-Ratio

const EuropeCovidMap = (props) => {
    const mapStyle = {
        fillColor: "white",
        weight: 1,
        color: "black",
        fillOpacity: 0.7,
    };

    function colorRegion (key) {
        var legendIndex = props.legends[0].findIndex((legendName)=>{return legendName === props.active;}) + 1;
        const legend = props.legends[legendIndex];
        for(let i=0; i<legend.length; i++){
            if(key >= legend[i].from &&
                key < legend[i].to
                ){
                    return legend[i].color;
                }
        }
    }
//[key, item1string, item2string, item3string]
    function getRelevantData(region, active){
        var relevantData;
        switch(active){
            case "Cumulative Fatalities":
                 relevantData = {"English": [region.properties.fatalities], "Deutsch": [region.properties.fatalities]};
                relevantData["English"].push("Fatalities: " + formatNumberWithSpaces(region.properties.fatalities));
                relevantData["English"].push("Recovered: " + formatNumberWithSpaces(region.properties.recovered));
                relevantData["English"].push("Mortality Rate: " + (region.properties.mortalityRate * 100).toFixed(3).toString() + "%");
                relevantData["Deutsch"].push("Todesfälle: " + formatNumberWithSpaces(region.properties.fatalities));
                relevantData["Deutsch"].push("Genesen: " + formatNumberWithSpaces(region.properties.recovered));
                relevantData["Deutsch"].push("Sterblichkeitsrate: " + (region.properties.mortalityRate * 100).toFixed(3).toString() + "%");
                return relevantData;
            case "ICU-Occupancy":
                relevantData = {"English": [0], "Deutsch": [0]};
                relevantData["English"].push("");
                relevantData["English"].push("");
                relevantData["English"].push("");
                relevantData["Deutsch"].push("");
                relevantData["Deutsch"].push("");
                relevantData["Deutsch"].push("");
                return relevantData;
            case "7-Day-Incidence":
                relevantData = {"English": [region.properties.incidentRate], "Deutsch": [region.properties.incidentRate]};
                relevantData["English"].push("7-Day-Incidence: " + region.properties.incidentRate.toFixed(3));
                relevantData["English"].push("Cases (7 Days): " + formatNumberWithSpaces(region.properties.last7));
                relevantData["English"].push("Population: " + formatNumberWithSpaces(region.properties.population));
                relevantData["Deutsch"].push("7-Tages-Inzidenz: " + region.properties.incidentRate.toFixed(3));
                relevantData["Deutsch"].push("Neue Fälle (7 Tage): " + formatNumberWithSpaces(region.properties.last7));
                relevantData["Deutsch"].push("Einwohner: " + formatNumberWithSpaces(region.properties.population));
                return relevantData;
            case "New Cases(21 Days)":
                relevantData = {"English": [region.properties.active], "Deutsch": [region.properties.active]};
                relevantData["English"].push("New Cases(21 Days): " + formatNumberWithSpaces(region.properties.active));
                relevantData["English"].push("Population: " + formatNumberWithSpaces(region.properties.population));
                relevantData["English"].push("Ratio: " + (region.properties.active/region.properties.population * 100).toFixed(5) + "%");
                relevantData["Deutsch"].push("Neue Fälle (21 Tage): " + formatNumberWithSpaces(region.properties.active));
                relevantData["Deutsch"].push("Einwohner: " + formatNumberWithSpaces(region.properties.population));
                relevantData["Deutsch"].push("Verhältnis: " + (region.properties.active/region.properties.population * 100).toFixed(5) + "%");
                return relevantData;
            case "Cumulative Cases":
                relevantData = {"English": [region.properties.confirmed], "Deutsch": [region.properties.confirmed]};
                relevantData["English"].push("Total Cases: " + formatNumberWithSpaces(region.properties.confirmed));
                relevantData["English"].push("Population: " + formatNumberWithSpaces(region.properties.population));
                relevantData["English"].push("Ratio: " + (region.properties.confirmed/region.properties.population * 100).toFixed(3) + "%");
                relevantData["Deutsch"].push("Fälle Gesamt: " + formatNumberWithSpaces(region.properties.confirmed));
                relevantData["Deutsch"].push("Einwohner: " + formatNumberWithSpaces(region.properties.population));
                relevantData["Deutsch"].push("Verhältnis: " + (region.properties.confirmed/region.properties.population * 100).toFixed(3) + "%");
                return relevantData;
            default:
                return [0,"","",""];
        }
    }

    const onEachRegion = (region, layer) => {
        const relevantData = getRelevantData(region,props.active);
        layer.options.fillColor = colorRegion(relevantData[props.activeLanguage][0]);
        const item1 = relevantData[props.activeLanguage][1];
        const item2 = relevantData[props.activeLanguage][2];
        const item3 = relevantData[props.activeLanguage][3];
        layer.bindPopup(
                `${region.properties.name}
                <br/> ${item1}
                <br/> ${item2}
                <br/> ${item3}
            `
            );
    };

    return <MapContainer zoom={5} center={[50, 9]}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <GeoJSON key={uuidv4()} style={mapStyle} data={props.regions} onEachFeature={onEachRegion}/>
    </MapContainer>;
};
 
export default EuropeCovidMap;