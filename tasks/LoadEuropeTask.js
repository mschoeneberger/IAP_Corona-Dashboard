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
                //Debug-Only
                const noMatchReg = [];
                const noMatchCou = [];
                //We iterate over the regions of our GeoJSON.
                for(let i =0; i<this.regions.length; i++){
                    const region = this.regions[i];

                    //Initializing for regions without data.
                    region.properties.confirmed=0;
                    region.properties.recovered=0;
                    region.properties.fatalities=0;
                    region.properties.active=0;
                    region.properties.mortalityRate=0;
                    region.properties.incidentRate=0;
                    region.properties.last7 =0;

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
                            //Find latest entry
                            let newestIndex=0;
                            //Since Charts.jsx uses the data as a whole, we add the population of the region
                            data[region.properties.origin.toLowerCase()][regname][newestIndex].population = region.properties.population;
                            for(let j = 1; j<covidRegion.length; j++){
                                let newestdate = new Date(covidRegion[newestIndex].date);
                                let thisdate = new Date(covidRegion[j].date);
                                //In every entry.
                                data[region.properties.origin.toLowerCase()][regname][j].population = region.properties.population;
                                if(thisdate > newestdate){
                                    newestIndex = j;
                                }
                            }
                            //extract/calculate relevant data from Covid data.
                            region.properties.confirmed = covidRegion[newestIndex].totalCases;
                            region.properties.fatalities = covidRegion[newestIndex].totalDeaths;
                            region.properties.active = covidRegion[newestIndex].newCases21Days;
                            region.properties.incidentRate = (covidRegion[newestIndex].newCases7Days*100000)/region.properties.population;
                            region.properties.recovered = region.properties.confirmed - region.properties.fatalities - region.properties.active;
                            region.properties.mortalityRate = region.properties.fatalities/region.properties.confirmed;
                            region.properties.last7 = covidRegion[newestIndex].newCases7Days;
                        }
                        //Debug
                        else{noMatchReg.push(region.properties.name);}
                    }
                    //Debug
                    else{noMatchCou.push(region.properties.name);}
                }
            //Debug
            console.log("No Match Region: ");
            console.log(noMatchReg);
            console.log("No Match Country: ");
            console.log(noMatchCou);
            //Updating the states.
            this.combinedData.push(data);
            this.setData(this.combinedData);
            this.setState(this.regions);
        })
        await fetch("https://banana-cupcake-00146.herokuapp.com/germany_new.json")
            .then(response => response.json())
            .then(data => {
                //Debug
                console.log("Bingbang.")
                let noMatchReg = [];
                //Debug
                let oneListKeys = [];
                let matchedKeys = [];
                //Get the keys to iterate through the data
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

                //Debug
                for(let i=0;i<allRegKeys.length; i++){
                    for(let j=0;j<allRegKeys[i].length; j++){
                        oneListKeys.push(allRegKeys[i][j]);
                    }
                }

                //Again we iterate over the regions of our GeoJSON.
                for(let i =0; i<this.regions.length; i++){
                    //We already have every region except the german ones.
                    if(this.regions[i].properties.origin!=="Germany"){continue;}
                    const region = this.regions[i];

                    //Initializing for regions without data.
                    region.properties.confirmed=0;
                    region.properties.recovered=0;
                    region.properties.fatalities=0;
                    region.properties.active=0;
                    region.properties.mortalityRate=0;
                    region.properties.its_freie_betten=0;
                    region.properties.its_belegt=0;
                    region.properties.its_freie_beatmung=0;
                    region.properties.its_covid_patienten=0;
                    region.properties.incidentRate=0;
                    region.properties.last7=0;

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
                        console.log("Matched. " + regname + " : " + bundesland);
                        //Debug
                        matchedKeys.push(regname);
                        //Correct Covid data for this region
                        covidRegion = data[bundesland][regname];
                        //Find latest entry
                        let newestIndex=0;
                        //Since Charts.jsx uses the data as a whole, we add the population of the region...
                        data[bundesland][regname][newestIndex].population = region.properties.population;
                        for(let j = 1; j<covidRegion.length; j++){
                            //d is for date.
                            let newestdate = new Date(covidRegion[newestIndex].d);
                            let thisdate = new Date(covidRegion[j].d);
                            //...in every entry.
                            data[bundesland][regname][j].population = region.properties.population;
                            if(thisdate > newestdate){
                                newestIndex = j;
                            }
                        }
                        //Debug
                        console.log(covidRegion[newestIndex].d);
                        //extract/calculate relevant data from Covid data.
                        //e is for total Cases.
                        region.properties.confirmed = covidRegion[newestIndex].e;
                        //h is for cumulative fatalities
                        region.properties.fatalities = covidRegion[newestIndex].h;
                        //g is for new cases in the last 21 days
                        region.properties.active = covidRegion[newestIndex].g;
                        //f is for new cases in the last 7 days
                        region.properties.incidentRate = (covidRegion[newestIndex].f*100000)/region.properties.population;
                        region.properties.recovered = region.properties.confirmed - region.properties.fatalities - region.properties.active;
                        region.properties.mortalityRate = region.properties.fatalities/region.properties.confirmed;
                        region.properties.its_freie_betten = covidRegion[newestIndex].k;
                        region.properties.its_belegt= covidRegion[newestIndex].j;
                        region.properties.its_freie_beatmung= covidRegion[newestIndex].l;
                        region.properties.its_covid_patienten= covidRegion[newestIndex].i;
                        region.properties.last7 = covidRegion[newestIndex].f;
                    }
                    //Debug
                    else{noMatchReg.push(region.properties.name);}
                }
            //Debug
            console.log("No Match Region(Ger): ");
            console.log(noMatchReg);
            for(let i=0;i<oneListKeys.length;i++){
                if(matchedKeys.includes(oneListKeys[i])){continue;}
                else{console.log(oneListKeys[i]);}
            }
            //Updating the states.
            this.combinedData.push(data);
            this.setData(this.combinedData);
            this.setState(this.regions);
        })
    };

}

export default LoadEuropeTask;