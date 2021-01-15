import React from 'react';
//import Chart from './chart.js';
import {Line} from 'react-chartjs-2';
import "./Charts.css"

function LineModified (para){
    const state = {
        labels: ['08.01.','09.01.','10.01.','11.01.','12.01.','13.01.','today'],
        datasets: [
        {
            label: "Cumulative Cases",
            backgroundColor: "rgba(255,255,255,0.7)",
            borderColor: "white",
            borderWidth: 2,
            data: JSON.parse(para.data)
        },
        ]
    }

    const chart_options = {
        title:{
        display:true,
        text:para.text,
        fontColor:"rgba(255,255,255,0.9)",
        fontSize:20
        },
        legend:{
        display:false
        },
        scales: {
            xAxes: [{
                gridLines: {
                    color: "rgba(255,255,255,0.5)",
                },
                ticks: {
                fontColor: "rgba(255,255,255,0.7)", // this here
                },
            }],
            yAxes: [{
                gridLines: {
                    color: "rgba(255,255,255,0.5)",
                },
                ticks: {
                fontColor: "rgba(255,255,255,0.7)", // this here
                },
            }]
        }
    }
    return <Line data={state} options={chart_options} />
}

const styles = {
    width: '30%'
}

export default class App extends React.Component {
  render() {
    return (
      <div className="chartContainer">
        <div style={styles}>
            <LineModified text="Stadtkreis Heidelberg" data="[3197,3242,3265,3284,3308,3341,3362]"/>
        </div>

        <div style={styles}>
            <LineModified text="Landkreis Rhein-Neckar" data="[12221,12329,12401,12472,12565,12656,12804]"/>
        </div>
        <div style={styles}>
            <LineModified text="Stadtkreis Mannheim" data="[8000,8100,8200,8400,8600,8800,9000]"/>
        </div>
      </div>
    );
  }
}