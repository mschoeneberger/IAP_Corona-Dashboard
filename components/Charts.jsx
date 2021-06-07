import React,  { useState,useEffect } from 'react';
import "./Charts.css"
import Chart, { plugins } from 'chart.js'
import ChartMenu from "./ChartMenu.jsx"
import LoadingMap from "./LoadingMap";

// colors for the charts
var chartColors = [
	{name:'red',    value: 'rgb(255, 99, 132)'},
	{name:'orange', value: 'rgb(255, 159, 64)'},
	{name:'yellow', value: 'rgb(255, 205, 86)'},
	{name:'green',  value: 'rgb(75, 192, 192)'},
	{name:'blue',   value: 'rgb(54, 162, 235)'},
	{name:'purple', value: 'rgb(153, 102, 255)'},
	{name:'grey',   value: 'rgb(231,233,237)'}
];

// chart.js options
var chart_color = Chart.helpers.color;
var config = {
    type:"bar",
    data: {
        labels: [],
        datasets: []
    },
    options: {
        legend: {
          position: 'top',
          labels: {
            fontColor: 'white'
          }
        },
        title: {
          display: true,
          text: 'Chart',
          fontColor: 'white',
          fontSize: 18
        },
        scales: {
            xAxes: [{
                ticks: {
                    fontColor: 'white'
                },
                gridLines: {
                    color: 'rgb(30, 30, 30)',
                    display: true,
                    drawBorder: true,
                    drawOnChartArea: true,
                    drawTicks: false,
                }
            }],
            yAxes: [{
                ticks: {
                    fontColor: 'white'
                },
                gridLines: {
                    color: 'rgb(30, 30, 30)',
                    display: true,
                    drawBorder: true,
                    drawOnChartArea: true,
                    drawTicks: false,
                }
            }]
        }
    },
    plugins:[
        {afterDraw:function(chart) {
            // var goin = false
            if(chart.data.labels.length === 0)    {              //goin = true
            //else if(chart.data.datasets[0].data.length === 0)   //goin = true
            //if (goin) {
                //if(chart.data.datasets[0].data.length === 0){
                 // oder chart.data.datasets.length === 0
                // No data is present
                var ctx = chart.chart.ctx;
                var width = chart.chart.width;
                var height = chart.chart.height;
                chart.clear();
    
                ctx.save();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = "2rem 'Helvetica Nueue'";
                ctx.fillStyle = "white";
                ctx.fillText('Please Select a Country', width / 2, height / 2);
                ctx.restore();
                }
            }
        }
    ]
};

// chart size
const styles = {
    width: '85%',
    height: "500px",
    overflow: "hidden"
}
// chart options size
const styles2 = {
    width: '15%'
}

// States
const id = {id:"ChartID_1"}
var init_Chart = true
var init_States= true
var chart;
var showing;
if(chart)   showing = chart.data.datasets
else        showing = 0
var number_of_colors = chartColors.length


