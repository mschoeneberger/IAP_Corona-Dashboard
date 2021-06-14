import React,  { useState,useEffect } from 'react';
import "./Charts.css"
import Chart, { plugins } from 'chart.js'
import ChartMenu_Vacc from "./ChartMenu/ChartMenu_Vacc.jsx"
import LoadingMap from "./LoadingMap";

// Global Var
var German_population = 83200000;

// chart.js options
var chart_color = Chart.helpers.color;
var config = {
    type:"line",
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
var chart;

function getRelevantData(CountryData, activeLegend, startDate, endDate, step, lastUpdated,relative){

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
            var date = new Date(elem.date)
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

    if (activeLegend === "first vacc"){
        if(relative) return data_sorting( x => x["first vacc"]/German_population*100)
        else return data_sorting(x => x["first vacc"])
    }
    else if (activeLegend === "second vacc"){
        if(relative) return data_sorting( x => x["second vacc"]/German_population*100)
        else return data_sorting(x => x["second vacc"])
    }
    else {
        return [[],[]];
    }
}

/* --------------------------------------------------------------------------------
| The Component
|-----------------------------------------------------------------------------------
*/
const Charts_Vacc = (props) => {
    // States
    // tracks the stepsize selected in the options panel
    const [step, setStep] = useState({ value: 'd', label: 'Day' });
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [relativeState, setRelativeState] = useState(false);
    

    /* --------------------------------------------------------------------------------
    |  Chart Init
    |-----------------------------------------------------------------------------------
    | 
    */
    useEffect(() => {
        if(props.completeRegionData){
            if(props.completeRegionData.length > 1){
                // Set States
                var now = new Date(props.lastUpdate)
                var lastWeek = new Date(props.lastUpdate)
                lastWeek.setDate(now.getDate() - 7)
                setStartDate(lastWeek)
                setEndDate(now)
                // Set Chart
                var ctx = document.getElementById(id.id).getContext("2d");
                chart = new Chart(ctx, config);
                /*
                for (var country of props.completeRegionData[0]){
                    if (country === "Germany"){
                        German_population = country[0].population
                        break
                    }
                }
                */
            }
        }
    },[props.completeRegionData])


    /* --------------------------------------------------------------------------------
    |  Chart Update
    |-----------------------------------------------------------------------------------
    | 
    */
    useEffect(() => {
        if(props.completeRegionData){
            if(props.completeRegionData.length > 1){
                startDate = new Date("1/1/21")
                endDate = new Date("1/2/21")
                // Language Support
                var labels_names = {
                    dataset:{
                        English:["First Vaccination", "Second Vaccination"],
                        Deutsch:["Erstimpfung", "Zweitimpfung"]
                    },
                    title:{
                        English:"Vaccinations in Germany",
                        Deutsch:"Impfungen in Deutschland"
                    }
                }
                //First Vacc
                var VaccData = props.completeRegionData[1].vacc
                var [data,labels] = getRelevantData(VaccData,"first vacc", startDate, endDate, step, new Date(props.lastUpdate),relativeState)
                var color = "rgb(75, 192, 192)"
                chart.data.datasets.push({
                    label: labels_names.dataset[props.activeLanguage][0],
                    data: data,
                    //color
                    backgroundColor: chart_color(color).alpha(0.2).rgbString(),
                    borderColor: color,
                    colorNumber:0,
                    pointBackgroundColor: color,
                    borderWidth: 1
                })
                //Second Vacc
                var [data,labels] = getRelevantData(VaccData,"second vacc", startDate, endDate, step, new Date(props.lastUpdate),relativeState)
                var color = "rgb(75, 192, 150)"
                chart.data.datasets.push({
                    label: labels_names.dataset[props.activeLanguage][1],
                    data: data,
                    //color
                    backgroundColor: chart_color(color).alpha(0.2).rgbString(),
                    borderColor: color,
                    colorNumber:1,
                    pointBackgroundColor: color,
                    borderWidth: 1
                })
                // Chart Labels
                chart.options.title.text = labels_names.title[props.activeLanguage]
                chart.data.labels = labels
                chart.update()
            }
        }
    },[props.startDate, props.endDate, step, relativeState])

    /* --------------------------------------------------------------------------------
    | Loading Indicator
    |-----------------------------------------------------------------------------------
    | Show the loading Indicator until the data is loaded
    */
    if(props.completeRegionData){
        if(props.completeRegionData.length > 1){
            return (
                <div className="chartContainer">
                    <div style={styles}>
                        <canvas style={{width:'100%',height:'500px'}} id={id.id}/>
                    </div>
                    <div style={styles2}>
                        <ChartMenu_Vacc
                            setStep={setStep} 
                            startDate={startDate} 
                            endDate={endDate} 
                            setEndDate={setEndDate} 
                            setStartDate={setStartDate} 
                            lastUpdate={props.lastUpdate}
                            alert={props.alert}
                            relativeState={relativeState}
                            setRelativeState={setRelativeState}
                            />
                    </div>    
                </div>
            );
        }
    } 
    return (
        <div className="chartContainer">
            <LoadingMap />
        </div>
    )
}
//<canvas style={{width:'95%',height:'500px'}} id={id.id}/>

export default Charts_Vacc;
