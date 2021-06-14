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


export default class EuropeCovidMap extends React.Component {
        constructor(props) {
            super(props);
        
            this.mapStyle = {
                fillColor: "white",
                weight: 1,
                color: "black",
                fillOpacity: 0.7,
            };
        }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.active == this.props.active && nextProps.activeLanguage == this.props.activeLanguage && nextProps.rerenderMap.length == this.props.rerenderMap.length){
            return false;
            } else {
            return true;
            }
        }

    colorRegion(key) {
        var legendIndex = this.props.legends[0].findIndex((legendName)=>{return legendName === this.props.active;}) + 1;
        const legend = this.props.legends[legendIndex];
        for(let i=0; i<legend.length; i++){
            if(key >= legend[i].from &&
                key < legend[i].to
                ){
                    return legend[i].color;
                }
        }
    }

    //[key, item1string, item2string, item3string]
    getRelevantData(region, active){
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
                // region.properties.its_freie_betten = covidRegion[newestIndex].k;
                //         region.properties.its_belegt= covidRegion[newestIndex].j;
                //         region.properties.its_freie_beatmung= covidRegion[newestIndex].l;
                //         region.properties.its_covid_patienten= covidRegion[newestIndex].i;
                relevantData = {"English": [100 * region.properties.its_belegt / (region.properties.its_belegt + region.properties.its_freie_betten)], "Deutsch": [100 * region.properties.its_belegt / (region.properties.its_belegt + region.properties.its_freie_betten)]};
                relevantData["English"].push("ICU-Occupancy: " + (100 * region.properties.its_belegt / (region.properties.its_belegt + region.properties.its_freie_betten)).toFixed(3) + "%");
                relevantData["English"].push("Covid patients in ICU: " + formatNumberWithSpaces(region.properties.its_covid_patienten));
                relevantData["English"].push("Unoccupied ICU beds: " + formatNumberWithSpaces(region.properties.its_freie_betten));
                relevantData["English"].push("Unoccupied ventilators: " + formatNumberWithSpaces(region.properties.its_freie_betten));
                relevantData["Deutsch"].push("Intensivbettenbelegung: " + (100 * region.properties.its_belegt / (region.properties.its_belegt + region.properties.its_freie_betten)).toFixed(3) + "%");
                relevantData["Deutsch"].push("Coronapatienten auf Intensivstation: " + formatNumberWithSpaces(region.properties.its_covid_patienten));
                relevantData["Deutsch"].push("Freie Intensivbetten: " + formatNumberWithSpaces(region.properties.its_freie_betten));
                relevantData["Deutsch"].push("Freie Beatmungsgeräte: " + formatNumberWithSpaces(region.properties.its_freie_betten));
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

    onEachRegion = (region, layer) => {
        const relevantData = this.getRelevantData(region,this.props.active);
        layer.options.fillColor = this.colorRegion(relevantData[this.props.activeLanguage][0]);
        const item1 = relevantData[this.props.activeLanguage][1];
        const item2 = relevantData[this.props.activeLanguage][2];
        const item3 = relevantData[this.props.activeLanguage][3];

        // Charts: set state activeRegion
        layer.on({
            click: (e) => {
                this.props.setActiveRegion({country: region.properties.origin, region: region.properties.name})
            }
        })

        layer.bindPopup(
                `${region.properties.name}
                <br/> ${item1}
                <br/> ${item2}
                <br/> ${item3}
            `
        );
    };

    render() {
        return <MapContainer zoom={5} center={[50, 9]}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            <GeoJSON key={uuidv4()} style={this.mapStyle} data={this.props.regions} onEachFeature={this.onEachRegion}/>
        </MapContainer>;
    }
}