function getRelevantData(CountryData, activeLegend, startDate, endDate, step, lastUpdated, relative){

    // ignore countries with no data
    if(CountryData === undefined) {
        if(chart.data.labels){
            return [[],chart.data.labels]
        } else {
            return [[],[]]
        }
    }
    
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDaysStart = Math.round(Math.abs((startDate - lastUpdated) / oneDay));
    const NumberDays = Math.round(Math.abs((startDate - endDate) / oneDay));
    var left_index = CountryData.length - 1 - diffDaysStart
    var right_index = CountryData.length - diffDaysStart + NumberDays
    var relevantData = CountryData.slice(left_index,right_index)

    function roundToTwo(num) {
        return +(Math.round(num + "e+2")  + "e-2");
    }
    function roundTo4(num) {
        return +(Math.round(num + "e+4")  + "e-4");
    }
    function data_sorting(f){
        var labels = []
        var data = []
        var sum_array = []

        const monthNames = ["January", "February", "March", "April", "May", "June",
                            "July", "August", "September", "October", "November", "December"
                            ];

        const sum = (accumulator, currentValue) => Number(accumulator) + Number(currentValue);

        for (var i=0; i<relevantData.length; i++){
            var elem = relevantData[i]
            var date = new Date(elem.date)
            if(step.label === "Day"){
                data.push(roundToTwo(f(elem)))
                labels.push(date.toLocaleDateString())
            }
            else if(step.label === "Week"){
                sum_array.push(f(elem))
                if(date.getDay() === 0 || i === relevantData.length-1){
                    data.push(roundToTwo(sum_array.reduce(sum)/sum_array.length))
                    sum_array = []
                    if (date.getDay() === 0) labels.push(date.toDateString())
                    else                    labels.push("last Week")
                }
            }
            else {
                sum_array.push(f(elem))
                if(date.getDate() === 1 || i === relevantData.length-1){
                    data.push(roundToTwo(sum_array.reduce(sum)/sum_array.length))
                    sum_array = []
                    if (date.getDate() === 1)    labels.push(monthNames[date.getMonth()])
                    else                         labels.push("last Month")
                }
            }
        }
        return [data,labels]
    }

    switch(activeLegend){
        
        case "Cumulative Fatalities":
            return data_sorting(x => {
                if(relative) return roundTo4(x["totalDeaths"]/x.population)*100
                else return x["totalDeaths"]
            })
   
        case "New Cases(21 Days)":
            return data_sorting(x => {
                if(relative) return roundTo4(x["newCases21Days"]/x.population)*100
                else return x["newCases21Days"]
            })

        case "7-Day-Incidence":
            return data_sorting(x => roundToTwo(x["newCases7Days"]/x["population"]*100000))

        case "Cumulative Cases":
            return data_sorting(x => {
                if(relative) return roundTo4(x["totalCases"]/x.population)*100
                else return x["totalCases"]
            })

        default:
            return [[],[]];
    }
}

function chart_addDataset(chart,data,labels,activeCountry){

    // get the right color. If a country in the middle has been deleted, there is a free color. 
    // and here I find this color
    var sets = chart.data.datasets.length
    var index;
    if(sets === 0) {
        index = 0
    }
    else if (sets === 1){
        index = chart.data.datasets[0].colorNumber + 1
    } else {
        var numbers = [...Array(number_of_colors).keys()];
        for( let c of chart.data.datasets){
            numbers.splice(numbers.findIndex(x=>x===c.colorNumber),1)
        }
        index = numbers.shift()
    }
    
    chart.data.datasets.push({
        label: activeCountry,
        data: data,
        //color
        backgroundColor: chart_color(chartColors[index].value).alpha(0.2).rgbString(),
        borderColor: chartColors[index].value,
        colorNumber:index,
        pointBackgroundColor: chartColors[index].value,
        borderWidth: 1
    })
    chart.data.labels = labels
}

function chart_deleteDataset(chart,country){
    var datasets = chart.data.datasets
    for(var i=0; i<datasets.length; i++){
        if(datasets[i].label === country){
            datasets.splice(i,1)
        }
    }
    if( datasets.length === 0 ) {
        chart.data.labels = []
    }
}

