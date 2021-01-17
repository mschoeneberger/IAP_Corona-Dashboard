import React from 'react';
import {MapContainer, GeoJSON} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./CovidMap.css";
import formatNumberWithSpaces from "../tasks/formatNumberWithSpaces";
import {v4 as uuidv4} from "uuid";

//Cumulative: CCases, Population, CCases/Population-Ratio
//Active: ACases, Population, ACases/Population-Ratio
//7-Day-Incendence: Incidence-Rate, 7-day-cases, 14-day-cases?
//ICU-Occupancy: Percentage, ICU-Beds, ICU-Occupancy
//CFatalities: CFatalities, Recovered, CFatalities/Recovered-Ratio
//Testing Rate: Tests/week, Population, Tests/week/population-Ratio
//Vaccinated Pop: Vaccinated, Population, Vaccinated/Population-Ratio

const CovidMap = (props) => {
    const mapStyle = {
        fillColor: "white",
        weight: 1,
        color: "black",
        fillOpacity: 1,
    };

    function colorCountry (key) {
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
    function getRelevantData(country, active){
        var relevantData;
        switch(active){
            case "Vaccinated Population":
                relevantData = [0]
                relevantData.push("");
                relevantData.push("");
                relevantData.push("");
                return relevantData;
            case "Testing Rate":
                relevantData = [0]
                relevantData.push("");
                relevantData.push("");
                relevantData.push("");
                return relevantData;
            case "Cumulative Fatalities":
                relevantData = [country.properties.fatalities];
                relevantData.push("Fatalities: " + formatNumberWithSpaces(country.properties.fatalities));
                relevantData.push("Recovered: " + formatNumberWithSpaces(country.properties.recovered));
                relevantData.push("Mortality Rate: " + country.properties.mortalityRate.toFixed(3).toString() + "%");
                return relevantData;
            case "ICU-Occupancy":
                relevantData = [0]
                relevantData.push("");
                relevantData.push("");
                relevantData.push("");
                return relevantData;
            case "7-Day-Incidence":
                relevantData = [country.properties.incidentRate];
                relevantData.push("7-Day-Incidence: " + country.properties.incidentRate.toFixed(3));
                relevantData.push("");
                relevantData.push("");
                return relevantData;
            case "Active Cases":
                relevantData = [country.properties.active];
                relevantData.push("Active Cases: " + formatNumberWithSpaces(country.properties.active));
                relevantData.push("Population: " + formatNumberWithSpaces(country.properties.population));
                relevantData.push("Ratio: " + (country.properties.active/country.properties.population * 100).toFixed(5) + "%");
                return relevantData;
            case "Cumulative Cases":
                relevantData = [country.properties.confirmed];
                relevantData.push("Cases: " + formatNumberWithSpaces(country.properties.confirmed));
                relevantData.push("Population: " + formatNumberWithSpaces(country.properties.population));
                relevantData.push("Ratio: " + (country.properties.confirmed/country.properties.population * 100).toFixed(3) + "%");
                return relevantData;
            default:
                return [0,"","",""];
        }
    }

    const onEachCountry = (country, layer) => {
        const relevantData = getRelevantData(country,props.active);
        layer.options.fillColor = colorCountry(relevantData[0]);
        const item1 = relevantData[1];
        const item2 = relevantData[2];
        const item3 = relevantData[3];
        layer.bindPopup(
                `${country.properties.ADMIN}
                <br/> ${item1}
                <br/> ${item2} 
                <br/> ${item3}
            `
            );
    };

    return <MapContainer zoom={2.5} center={[45, 10]}>
        <GeoJSON key={uuidv4()} style={mapStyle} data={props.countries} onEachFeature={onEachCountry}/>
    </MapContainer>;
};
 
export default CovidMap;