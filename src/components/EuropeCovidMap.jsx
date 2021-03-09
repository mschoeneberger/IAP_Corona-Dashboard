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
    function getRelevantData(region, active){
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
                relevantData = [region.properties.cumulativeDeaths];
                relevantData.push("Fatalities: " + formatNumberWithSpaces(region.properties.cumulativeDeaths));
                relevantData.push("Recovered: " + formatNumberWithSpaces(region.properties.cumulativeRecovered));
                relevantData.push("Mortality Rate: " + (region.properties.mortalityRate * 100).toFixed(3).toString() + "%");
                return relevantData;
            case "ICU-Occupancy":
                relevantData = [0]
                relevantData.push("");
                relevantData.push("");
                relevantData.push("");
                return relevantData;
            case "7-Day-Incidence":
                relevantData = [region.properties.incidentRate];
                relevantData.push("7-Day-Incidence: " + region.properties.incidentRate.toFixed(3));
                relevantData.push("");
                relevantData.push("");
                return relevantData;
            case "New Cases(21 Days)":
                relevantData = [region.properties.active];
                relevantData.push("New Cases(21 Days): " + formatNumberWithSpaces(region.properties.active));
                relevantData.push("Population: " + formatNumberWithSpaces(region.properties.population));
                relevantData.push("Ratio: " + (region.properties.active/region.properties.population * 100).toFixed(5) + "%");
                return relevantData;
            case "Cumulative Cases":
                relevantData = [region.properties.confirmed];
                relevantData.push("Cases: " + formatNumberWithSpaces(region.properties.cumulativeCases));
                relevantData.push("Population: " + formatNumberWithSpaces(region.properties.population));
                relevantData.push("Ratio: " + (region.properties.cumulativeCases/region.properties.population * 100).toFixed(3) + "%");
                return relevantData;
            default:
                return [0,"","",""];
        }
    }

    const onEachRegion = (region, layer) => {
        const relevantData = getRelevantData(region,props.active);
        layer.options.fillColor = colorCountry(relevantData[0]);
        const item1 = relevantData[1];
        const item2 = relevantData[2];
        const item3 = relevantData[3];
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