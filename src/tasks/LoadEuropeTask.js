import {features} from "../data/german_neighbours_noindent_populated3.json";

class LoadEuropeTask{
    setState = null;
    setData = null;
    regions = features;

    // async fill(link, )

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
                    region.properties.peopleICU=0;
                    region.properties.peopleHospitalized=0;
                    region.properties.incidentRate=0;
                    region.properties.active=0;
                    region.properties.mortalityRate=0;

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
                            console.log(covidRegion[newestIndex].date);
                            //extract/calculate relevant data from Covid data.
                            region.properties.confirmed = covidRegion[newestIndex].totalCases;
                            region.properties.fatalities = covidRegion[newestIndex].totalDeaths;
                            region.properties.active = covidRegion[newestIndex].newCases21Days;
                            region.properties.incidentRate = (covidRegion[newestIndex].newCases7Days*100000)/region.properties.population;
                            region.properties.recovered = region.properties.confirmed - region.properties.fatalities - region.properties.active;
                            region.properties.mortalityRate = region.properties.fatalities/region.properties.confirmed;
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
            this.setData(data);
            this.setState(this.regions);
        })
    
    };

}

export default LoadEuropeTask;