import {features} from "../data/countries.json";
import pop from "../data/countries_pop.json";

class LoadCountriesTask{
    setState = null;
    mapCountries = features;
    poparray = pop;
    setDate = null;
    lastDate;

    async load (setState, setDate) {
        this.setState = setState;
        this.setDate = setDate;
        await fetch("https://fathomless-oasis-85586.herokuapp.com/dataWorld")
        .then(response => response.json())
        .then(data => {
            const validKeys = Object.keys(data);
            for(let i = 0; i < this.mapCountries.length; i++){
                const mapCountry = this.mapCountries[i];

                let covidCountry = [];
                if(validKeys.includes(mapCountry.properties.ADMIN)){
                    covidCountry = data[mapCountry.properties.ADMIN];
                }

                mapCountry.properties.confirmed = 0;
                mapCountry.properties.population = 0;
                for(let j = 0; j < this.poparray.length; j++){
                    if(this.poparray[j].country === mapCountry.properties.ADMIN){
                        mapCountry.properties.population = this.poparray[j].population;
                        break;
                    }
                }
                mapCountry.properties.fatalities = 0;
                mapCountry.properties.recovered = 0;
                mapCountry.properties.active = 0;
                mapCountry.properties.incidentRate = 0.0;
                mapCountry.properties.peopleTested = 0;
                mapCountry.properties.peopleHospitalized = 0;
                mapCountry.properties.mortalityRate = 0;

                if(covidCountry.length !== 0){
                    mapCountry.properties.confirmed = Number(covidCountry[(covidCountry.length -1)].confirmed);
                    mapCountry.properties.fatalities = Number(covidCountry[(covidCountry.length -1)].deaths);
                    mapCountry.properties.recovered = Number(covidCountry[(covidCountry.length -1)].recovered);
                    mapCountry.properties.active = Number(covidCountry[(covidCountry.length -1)].active);
                    mapCountry.properties.incidentRate = Number(covidCountry[(covidCountry.length -1)].incident_rate);
                    mapCountry.properties.peopleTested = Number(covidCountry[(covidCountry.length -1)].people_tested);
                    mapCountry.properties.peopleHospitalized = Number(covidCountry[(covidCountry.length -1)].people_hospitalized);
                    mapCountry.properties.date = covidCountry[(covidCountry.length - 1)].report_date.toString()
                    
                    this.lastDate = new Date(covidCountry[(covidCountry.length - 1)].report_date.toString())

                    if(mapCountry.properties.active === 0){
                        for(let j=1; j<15; j++){
                            mapCountry.properties.active += Number(covidCountry[(covidCountry.length -15 + j)].delta_confirmed);
                        }
                    }
                    if(mapCountry.properties.recovered === 0){
                        mapCountry.properties.recovered = mapCountry.properties.confirmed - mapCountry.properties.active - mapCountry.properties.fatalities;
                    }
                    mapCountry.properties.mortalityRate = mapCountry.properties.fatalities / mapCountry.properties.confirmed;
                }
            }
        })
        var nonpop = [];
        var nocase = [];
        for(let i = 0; i < this.mapCountries.length; i++){
            let mapCountry = this.mapCountries[i];
            if(mapCountry.properties.population === 0){
                nonpop.push(mapCountry.properties.ADMIN);
            }
            if(mapCountry.properties.confirmed === 0){
                nocase.push(mapCountry.properties.ADMIN);
            }
        }
        console.log(nonpop);
        console.log(nocase);
        this.setDate(this.lastDate);
        this.setState(this.mapCountries);
    };
}

export default LoadCountriesTask;