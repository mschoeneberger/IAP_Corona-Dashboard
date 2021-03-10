import {features} from "../data/countries.json";
import pop from "../data/countries_pop.json";

class LoadCountriesTask{
    setState = null;
    // Initializing mapCountries with the Geo-data
    mapCountries = features;
    // Contains the population for every country.
    poparray = pop;
    setDate = null;
    lastDate;

    async load (setState, setDate) {
        this.setState = setState;
        this.setDate = setDate;
        // Fetching the Corona data from backend. This usually takes a while.
        await fetch("https://fathomless-oasis-85586.herokuapp.com/dataWorld")
        .then(response => response.json())
        .then(data => {
            setCompleteData(data)
            const validKeys = Object.keys(data);
            for(let i = 0; i < this.mapCountries.length; i++){
                // mapCountry yields the Geo-data and some properties for a single country.
                const mapCountry = this.mapCountries[i];
                // covidCountry yields the Corona data of a single country.
                let covidCountry = [];
                if(validKeys.includes(mapCountry.properties.ADMIN)){
                    covidCountry = data[mapCountry.properties.ADMIN];
                }

                // Initializing the corona-data we want to save as a property of the geo-data-country.
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

                // Filling the corona-data of the geo-data-country with the corona-data of the corona-data-country (if there is any).
                if(covidCountry.length !== 0){
                    mapCountry.properties.confirmed = Number(covidCountry[(covidCountry.length -1)].confirmed);
                    mapCountry.properties.fatalities = Number(covidCountry[(covidCountry.length -1)].deaths);
                    mapCountry.properties.recovered = Number(covidCountry[(covidCountry.length -1)].recovered);
                    mapCountry.properties.active = Number(covidCountry[(covidCountry.length -1)].active);
                    for(let j=1; j<8; j++){
                        mapCountry.properties.incidentRate += Number(covidCountry[(covidCountry.length -8 + j)].delta_confirmed);
                    }
                    mapCountry.properties.incidentRate = (mapCountry.properties.incidentRate * 100000) / mapCountry.properties.population;
                    mapCountry.properties.peopleTested = Number(covidCountry[(covidCountry.length -1)].people_tested);
                    mapCountry.properties.peopleHospitalized = Number(covidCountry[(covidCountry.length -1)].people_hospitalized);
                    // For a few countries the pub_date makes trouble.
                    try {
                        mapCountry.properties.date = covidCountry[(covidCountry.length - 1)].report_date.toString()
                    }
                    catch(TypeError){
                        console.log("TypeError raised and caught when loading pub_date from: " + mapCountry.properties.ADMIN)
                        mapCountry.properties.date = "Unknown."
                    }
                    //Some countries are not keeping track of active infections, so we have to approximate them.
                    if(mapCountry.properties.active === 0){
                        for(let j=1; j<22; j++){
                            mapCountry.properties.active += Number(covidCountry[(covidCountry.length -22 + j)].delta_confirmed);
                        }
                    }
                    //Same goes for the amount of recovered people
                    if(mapCountry.properties.recovered === 0){
                        mapCountry.properties.recovered = mapCountry.properties.confirmed - mapCountry.properties.active - mapCountry.properties.fatalities;
                    }
                    mapCountry.properties.mortalityRate = mapCountry.properties.fatalities / mapCountry.properties.confirmed;
                }
            }
            // For Debugging:
            //
            ////Loop to find Corona-data that is not displayed. Only for debugging.
            //
            // var noMatch = [];
            // validKeys.forEach(key => {
            //     let hit = false;
            //     this.mapCountries.forEach(mapCountry => {
            //         if(key === mapCountry.properties.ADMIN){hit = true;}
            //     })
            //     if(!hit){noMatch.push(key);}
            // });
            //console.log(noMatch);
        })
        ////Loop to find countries that we have no population data for (nonpop) or that we have no corona data for (nocase)
        //
        // var nonpop = [];
        // var nocase = [];
        // for(let i = 0; i < this.mapCountries.length; i++){
        //     let mapCountry = this.mapCountries[i];
        //     if(mapCountry.properties.population === 0){
        //         nonpop.push(mapCountry.properties.ADMIN);
        //     }
        //     if(mapCountry.properties.confirmed === 0){
        //         nocase.push(mapCountry.properties.ADMIN);
        //     }
        // }
        // console.log(nonpop);
        // console.log(nocase);

        // We take germanys update-date for our dashboard.
        this.setDate(this.mapCountries[61].properties.date);
        // Geo- and Corona-data combined.
        this.setState(this.mapCountries);
    };
}

export default LoadCountriesTask;