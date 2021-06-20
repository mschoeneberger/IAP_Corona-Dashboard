/* @Author: Tassi
* -----------------
* Ich habe den CovidMap Component als Klasse neu geschrieben. Der alte Funktional Component ist auch noch vorhanden.
* Das war notwendig, um die Popups der CovidMap zusammen mit dem Chart benutzen zu können.
* Ich habe den State ActiveCountry eingeführt, um in Charts.xjs zu wissen, welches Land in der CovidMap selektiert wurde.
* Dazu musste der State auf App.js level definiert werden und jeweils durch die Props die SetState funktion auf CovidMap-level und
* der State selber auf Chart.jsx level gepushed werden. Da eine Änderung im State den Component in dem er definiert ist
* und alle seine Kinder zum rerendern zwingt, hat sich bei der Selektion eines Landes App.js und damit auch CovidMap.jsx rerenderd
* und das Popup "überrenderd". Meines Wissens und langem googln zufolge gibt es in einen Fuctional Component keinen Weg,
* ihn vom rerendern nach einem Update abzuhalten. Ein Workaround wäre die React.memo() Funktion. Damit hatte ich aber auch kein Glück.
* In der Klassenimplementierung gibt es jedoch die Funktion shouldComponentUpdate() welcher vor jedem Update checkt, ob ein Rerender
* notwenig ist. Dort habe ich den ActiveCountry State rausgenommen und nun können die Popups trotz dieses States sichtbar bleiben.
*/


import React from 'react';
import {MapContainer, GeoJSON, TileLayer} from "react-leaflet";
import {popup} from "leaflet";
import "leaflet/dist/leaflet.css";
import "./CovidMap.css";
import formatNumberWithSpaces from "../tasks/formatNumberWithSpaces";
import {v4 as uuidv4} from "uuid";

export default class CovidMap extends React.Component {
    constructor(props) {
        super(props);
    
        this.mapStyle = {
            fillColor: "white",
            weight: 1,
            color: "black",
            fillOpacity: 0.8,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.active === this.props.active && nextProps.activeLanguage === this.props.activeLanguage && nextProps.mapDate === this.props.mapDate){
          return false;
        } else {
          return true;
        }
      }

