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

    async load (setState, setDate, setCompleteData, setAllDates) {
        this.setState = setState;
        this.setDate = setDate;
        this.setCompleteData = setCompleteData;
        this.setAllDates = setAllDates;
        // Fetching the Corona data from backend. This usually takes a while.
        await fetch("https://banana-cupcake-00146.herokuapp.com/world.json")
        .then(response => response.json())
        .then(data => {
            const validKeys = Object.keys(data);
            const reversedDateArray = [];
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
                mapCountry.properties.population = 0;
                for(let j = 0; j < this.poparray.length; j++){
                    if(this.poparray[j].country === mapCountry.properties.ADMIN){
                        mapCountry.properties.population = this.poparray[j].population;
                        break;
                    }
                }
                //Since we want to display ALL of the data on the map, we create a dict where "date" gives us the data for a specific date.
                mapCountry.properties.coronadata = {};
                //Some regions don't have proper data, so we give them a default.
                mapCountry.properties.coronadata["default"] = {};
                mapCountry.properties.coronadata["default"].confirmed = 0;
                mapCountry.properties.coronadata["default"].fatalities = 0;
                mapCountry.properties.coronadata["default"].recovered = 0;
                mapCountry.properties.coronadata["default"].active = 0;
                mapCountry.properties.coronadata["default"].incidentRate = 0.0;
                mapCountry.properties.coronadata["default"].mortalityRate = 0;
                mapCountry.properties.coronadata["default"].last7 = 0;

                // Filling the corona-data of the geo-data-country with the corona-data of the corona-data-country (if there is any).
                if(covidCountry.length !== 0){
                    for(let j=0; j<covidCountry.length; j++){
                        //These Dates will be used by the Play-Button-Feature
                        if(i===61){
                            reversedDateArray.push(new Date(covidCountry[j].date));
                        }
                        let dateString = new Date(covidCountry[j].date);
                        dateString = dateString.toLocaleDateString();
                        data[countryname][j].population = mapCountry.properties.population;
                        mapCountry.properties.coronadata[dateString]={};
                        mapCountry.properties.coronadata[dateString].confirmed = Number(covidCountry[j].totalCases);
                        mapCountry.properties.coronadata[dateString].fatalities = Number(covidCountry[j].totalDeaths);
                        mapCountry.properties.coronadata[dateString].active = Number(covidCountry[j].newCases21Days);
                        mapCountry.properties.coronadata[dateString].recovered = mapCountry.properties.coronadata[dateString].confirmed - mapCountry.properties.coronadata[dateString].fatalities - mapCountry.properties.coronadata[dateString].active;
                        mapCountry.properties.coronadata[dateString].incidentRate = Number(covidCountry[j].newCases7Days) * 100000 / mapCountry.properties.population;
                        mapCountry.properties.coronadata[dateString].mortalityRate = mapCountry.properties.coronadata[dateString].fatalities / mapCountry.properties.coronadata[dateString].confirmed;
                        mapCountry.properties.coronadata[dateString].last7 = Number(covidCountry[j].newCases7Days);
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
            
            //Reverse sorting dates, so that index 0 returns the newest Date. 
            reversedDateArray.sort((a,b) => {if(a<b){return 1;}if(a>b){return -1;}return 0;})
            this.setAllDates(reversedDateArray);
            this.setCompleteData(data);
            // console.log("Countries without match:");
            // console.log(noMatch);
            this.setDate(reversedDateArray[0]);
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