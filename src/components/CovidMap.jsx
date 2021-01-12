import React from 'react';
import {MapContainer, GeoJSON} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./CovidMap.css";

const CovidMap = ({countries}) => {
    const mapStyle = {
        fillColor: "white",
        weight: 1,
        color: "black",
        fillOpacity: 1,
    };

    const onEachCountry = (country, layer) => {
        //Filling each Country with info/color. This has to change depending on the selected button.
        layer.options.fillColor = country.properties.color;
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
        <GeoJSON style={mapStyle} data={countries} onEachFeature={onEachCountry}/>
    </MapContainer>;
};

 function formatNumberWithPeriods (number) {
   return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

 
export default CovidMap;