    colorCountry = (key) => {
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
    getRelevantData = (country, active, mapDate) => {
        var relevantData;
        switch(active){
            case "Cumulative Fatalities":
                relevantData = {"English": [country.properties.coronadata[mapDate].fatalities], "Deutsch": [country.properties.coronadata[mapDate].fatalities]};
                relevantData["English"].push("Fatalities: " + formatNumberWithSpaces(country.properties.coronadata[mapDate].fatalities));
                relevantData["English"].push("Recovered: " + formatNumberWithSpaces(country.properties.coronadata[mapDate].recovered));
                relevantData["English"].push("Mortality Rate: " + (country.properties.coronadata[mapDate].mortalityRate * 100).toFixed(3).toString() + "%");
                relevantData["Deutsch"].push("Todesfälle: " + formatNumberWithSpaces(country.properties.coronadata[mapDate].fatalities));
                relevantData["Deutsch"].push("Genesen: " + formatNumberWithSpaces(country.properties.coronadata[mapDate].recovered));
                relevantData["Deutsch"].push("Sterblichkeitsrate: " + (country.properties.coronadata[mapDate].mortalityRate * 100).toFixed(3).toString() + "%");
                return relevantData;
            case "7-Day-Incidence":
                relevantData = {"English": [country.properties.coronadata[mapDate].incidentRate], "Deutsch": [country.properties.coronadata[mapDate].incidentRate]};
                relevantData["English"].push("7-Day-Incidence: " + country.properties.coronadata[mapDate].incidentRate.toFixed(3));
                relevantData["English"].push("New Cases (7 Days): " + formatNumberWithSpaces(country.properties.coronadata[mapDate].last7));
                relevantData["English"].push("Population: " + formatNumberWithSpaces(country.properties.population));
                relevantData["Deutsch"].push("7-Tages-Inzidenz: " + country.properties.coronadata[mapDate].incidentRate.toFixed(3));
                relevantData["Deutsch"].push("Neue Fälle (7 Tage): " + formatNumberWithSpaces(country.properties.coronadata[mapDate].last7));
                relevantData["Deutsch"].push("Einwohner: " + formatNumberWithSpaces(country.properties.population));
                return relevantData;
            case "New Cases(21 Days)":
                relevantData = {"English": [country.properties.coronadata[mapDate].active], "Deutsch": [country.properties.coronadata[mapDate].active]};
                relevantData["English"].push("New Cases(21 Days): " + formatNumberWithSpaces(country.properties.coronadata[mapDate].active));
                relevantData["English"].push("Population: " + formatNumberWithSpaces(country.properties.population));
                relevantData["English"].push("Ratio: " + (country.properties.coronadata[mapDate].active/country.properties.population * 100).toFixed(5) + "%");
                relevantData["Deutsch"].push("Neue Fälle (21 Tage): " + formatNumberWithSpaces(country.properties.coronadata[mapDate].active));
                relevantData["Deutsch"].push("Einwohner: " + formatNumberWithSpaces(country.properties.population));
                relevantData["Deutsch"].push("Verhältnis: " + (country.properties.coronadata[mapDate].active/country.properties.population * 100).toFixed(5) + "%");
                return relevantData;
            case "Cumulative Cases":
                relevantData = {"English": [country.properties.coronadata[mapDate].confirmed], "Deutsch": [country.properties.coronadata[mapDate].confirmed]};
                relevantData["English"].push("Total Cases: " + formatNumberWithSpaces(country.properties.coronadata[mapDate].confirmed));
                relevantData["English"].push("Population: " + formatNumberWithSpaces(country.properties.population));
                relevantData["English"].push("Ratio: " + (country.properties.coronadata[mapDate].confirmed/country.properties.population * 100).toFixed(3) + "%");
                relevantData["Deutsch"].push("Fälle Gesamt: " + formatNumberWithSpaces(country.properties.coronadata[mapDate].confirmed));
                relevantData["Deutsch"].push("Einwohner: " + formatNumberWithSpaces(country.properties.population));
                relevantData["Deutsch"].push("Verhältnis: " + (country.properties.coronadata[mapDate].confirmed/country.properties.population * 100).toFixed(3) + "%");
                return relevantData;
            default:
                return [0,"","",""];
        }
    }

    onEachCountry = (country, layer) => {
        var relevantData;
        if(country.properties.coronadata[this.props.alldates[this.props.mapDate].toLocaleDateString()] === undefined){relevantData = this.getRelevantData(country,this.props.active,"default");}
        else{relevantData = this.getRelevantData(country,this.props.active,this.props.alldates[this.props.mapDate].toLocaleDateString());}
        layer.options.fillColor = this.colorCountry(relevantData[this.props.activeLanguage][0]);
        const item1 = relevantData[this.props.activeLanguage][1];
        const item2 = relevantData[this.props.activeLanguage][2];
        const item3 = relevantData[this.props.activeLanguage][3];

        // Charts: set state activeCountry
        layer.on({
            click: (e) => {
                let country_name = country.properties.ADMIN
                console.log(country_name)
                this.props.setActiveCountry(country_name)
            }
        })

        layer.bindPopup(
            `${country.properties.ADMIN}
            <br/> ${item1}
            <br/> ${item2} 
            <br/> ${item3}
            `,{autoClose:false,closeOnClick:true}
        );
    };

    render() {
        return <MapContainer zoom={2.5} center={[45, 10]}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            <GeoJSON key={uuidv4()} style={this.mapStyle} data={this.props.countries} onEachFeature={this.onEachCountry}/>
            </MapContainer>;
    }
    
  }