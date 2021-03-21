import React from 'react';
import {MapContainer, GeoJSON, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./CovidMap.css";
import formatNumberWithSpaces from "../tasks/formatNumberWithSpaces";
import {v4 as uuidv4} from "uuid";

//Cumulative: CCases, Population, CCases/Population-Ratio
//New Cases(21 Days): ACases, Population, ACases/Population-Ratio
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
        fillOpacity: 0.8,
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
                relevantData = {"English": [0], "Deutsch": [0]};
                relevantData["English"].push("");
                relevantData["English"].push("");
                relevantData["English"].push("");
                relevantData["Deutsch"].push("");
                relevantData["Deutsch"].push("");
                relevantData["Deutsch"].push("");
                return relevantData;
            case "Testing Rate":
                relevantData = {"English": [0], "Deutsch": [0]};
                relevantData["English"].push("");
                relevantData["English"].push("");
                relevantData["English"].push("");
                relevantData["Deutsch"].push("");
                relevantData["Deutsch"].push("");
                relevantData["Deutsch"].push("");
                return relevantData;
            case "Cumulative Fatalities":
                 relevantData = {"English": [country.properties.fatalities], "Deutsch": [country.properties.fatalities]};
                relevantData["English"].push("Fatalities: " + formatNumberWithSpaces(country.properties.fatalities));
                relevantData["English"].push("Recovered: " + formatNumberWithSpaces(country.properties.recovered));
                relevantData["English"].push("Mortality Rate: " + (country.properties.mortalityRate * 100).toFixed(3).toString() + "%");
                relevantData["Deutsch"].push("Todesfälle: " + formatNumberWithSpaces(country.properties.fatalities));
                relevantData["Deutsch"].push("Genesen: " + formatNumberWithSpaces(country.properties.recovered));
                relevantData["Deutsch"].push("Sterblichkeitsrate: " + (country.properties.mortalityRate * 100).toFixed(3).toString() + "%");
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
                relevantData = {"English": [country.properties.incidentRate], "Deutsch": [country.properties.incidentRate]};
                relevantData["English"].push("7-Day-Incidence: " + country.properties.incidentRate.toFixed(3));
                relevantData["English"].push("Population: " + formatNumberWithSpaces(country.properties.population));
                relevantData["English"].push("");
                relevantData["Deutsch"].push("7-Tages-Inzidenz: " + country.properties.incidentRate.toFixed(3));
                relevantData["Deutsch"].push("Einwohner: " + formatNumberWithSpaces(country.properties.population));
                relevantData["Deutsch"].push("");
                return relevantData;
            case "New Cases(21 Days)":
                relevantData = {"English": [country.properties.active], "Deutsch": [country.properties.active]};
                relevantData["English"].push("New Cases(21 Days): " + formatNumberWithSpaces(country.properties.active));
                relevantData["English"].push("Population: " + formatNumberWithSpaces(country.properties.population));
                relevantData["English"].push("Ratio: " + (country.properties.active/country.properties.population * 100).toFixed(5) + "%");
                relevantData["Deutsch"].push("Neue Fälle (21 Tage): " + formatNumberWithSpaces(country.properties.active));
                relevantData["Deutsch"].push("Einwohner: " + formatNumberWithSpaces(country.properties.population));
                relevantData["Deutsch"].push("Verhältnis: " + (country.properties.active/country.properties.population * 100).toFixed(5) + "%");
                return relevantData;
            case "Cumulative Cases":
                relevantData = {"English": [country.properties.confirmed], "Deutsch": [country.properties.confirmed]};
                relevantData["English"].push("Total Cases: " + formatNumberWithSpaces(country.properties.confirmed));
                relevantData["English"].push("Population: " + formatNumberWithSpaces(country.properties.population));
                relevantData["English"].push("Ratio: " + (country.properties.confirmed/country.properties.population * 100).toFixed(3) + "%");
                relevantData["Deutsch"].push("Fälle Gesamt: " + formatNumberWithSpaces(country.properties.confirmed));
                relevantData["Deutsch"].push("Einwohner: " + formatNumberWithSpaces(country.properties.population));
                relevantData["Deutsch"].push("Verhältnis: " + (country.properties.confirmed/country.properties.population * 100).toFixed(3) + "%");
                return relevantData;
            default:
                return [0,"","",""];
        }
    }

    const onEachCountry = (country, layer) => {
        const relevantData = getRelevantData(country,props.active);
        layer.options.fillColor = colorCountry(relevantData[props.activeLanguage][0]);
        const item1 = relevantData[props.activeLanguage][1];
        const item2 = relevantData[props.activeLanguage][2];
        const item3 = relevantData[props.activeLanguage][3];
        layer.bindPopup(
                `${country.properties.ADMIN}
                <br/> ${item1}
                <br/> ${item2} 
                <br/> ${item3}
            `
            );
             /* ----------------------------------------------------------------------------------------------------
             * Tassias Code : Setzt den ActiveCountry State auf die Country, die in der CovidMap selektiert wird
             * ---------------------------------------------------------------------------------------------------- */
            layer.on({
                click: (e) => {
                    let country_name = country.properties.ADMIN
                    console.log(country_name)
                    props.setActiveCountry(country_name)
                }
            })
        };
        // function func (oEvent){
        //     console.log(oEvent)
        // }

    return <MapContainer zoom={2.5} center={[45, 10]}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <GeoJSON key={uuidv4()} style={mapStyle} data={props.countries} onEachFeature={onEachCountry}/>
    </MapContainer>;
};
 
export default CovidMap;