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
                    fontColor: 'white',
                    beginAtZero:true
                },
                gridLines: {
                    color: 'rgb(30, 30, 30)',
                    display: true,
                    drawBorder: true,
                    drawOnChartArea: true,
                    drawTicks: false,
                },
                scaleLabel: {
                    display: false,
                    labelString: 'percent [%]',
                  }
            }]
        }
    },
    plugins:[
        {afterDraw:function(chart) {
            // var goin = false
            if(!chart.data.labels || chart.data.labels.length === 0)    {              //goin = true
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
                ctx.fillText('Please Select a Region', width / 2, height / 2);
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

function find_Bundesland_in_Germany(region,Ger){
    for(var Bundesland in Ger){
        for( var Landkreis in Ger[Bundesland]){
            if(Landkreis === region) return Bundesland
        }
    }
}
function is_German(country, Ger){
    for(var Bundesland in Ger){
        if(Bundesland === country) return true
    }
    return false
}

function getRelevantData(CountryData, activeLegend, startDate, endDate, step, lastUpdated, relative, Ger){

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

    function roundTo2(num) {
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
            if(Ger) var date = new Date(elem.d)
            else var date = new Date(elem.date)
            if(step.label === "Day"){
                data.push(roundTo2(f(elem)))
                labels.push(date.toLocaleDateString())
            }
            else if(step.label === "Week"){
                sum_array.push(f(elem))
                if(date.getDay() === 0 || i === relevantData.length-1){
                    data.push(roundTo2(sum_array.reduce(sum)/sum_array.length))
                    sum_array = []
                    if (date.getDay() === 0) labels.push(date.toDateString())
                    else                    labels.push("last Week")
                }
            }
            else {
                sum_array.push(f(elem))
                if(date.getDate() === 1 || i === relevantData.length-1){
                    data.push(roundTo2(sum_array.reduce(sum)/sum_array.length))
                    sum_array = []
                    if (date.getDate() === 1)    labels.push(monthNames[date.getMonth()])
                    else                         labels.push("last Month")
                }
            }
        }
        return [data,labels]
    }

    if (activeLegend === "Cumulative Fatalities"){
        if(Ger){
            if(relative) return data_sorting(
                    x => {
                        var result = roundTo4(x["h"]/x.population)*100
                        return result
                    }
                )
            else return data_sorting(x => x["h"])
        } else {
            if(relative) return data_sorting(x => {return roundTo4(x["totalDeaths"]/x.population)*100})
            else return data_sorting(x => {return x["totalDeaths"]})
        }
    }
    else if (activeLegend === "New Cases(21 Days)"){
        if(Ger){
            if(relative) return data_sorting(x => roundTo4(x["g"]/x.population)*100)
            else return data_sorting(x => x["g"])
        } else {
            if(relative) return data_sorting(x => roundTo4(x["newCases21Days"]/x.population)*100)
            else return data_sorting(x => x["newCases21Days"])
        }
    }
    else if (activeLegend ===  "7-Day-Incidence"){
        if(Ger){
            return data_sorting(x => roundTo2(x["f"]/x["population"]*100000))
        } else {
            return data_sorting(x => roundTo2(x["newCases7Days"]/x["population"]*100000))
        }
    }
    else if (activeLegend ===  "ICU-Occupancy"){
        if(Ger){
            return data_sorting(x => roundTo2(x["j"]/(x["k"]+x["j"])*100))
        } else {
            return data_sorting(x => 0)
        }
    }
    else if (activeLegend === "Cumulative Cases"){
        if(Ger){
            if(relative) return data_sorting(x => roundTo4(x["e"]/x.population)*100)
            else return data_sorting(x => x["e"])
        } else {
            if(relative) return data_sorting(x => roundTo4(x["totalCases"]/x.population)*100)
            else return data_sorting(x => x["totalCases"])
        }
    }  
    else {
        return [[],[]];
    }
}

function chart_addDataset(chart,data,labels,activeRegion){

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
        label: activeRegion,
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
const Charts_Region = (props) => {
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
        if(props.completeRegionData){
            var ctx = document.getElementById(id.id).getContext("2d");
            chart = new Chart(ctx, config);
            init_Chart = false
            showing = chart.data.datasets
            chart.data.labels = []
        }

          
    },[props.completeRegionData])

    /* --------------------------------------------------------------------------------
    | Handle Map Select
    |-----------------------------------------------------------------------------------
    */
    useEffect(()=>{
            // If the selection on the map wasn't already selected, add it to the selected coutries
            if(props.activeRegion){
                // Check if German data is loaded. If not, notify about loading Times
                if(props.activeRegion.country === "Germany"){
                    if(props.completeRegionData.length === 1) return props.alert.show("German region data is loading. \nThis can take up to two minutes")
                    
                    var Active_country = find_Bundesland_in_Germany(props.activeRegion.region,props.completeRegionData[1])
                    var Active_region = props.activeRegion.region
                }
                else {
                    var Active_country = props.activeRegion.country.toLowerCase()
                    var Active_region = props.activeRegion.region
                }

                var notselected = true
                for(var selected of props.selectedRegions){
                    if(selected.value === Active_country && selected.label === Active_region) {
                        notselected = false
                        break
                    }
                }
                if(notselected) {
                    // if more countries have been selected, than there are colors
                    if(showing.length >= number_of_colors)   return props.alert.show("Maximum number of regions reached")
                    else{
                        props.setSelectedRegions(x => [...x,{value:Active_country, label:Active_region}])
                    }                                     
                }
            }
    
    // !!! effect has to run only if activeRegion changes:
    },[props.activeRegion])

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

            //get added Regions
            var compare_added = []
            for (var elem of chart.data.datasets){
                compare_added.push(elem.label)
            }

            
            var compare_selected = [...props.selectedRegions]
            for(var i=0; i<compare_added.length; i++){
                for(var j=0; j<compare_selected.length; j++){
                    var str_arr = compare_added[i].split("/")
                    if(str_arr[0] === compare_selected[j].value && str_arr[1] === compare_selected[j].label){
                        compare_added.splice(i,1)
                        compare_selected.splice(j,1)
                        i--;
                        break
                    }
                }
            }

            // add selected Countries
            for(var selected of compare_selected){
                
                // German data is formated differntly
                var Ger = false;
                if(is_German(selected.value, props.completeRegionData[1])){
                    CountryData = props.completeRegionData[1][selected.value][selected.label]
                    var Ger = true;
                }
                // Die Regionen sind klein Geschrieben. Außer bei einzelnen Ländern. z.B. {poland.poland:[...]} anstatt {austria.Oberösterreich:[...]}
                else if(props.completeRegionData[0][selected.value].length === 1){
                    CountryData = props.completeRegionData[0][selected.value][selected.label.toLowerCase()]
                } else {
                    CountryData = props.completeRegionData[0][selected.value][selected.label]
                }
                
                var [data,labels] = getRelevantData(CountryData,activeLegend, props.startDate, props.endDate, step, new Date(props.lastUpdate), relativeState, Ger)
                chart_addDataset(chart,data,labels,selected.value + "/" + selected.label)

            }
            // delete deselected Countries
            for(var deselect_country of compare_added){
                chart_deleteDataset(chart,deselect_country)
            }
            chart.update()
        }
    },[props.selectedRegions, props.completeRegionData])

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

            var Ger = false;

            for(var chart_data of chart.data.datasets){
                var country_name = chart_data.label
                var CountryData;
                var str_arr  = country_name.split("/")
                if(is_German(str_arr[0], props.completeRegionData[1])){
                    CountryData = props.completeRegionData[1][str_arr[0]][str_arr[1]]
                    var Ger = true;
                } else {
                    CountryData = props.completeRegionData[0][str_arr[0]][str_arr[1]]
                }

                var [data,labels] = getRelevantData(CountryData,props.activeLegend, props.startDate, props.endDate, step, new Date(props.lastUpdate), relativeState, Ger)
                chart_data.data = data
            }
            chart.data.labels = labels
            if(chart.options.scales.yAxes[0].scaleLabel)chart.options.scales.yAxes[0].scaleLabel.display = relativeState
            chart.update()
            // change chart axis label on relative
        }
    },[props.startDate, props.endDate, step, props.activeLegend, relativeState])

    /* --------------------------------------------------------------------------------
    | RegionList
    |-----------------------------------------------------------------------------------
    | Create a Region List for the select option
    */
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
            if(props.completeRegionData.length > 1){
                for(var Bundesland in props.completeRegionData[1]){
                    if(Bundesland === "vacc") continue;
                    var obj = {
                        label:Bundesland,
                        options:[]
                    }
                    for( var Kreis in props.completeRegionData[1][Bundesland]){
                        obj.options.push({ value: Bundesland, label: Kreis })
                    }
                    region_list.push(obj)
                }
            }
            props.setRegionList(region_list)
        }
    },[props.completeRegionData])

    /* --------------------------------------------------------------------------------
    | Initialize States
    |-----------------------------------------------------------------------------------
    | Once the Complete Data is loaded (the if statement) , we do some calculation
    | getting: a list of countries, the data calculated for the whole world
    | and we update the date pickers with the date, the data was last updated
    | While the data is not loaded, display the loading screen
    */
    if(props.completeRegionData){

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
                        selectedRegions={props.selectedRegions}
                        setSelectedRegions={props.setSelectedRegions}
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

export default Charts_Region;
