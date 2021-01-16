import React from 'react';
import {MapContainer, GeoJSON} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./CovidMap.css";
import formatNumberWithPeriods from "../tasks/formatNumberWithPeriods";

const CovidMap = (props) => {
    const mapStyle = {
        fillColor: "white",
        weight: 1,
        color: "black",
        fillOpacity: 1,
    };

    function colorCountry (country) {
        const legend = props.legends[1];
        console.log(legend);
        for(let i=0; i<legend.length; i++){
            if(country.properties.confirmed >= legend[i].from &&
                country.properties.confirmed < legend[i].to
                ){
                    return legend[i].color;
                }
        }
    }

    const onEachCountry = (country, layer) => {
        layer.options.fillColor = colorCountry(country);
        const name = country.properties.ADMIN;
        const confirmedCases = formatNumberWithPeriods(country.properties.confirmed);
        const population = formatNumberWithPeriods(country.properties.population);
        layer.bindPopup(
                `${name}
                <br/> Cases: ${confirmedCases}
                <br/> Population: ${population} 
                <br/> Ratio: ${(country.properties.confirmed/country.properties.population * 100).toFixed(3)} %
            `
            );
    };

    return <MapContainer zoom={2.5} center={[45, 10]}>
        <GeoJSON style={mapStyle} data={props.countries} onEachFeature={onEachCountry}/>
    </MapContainer>;
};
 
export default CovidMap;