/* --------------------------------------------------------------------------------
| The Component
|-----------------------------------------------------------------------------------
*/
const Charts = (props) => {
    var completeData = props.completeData
    // States
    // tracks the stepsize selected in the options panel
    const [step, setStep] = useState({ value: 'd', label: 'Day' });
    const [relativeState, setRelativeState] = useState(false);
    
    /* --------------------------------------------------------------------------------
    | Init Chart
    |-----------------------------------------------------------------------------------
    | useEffect wird standartmäßig aufgerufen, nachdem die UI gerendert ist. Dann kann das Chart mit "new Chart" erst initialisert werden, nach dem Rendern.
    */
    useEffect(()=>{
        if(completeData){
            var ctx = document.getElementById(id.id).getContext("2d");
            chart = new Chart(ctx, config);
            init_Chart = false
            showing = chart.data.datasets
        }
          
    },[completeData])

    /* --------------------------------------------------------------------------------
    | Handle Map Select
    |-----------------------------------------------------------------------------------
    */
    useEffect(()=>{
            // If the selection on the map wasn't already selected, add it to the selected coutries
            var notselected = true
            for(var selected of props.selectedCountries){
                if(selected.label === props.activeCountry) {
                    notselected = false
                    break
                }
            }
            if(notselected) {
                // if more countries have been selected, than there are colors
                if(showing.length >= number_of_colors)   return props.alert.show("Maximum number of countries reached")
                else                                     props.setSelectedCountries(x => [...x,{value:props.activeCountry,label:props.activeCountry}])
            }
    // Bitte das Array so lassen. Ich schränke ein, wann der Effect laufen soll, 
    // nämlich nur wenn sie die ActiveCountry ändert:
    },[props.activeCountry])

    /* --------------------------------------------------------------------------------
    | Manage Datasets
    |-----------------------------------------------------------------------------------
    | compares the selected countries with already added to the chart countries
    | adds and deletes datasets
    */
    useEffect(() => {
        // Chart Data rendering
        if(chart){
            //var activeCountry = props.activeCountry
            var activeLegend = props.activeLegend
            var CountryData ;

            // Compare addedCountries and selectedCountries
            //get added Countries
            var compare_added = []
            for (var elem of chart.data.datasets){
                compare_added.push(elem.label)
            }

            
            var compare_selected = [...props.selectedCountries]
            for(var i=0; i<compare_added.length; i++){
                for(var j=0; j<compare_selected.length; j++){
                    if(compare_added[i] === compare_selected[j].label){
                        compare_added.splice(i,1)
                        compare_selected.splice(j,1)
                        i--;
                        break
                    }
                }
            }

            // add selected Countries
            for(var country of compare_selected){
                //if(country.label === "Map") continue
                if(country.label === "World"){ 
                    CountryData = props.WorldData
                } else {
                    CountryData = completeData[country.label.toLowerCase()]
                }
                var [data,labels] = getRelevantData(CountryData,activeLegend, props.startDate, props.endDate, step, new Date(props.lastUpdate), relativeState)
                chart_addDataset(chart,data,labels,country.label)

            }
            // delete deselected Countries
            for(var deselect_country of compare_added){
                chart_deleteDataset(chart,deselect_country)
            }
            chart.update()
        }
    },[props.selectedCountries, completeData])

    /* --------------------------------------------------------------------------------
    | Range Update
    |-----------------------------------------------------------------------------------
    | Triggered by changes to startDate, endDate, stepsize and the Legend
    | deletes the current datasets and calls Manage Datasets by changeing addedCountries
    */
    useEffect(() => {
        if(chart){
            
            // Update Chart Title
            chart.options.title.text = props.activeLegend

            for(var chart_data of chart.data.datasets){
                var country_name = chart_data.label
                var CountryData;
                if(country_name === "World"){ 
                    //if(props.activeLegend === "7-Day-Incidence") return props.alert.info("not implemented for World yet") // 7-Day-Incidence is not correct implemented for WorldData
                    CountryData = props.WorldData
                } else {
                    CountryData = completeData[country_name.toLowerCase()]
                }
                var [data,labels] = getRelevantData(CountryData,props.activeLegend, props.startDate, props.endDate, step, new Date(props.lastUpdate), relativeState)
                chart_data.data = data
            }
            chart.data.labels = labels
            chart.update()
        }
    },[props.startDate, props.endDate, step, props.activeLegend, relativeState])

    /* --------------------------------------------------------------------------------
    | RegionList
    |-----------------------------------------------------------------------------------
    | Create a Region List for the select option
    */
   /*
    useEffect(() => {
        if(props.completeRegionData){
            var region_list = []
            for(var country in props.completeRegionData[0]){
                var obj = {
                    label:country,
                    options:[]
                }
                for( var Kreis in props.completeRegionData[0][country]){
                    obj.options.push({ value: country, label: Kreis })
                }
                region_list.push(obj)
            }
            props.setRegionList(region_list)
        }
    },[props.completeRegionData])
    */
    /* --------------------------------------------------------------------------------
    | Change Fokus (World / Region)
    |-----------------------------------------------------------------------------------
    | Clear Chart Data when one changes from the World view to the Region view
    */
    useEffect(() => {
        // Delete Datasets from Chart
        if(chart){
            /*
            var datasets = chart.data.datasets
            for(var i=0; i<datasets.length; i++){
                datasets.splice(i,1) 
            }
            */
           /*
            if(props.activeFocus === "World"){
                props.setSelectedCountries(["World"]);
                //var [data,labels] = getRelevantData(props.WorldData,props.activeLegend, props.startDate, props.endDate, step, new Date(props.lastUpdate))
                //chart_addDataset(chart,data,labels,"World")
            } else {
                props.setSelectedCountries([]);
                //chart.data.labels = []
                //props.setSelectedCountries([]);
            }
            //chart.update()
            */
        }
    },[props.activeFocus])

    /* --------------------------------------------------------------------------------
    | Initialize States
    |-----------------------------------------------------------------------------------
    | Once the Complete Data is loaded (the if statement) , we do some calculation
    | getting: a list of countries, the data calculated for the whole world
    | and we update the date pickers with the date, the data was last updated
    | While the data is not loaded, display the loading screen
    */
    if(completeData){
        
        // init_States to avoid looping (only execute once)
        if(props.lastUpdate && init_States){
            init_States = false
            // Update the Datepickers with the lastUpdate constraint
            var now = new Date(props.lastUpdate)
            var lastWeek = new Date(props.lastUpdate)
            lastWeek.setDate(now.getDate() - 7)
            props.setStartDate(lastWeek)
            props.setEndDate(now)

            // make a list of countries for the addCountry select
            // you can fix a country, which can then not be deselected by adding the property "isFixed: true" eg: { value: 'Map', label: 'Map', isFixed: true}
            var country_list = []
            country_list.push({ value: 'World', label: 'World'})
            for(var name in completeData){
                country_list.push({ value: name, label: name })
            }
            props.setcountryList(country_list)

            // World Data
            var WorldData = []
            var array_length = completeData[country_list[1].label].length
            for(var i=0; i<array_length; i++){
                var obj = {
                    "totalDeaths":   0,
                    "totalCases":0,
                    "newCases21Days":0,
                    "newCases7Days":0,
                    "population":0
                }
                for(var country in completeData){
                    if(completeData[country].length <= i) continue
                    obj.totalDeaths = obj.totalDeaths + completeData[country][i].totalDeaths
                    obj.totalCases = obj.totalCases + completeData[country][i].totalCases
                    obj.newCases21Days = obj.newCases21Days + completeData[country][i].newCases21Days
                    obj.newCases7Days = obj.newCases7Days + completeData[country][i].newCases7Days
                    obj.population = obj.population + completeData[country][i].population
                }
                obj.date = completeData[country][i].date
                WorldData.push(obj)
            }
            props.setWorldData(WorldData)
        }

        

        return (
            <div className="chartContainer">
                <div style={styles}>
                    <canvas style={{width:'100%',height:'500px'}} id={id.id}/>
                </div>
                <div style={styles2}>
                    <ChartMenu 
                        setStep={setStep} 
                        startDate={props.startDate} 
                        endDate={props.endDate} 
                        setEndDate={props.setEndDate} 
                        setStartDate={props.setStartDate} 
                        lastUpdate={props.lastUpdate}
                        country_list={props.countryList}
                        region_list={props.RegionList}
                        selectedCountries={props.selectedCountries}
                        setSelectedCountries={props.setSelectedCountries}
                        showing={showing} number_of_colors={number_of_colors}
                        alert={props.alert}
                        activeFocus={props.activeFocus}
                        relativeState={relativeState}
                        setRelativeState={setRelativeState}
                        />
                </div>    
            </div>
        );
    } else {
        return (
            <div className="chartContainer">
                <LoadingMap />
            </div>
        )
    }
}
//<canvas style={{width:'95%',height:'500px'}} id={id.id}/>

export default Charts;
