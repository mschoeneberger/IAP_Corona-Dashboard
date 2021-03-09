import {features} from "../data/german_neighbours_noindent_populated2.json";

class LoadEuropeTask{
    setState = null;
    regions = features;

    async load (setState) {
        this.setState = setState;
        for(let i = 0; i<this.regions.length; i++){
            this.regions[i].properties.cumulativeTested=0;
            this.regions[i].properties.cumulativeCases=0;
            this.regions[i].properties.cumulativeRecovered=0;
            this.regions[i].properties.cumulativeDeaths=0;
            this.regions[i].properties.currentICU=0;
            this.regions[i].properties.currentHosp=0;
            this.regions[i].properties.incidentRate=0;
            this.regions[i].properties.active=0;
            this.regions[i].properties.mortalityRate=0;
        }
    
    this.setState(this.regions);

        // await fetch("https://fathomless-oasis-85586.herokuapp.com/austria.json")
        //     .then(response => response.json())
        //     .then(data => {
        //         for(let i = data.length-1; i>=0; i--){
        //             for(let j=0; j<this.aut.length; j++){
        //                 if(this.aut[j].properties.name === data[i].region){
        //                     this.aut[j].properties.cumulativeTested += data[i].tested;
        //                     this.aut[j].properties.cumulativeCases += data[i].cases;
        //                     this.aut[j].properties.cumulativeRecovered += data[i].recovered;
        //                     this.aut[j].properties.cumulativeDeaths += data[i].deceased;
        //                     if(daycounter[j]===0){
        //                         this.aut[j].properties.currentICU = data[i].current_icu;
        //                         this.aut[j].properties.currentHosp = data[i].current_hosp;
        //                     }
        //                     if(daycounter[j]<6){
        //                         this.aut[j].properties.incidentRate += data[i].cases;
        //                     }
        //                     if(daycounter[j]<20){
        //                         this.aut[j].properties.active +=data[i].cases;
        //                     }
        //                     daycounter[j]++;
        //                 }
        //             }
        //         }
        //         this.aut.forEach(region => {
        //             region.properties.incidentRate = (region.properties.incidentRate / region.properties.population) * 100000;
        //         })
        //     })

        //     //Belgien hier
        
        // daycounter = [];
        // for(let i = 0; i<this.che.length; i++){
        //     daycounter.push(0);
        //     this.che[i].properties.cumulativeTested=0;
        //     this.che[i].properties.cumulativeCases=0;
        //     this.che[i].properties.cumulativeRecovered=0;
        //     this.che[i].properties.cumulativeDeaths=0;
        //     this.che[i].properties.currentICU=0;
        //     this.che[i].properties.currentHosp=0;
        //     this.che[i].properties.incidentRate=0;
        //     this.che[i].properties.active=0;
        //     this.che[i].properties.name = this.che[i].properties.canton_name;
        // }

        // await fetch("https://fathomless-oasis-85586.herokuapp.com/switzerland.json")
        //     .then(response => response.json())
        //     .then(data => {
        //         for(let i = data.length-1; i>=0; i--){
        //             if(daycounter[0] === 21){break;}
        //             for(let j=0; j<this.che.length; j++){
        //                 if(this.che[j].properties.code === data[i].region){
        //                     if(daycounter[j]===0){
        //                         if(data[i].tested != null){
        //                             this.che[j].properties.cumulativeTested = data[i].tested;
        //                         }
        //                         if(data[i].recovered != null){
        //                             this.che[j].properties.cumulativeRecovered = data[i].recovered;
        //                         }
        //                         this.che[j].properties.cumulativeCases = data[i].cases;
        //                         this.che[j].properties.cumulativeDeaths = data[i].deceased;
        //                         this.che[j].properties.currentICU = data[i].current_icu;
        //                         this.che[j].properties.currentHosp = data[i].current_hosp;
        //                         this.che[j].properties.incidentRate = data[i].cases;
        //                         this.che[j].properties.active = data[i].cases;
        //                     }
        //                     if(daycounter[j]===5){
        //                         this.che[j].properties.incidentRate -= data[i].cases;
        //                     }
        //                     if(daycounter[j]===19){
        //                         this.che[j].properties.active -=data[i].cases;
        //                     }
        //                     daycounter[j]++;
        //                 }
        //             }
        //         }
        //         this.che.forEach(region => {
        //             region.properties.incidentRate = (region.properties.incidentRate / region.properties.population) * 100000;
        //         })
        //     })

        // //Tschechien hier

        // daycounter = [];
        // console.log(this.dnk.length);
        // for(let i = 0; i<this.dnk.length; i++){
        //     daycounter.push(0);
        //     this.dnk[i].properties.cumulativeTested=0;
        //     this.dnk[i].properties.cumulativeCases=0;
        //     this.dnk[i].properties.cumulativeRecovered=0;
        //     this.dnk[i].properties.cumulativeDeaths=0;
        //     this.dnk[i].properties.currentICU=0;
        //     this.dnk[i].properties.currentHosp=0;
        //     this.dnk[i].properties.incidentRate=0;
        //     this.dnk[i].properties.active=0;
        //     this.dnk[i].properties.name = this.dnk[i].properties.label_dk;
        // }
        // await fetch("https://fathomless-oasis-85586.herokuapp.com/denmark.json")
        //     .then(response => response.json())
        //     .then(data => {
        //         for(let i = data.length-1; i>=0; i--){
        //             for(let j=0; j<this.dnk.length; j++){
        //                 if(this.dnk[j].properties.name === data[i].region){
        //                     if(data[i].tested !== "NA" && data[i].tested !== "na"){
        //                         this.dnk[j].properties.cumulativeTested += data[i].tested;
        //                     }
        //                     if(data[i].deaths !== "NA" && data[i].deaths !== "na"){
        //                         this.dnk[j].properties.cumulativeDeaths += data[i].deaths;
        //                     }
        //                     this.dnk[j].properties.cumulativeCases += data[i].cases;
        //                     if(daycounter[j]<6){
        //                         this.dnk[j].properties.incidentRate += data[i].cases;
        //                     }
        //                     if(daycounter[j]<20){
        //                         this.dnk[j].properties.active +=data[i].cases;
        //                     }
        //                     daycounter[j]++;
        //                 }
        //             }
        //         }
        //         // this.dnk.forEach(region => {
        //         //     region.properties.incidentRate = (region.properties.incidentRate / region.properties.population) * 100000;
        //         // })
        //     })

        //     console.log(this.dnk);

        // Hier weiter. Land für Land durchgehen und coronadaten hinzufügen
        // Und einen gemeinsamen Identifikator finden. bzw. Variable
        // für Namen der Region

    //     await fetch("https://fathomless-oasis-85586.herokuapp.com/dataWorld")
    //     .then(response => response.json())
    //     .then(data => {
    //         const validKeys = Object.keys(data);
    //         for(let i = 0; i < this.mapCountries.length; i++){
    //             const mapCountry = this.mapCountries[i];

    //             let covidCountry = [];
    //             if(validKeys.includes(mapCountry.properties.ADMIN)){
    //                 covidCountry = data[mapCountry.properties.ADMIN];
    //             }

    //             mapCountry.properties.confirmed = 0;
    //             mapCountry.properties.population = 0;
    //             for(let j = 0; j < this.poparray.length; j++){
    //                 if(this.poparray[j].country === mapCountry.properties.ADMIN){
    //                     mapCountry.properties.population = this.poparray[j].population;
    //                     break;
    //                 }
    //             }
    //             mapCountry.properties.fatalities = 0;
    //             mapCountry.properties.recovered = 0;
    //             mapCountry.properties.active = 0;
    //             mapCountry.properties.incidentRate = 0.0;
    //             mapCountry.properties.peopleTested = 0;
    //             mapCountry.properties.peopleHospitalized = 0;
    //             mapCountry.properties.mortalityRate = 0;

    //             if(covidCountry.length !== 0){
    //                 mapCountry.properties.confirmed = Number(covidCountry[(covidCountry.length -1)].confirmed);
    //                 mapCountry.properties.fatalities = Number(covidCountry[(covidCountry.length -1)].deaths);
    //                 mapCountry.properties.recovered = Number(covidCountry[(covidCountry.length -1)].recovered);
    //                 mapCountry.properties.active = Number(covidCountry[(covidCountry.length -1)].active);
    //                 mapCountry.properties.incidentRate = Number(covidCountry[(covidCountry.length -1)].incident_rate);
    //                 mapCountry.properties.peopleTested = Number(covidCountry[(covidCountry.length -1)].people_tested);
    //                 mapCountry.properties.peopleHospitalized = Number(covidCountry[(covidCountry.length -1)].people_hospitalized);
    //                 try {
    //                     mapCountry.properties.date = covidCountry[(covidCountry.length - 1)].report_date.toString()
    //                 }
    //                 catch(TypeError){
    //                     console.log("TypeError raised and caught when loading pub_date from: " + mapCountry.properties.ADMIN)
    //                     mapCountry.properties.date = "Unknown."
    //                 }

    //                 if(mapCountry.properties.active === 0){
    //                     for(let j=1; j<22; j++){
    //                         mapCountry.properties.active += Number(covidCountry[(covidCountry.length -22 + j)].delta_confirmed);
    //                     }
    //                 }
    //                 if(mapCountry.properties.recovered === 0){
    //                     mapCountry.properties.recovered = mapCountry.properties.confirmed - mapCountry.properties.active - mapCountry.properties.fatalities;
    //                 }
    //                 mapCountry.properties.mortalityRate = mapCountry.properties.fatalities / mapCountry.properties.confirmed;
    //             }
    //         }
    //         //
    //         ////Loop to find Corona-data that is not displayed. Only for debugging.
    //         //
    //         // var noMatch = [];
    //         // validKeys.forEach(key => {
    //         //     let hit = false;
    //         //     this.mapCountries.forEach(mapCountry => {
    //         //         if(key === mapCountry.properties.ADMIN){hit = true;}
    //         //     })
    //         //     if(!hit){noMatch.push(key);}
    //         // });
    //     //console.log(noMatch);
    //     })
    //     ////Loop to find countries that we have no population data for (nonpop) or that we have no corona data for (nocase)
    //     //
    //     // var nonpop = [];
    //     // var nocase = [];
    //     // for(let i = 0; i < this.mapCountries.length; i++){
    //     //     let mapCountry = this.mapCountries[i];
    //     //     if(mapCountry.properties.population === 0){
    //     //         nonpop.push(mapCountry.properties.ADMIN);
    //     //     }
    //     //     if(mapCountry.properties.confirmed === 0){
    //     //         nocase.push(mapCountry.properties.ADMIN);
    //     //     }
    //     // }
    //     // console.log(nonpop);
    //     // console.log(nocase);
    //     this.setDate(this.mapCountries[61].properties.date);
    //     this.setState(this.mapCountries);
    };

}

export default LoadEuropeTask;