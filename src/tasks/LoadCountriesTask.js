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

    async load (setState, setDate, setCompleteData) {
        this.setState = setState;
        this.setDate = setDate;
        this.setCompleteData = setCompleteData;
        // Fetching the Corona data from backend. This usually takes a while.
        await fetch("https://banana-cupcake-00146.herokuapp.com/world.json")
        .then(response => response.json())
        .then(data => {
            const validKeys = Object.keys(data);
            const noMatch = [];
            for(let i = 0; i < this.mapCountries.length; i++){
                // mapCountry yields the Geo-data and some properties for a single country.
                const mapCountry = this.mapCountries[i];
                // covidCountry yields the Corona data of a single country.
                let covidCountry = [];
                let countryname = "";
                let uppercase = validKeys.includes(mapCountry.properties.ADMIN);
                let lowercase = validKeys.includes(mapCountry.properties.ADMIN.toLowerCase());
                if(uppercase){covidCountry = data[mapCountry.properties.ADMIN]; countryname=mapCountry.properties.ADMIN;}
                else{ if(lowercase){covidCountry = data[mapCountry.properties.ADMIN.toLowerCase()]; countryname=mapCountry.properties.ADMIN.toLowerCase();}
                else{noMatch.push(mapCountry.properties.ADMIN);}}

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
                    let newestindex = 0;
                    data[countryname][0].population = mapCountry.properties.population;
                    for(let j=1; j<covidCountry.length; j++){
                        let newestdate = new Date(covidCountry[newestindex].date);
                        let thisdate = new Date(covidCountry[j].date);
                        data[countryname][j].population = mapCountry.properties.population;
                        if(thisdate > newestdate){newestindex = j;}
                    }

                    mapCountry.properties.confirmed = Number(covidCountry[newestindex].totalCases);
                    mapCountry.properties.fatalities = Number(covidCountry[newestindex].totalDeaths);
                    mapCountry.properties.active = Number(covidCountry[newestindex].newCases21Days);
                    mapCountry.properties.recovered = mapCountry.properties.confirmed - mapCountry.properties.fatalities - mapCountry.properties.active;
                    mapCountry.properties.incidentRate = Number(covidCountry[newestindex].newCases7Days) * 100000 / mapCountry.properties.population;
                    mapCountry.properties.mortalityRate = mapCountry.properties.fatalities / mapCountry.properties.confirmed;
                    // For a few countries the pub_date makes trouble.
                    try {
                        mapCountry.properties.date = covidCountry[newestindex].date.toString()
                    }
                    catch(TypeError){
                        console.log("TypeError raised and caught when loading pub_date from: " + mapCountry.properties.ADMIN)
                        mapCountry.properties.date = "Unknown."
                    }
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
            this.setCompleteData(data);
            console.log("Countries without match:");
            console.log(noMatch);
            this.setDate(this.mapCountries[61].properties.date);
            this.setState(this.mapCountries);
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
    };
}

export default LoadCountriesTask;