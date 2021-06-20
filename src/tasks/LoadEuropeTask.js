import {features} from "../data/german_neighbours_noindent_populated4.json";

class LoadEuropeTask{
    setState = null;
    setData = null;
    combinedData = [];
    regions = features;

    async load (setState, setData) {
        this.setState = setState;
        this.setData = setData;

        await fetch("https://banana-cupcake-00146.herokuapp.com/eu_data.json")
            .then(response => response.json())
            .then(data => {
                //validCountryKeys
                const validCKeys = Object.keys(data);
                //We iterate over the regions of our GeoJSON.
                for(let i =0; i<this.regions.length; i++){
                    const region = this.regions[i];
                    region.properties.coronadata = {};
                    region.properties.coronadata["default"] = {};
                    //Initializing for regions with default values.
                    region.properties.coronadata["default"].confirmed=0;
                    region.properties.coronadata["default"].recovered=0;
                    region.properties.coronadata["default"].fatalities=0;
                    region.properties.coronadata["default"].active=0;
                    region.properties.coronadata["default"].mortalityRate=0;
                    region.properties.coronadata["default"].incidentRate=0;
                    region.properties.coronadata["default"].last7=0;

                    let covidRegion = [];
                    //Matching origin of region (e.g. austria for Burgenland)
                    if(validCKeys.includes(region.properties.origin.toLowerCase())){
                        // validRegionKeys; Only contains valid region keys for matched origins since region names are not unique.
                        const validRegKeys = Object.keys(data[region.properties.origin.toLowerCase()]);
                        //Matching region names.
                        let uppercase = validRegKeys.includes(region.properties.name);
                        let lowercase = validRegKeys.includes(region.properties.name.toLowerCase())
                        if(uppercase || lowercase){
                            //For accessing the data correctly, we need to know if the name is upper or lower case.
                            let regname = (uppercase ? region.properties.name : region.properties.name.toLowerCase());
                            //Correct Covid data for this region
                            covidRegion = data[region.properties.origin.toLowerCase()][regname];

                            for(let j = 0; j<covidRegion.length; j++){
                                let dateString = new Date(covidRegion[j].date);
                                dateString = dateString.toLocaleDateString();
                                //Since Charts.jsx uses the data as a whole, we add the population of the region in every entry.
                                data[region.properties.origin.toLowerCase()][regname][j].population = region.properties.population;
                                region.properties.coronadata[dateString] = {};
                                //extract/calculate relevant data from Covid data.
                                region.properties.coronadata[dateString].confirmed = covidRegion[j].totalCases;
                                region.properties.coronadata[dateString].fatalities = covidRegion[j].totalDeaths;
                                region.properties.coronadata[dateString].active = covidRegion[j].newCases21Days;
                                region.properties.coronadata[dateString].incidentRate = (covidRegion[j].newCases7Days*100000)/region.properties.population;
                                region.properties.coronadata[dateString].recovered = region.properties.coronadata[dateString].confirmed - region.properties.coronadata[dateString].fatalities - region.properties.coronadata[dateString].active;
                                region.properties.coronadata[dateString].mortalityRate = region.properties.coronadata[dateString].fatalities/region.properties.coronadata[dateString].confirmed;
                                region.properties.coronadata[dateString].last7 = covidRegion[j].newCases7Days;
                            }
                        }
                    }
                }
            this.combinedData.push(data);
            this.setData(this.combinedData);
            this.setState(this.regions);
        })
        await fetch("https://banana-cupcake-00146.herokuapp.com/germany_new.json")
            .then(response => response.json())
            .then(data => {
                const validBunKeys = Object.keys(data);
                //We can use these to find the Bundesland to a specific region.
                //This makes it easier to access the ICU data.
                const allRegKeys = [];
                for(let i=0; i<validBunKeys.length; i++){
                    let vbk = validBunKeys[i];
                    if(vbk==="vacc"){allRegKeys.push([]); continue;}
                    //Get the keys for the regions in that Bundesland.
                    const validRegKeys = Object.keys(data[vbk]);
                    allRegKeys.push(validRegKeys);
                }

                //Again we iterate over the regions of our GeoJSON.
                for(let i =0; i<this.regions.length; i++){
                    //We already have every region except the german ones.
                    if(this.regions[i].properties.origin!=="Germany"){continue;}
                    const region = this.regions[i];
                    region.properties.coronadata = {};
                    region.properties.coronadata["default"] = {};
                    //Initializing for regions with default values.
                    region.properties.coronadata["default"].confirmed=0;
                    region.properties.coronadata["default"].recovered=0;
                    region.properties.coronadata["default"].fatalities=0;
                    region.properties.coronadata["default"].active=0;
                    region.properties.coronadata["default"].mortalityRate=0;
                    region.properties.coronadata["default"].incidentRate=0;
                    region.properties.coronadata["default"].last7=0;
                    region.properties.coronadata["default"].its_freie_betten=0;
                    region.properties.coronadata["default"].its_belegt=0;
                    region.properties.coronadata["default"].its_freie_beatmung=0;
                    region.properties.coronadata["default"].its_covid_patienten=0;

                    let covidRegion = [];
                    //Matching region names.
                    let uppercase = false;
                    let lowercase = false;
                    let bundesland = "";
                    for(let j=0;j<allRegKeys.length;j++){
                        if(allRegKeys[j].includes(region.properties.name)){uppercase = true; bundesland=validBunKeys[j];}
                        if(allRegKeys[j].includes(region.properties.name.toLowerCase())){lowercase = true; bundesland=validBunKeys[j];}
                    }
                    if(uppercase || lowercase){
                        //For accessing the data correctly, we need to know if the name is upper or lower case.
                        let regname = (uppercase ? region.properties.name : region.properties.name.toLowerCase());
                        covidRegion = data[bundesland][regname];;
                        for(let j = 0; j<covidRegion.length; j++){
                            //d is for date.
                            let dateString = new Date(covidRegion[j].d);
                            dateString = dateString.toLocaleDateString();
                            //Since Charts.jsx uses the data as a whole, we add the population of the region in every entry.
                            data[bundesland][regname][j].population = region.properties.population;
                            region.properties.coronadata[dateString] = {};
                            //e is for total Cases.
                            region.properties.coronadata[dateString].confirmed = covidRegion[j].e;
                            //h is for cumulative fatalities
                            region.properties.coronadata[dateString].fatalities = covidRegion[j].h;
                            //g is for new cases in the last 21 days
                            region.properties.coronadata[dateString].active = covidRegion[j].g;
                            //f is for new cases in the last 7 days
                            region.properties.coronadata[dateString].incidentRate = (covidRegion[j].f*100000)/region.properties.population;
                            region.properties.coronadata[dateString].recovered = region.properties.coronadata[dateString].confirmed - region.properties.coronadata[dateString].fatalities - region.properties.coronadata[dateString].active;
                            region.properties.coronadata[dateString].mortalityRate = region.properties.coronadata[dateString].fatalities/region.properties.coronadata[dateString].confirmed;
                            region.properties.coronadata[dateString].its_freie_betten = covidRegion[j].k;
                            region.properties.coronadata[dateString].its_belegt= covidRegion[j].j;
                            region.properties.coronadata[dateString].its_freie_beatmung= covidRegion[j].l;
                            region.properties.coronadata[dateString].its_covid_patienten= covidRegion[j].i;
                            region.properties.coronadata[dateString].last7 = covidRegion[j].f;
                        }
                    }
                }

            //Updating the states.
            //this.combinedData.push(data);
            this.setData(x => [...x,data]);
            this.setState(this.regions);
        })
    };

}

export default LoadEuropeTask;