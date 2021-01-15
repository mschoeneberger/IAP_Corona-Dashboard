import LegendItem from "../entities/LegendItem";
import formatNumberWithPeriods from "./formatNumberWithPeriods";

//Generates an array of 7 LegendItems 
function buildLegend (max) {
    var legendItems = [];
    var newmax = Math.round(max);
    var maxlength = newmax.toString().length;
    var oldmax;
    //building the array for float values
    if(maxlength===1){
        newmax = max.toFixed(3);
        legendItems.push(
            new LegendItem(
                `${newmax}+`,
                "#330000",
                (comparator) => comparator >= newmax,
                "white"
            )
        );
        oldmax = newmax;
        newmax = calcNewMax(newmax);
        legendItems.push(
            new LegendItem(
                `${newmax} - ${oldmax-0.001}`,
                "#660000",
                (comparator) => comparator >= newmax && comparator < oldmax,
                "white"
            )
        );
        oldmax = newmax;
        newmax = calcNewMax(newmax);
        legendItems.push(
            new LegendItem(
                `${newmax} - ${oldmax-0.001}`,
                "#990000",
                (comparator) => comparator >= newmax && comparator < oldmax
            )
        );
        oldmax = newmax;
        newmax = calcNewMax(newmax);
        legendItems.push(
            new LegendItem(
                `${newmax} - ${oldmax-0.001}`,
                "#e60000",
                (comparator) => comparator >= newmax && comparator < oldmax
            )
        );
        oldmax = newmax;
        newmax = calcNewMax(newmax);
        legendItems.push(
            new LegendItem(
                `${newmax} - ${oldmax-0.001}`,
                "#ff5544",
                (comparator) => comparator >= newmax && comparator < oldmax
            )
        );
        legendItems.push(
            new LegendItem(
                `0.001 - ${newmax-0.001}`,
                "#ff8080",
                (comparator) => comparator >= 1 && comparator < newmax
            )
        );
        legendItems.push(
            new LegendItem("No Data", "#ffff4d", (comparator) => true)
        );
    }
    //building the array for ints
    else{
        newmax = Math.round(newmax/Math.pow(10,maxlength-1))*Math.pow(10,maxlength-1);
        legendItems.push(
            new LegendItem(
                `${formatNumberWithPeriods(newmax)}+`,
                "#330000",
                (comparator) => comparator >= newmax,
                "white"
            )
        );
        oldmax = newmax;
        newmax = calcNewMax(newmax);
        legendItems.push(
            new LegendItem(
                `${formatNumberWithPeriods(newmax)} - ${formatNumberWithPeriods(oldmax-1)}`,
                "#660000",
                (comparator) => comparator >= newmax && comparator < oldmax,
                "white"
            )
        );
        oldmax = newmax;
        newmax = calcNewMax(newmax);
        legendItems.push(
            new LegendItem(
                `${formatNumberWithPeriods(newmax)} - ${formatNumberWithPeriods(oldmax-1)}`,
                "#990000",
                (comparator) => comparator >= newmax && comparator < oldmax
            )
        );
        oldmax = newmax;
        newmax = calcNewMax(newmax);
        legendItems.push(
            new LegendItem(
                `${formatNumberWithPeriods(newmax)} - ${formatNumberWithPeriods(oldmax-1)}`,
                "#e60000",
                (comparator) => comparator >= newmax && comparator < oldmax
            )
        );
        oldmax = newmax;
        newmax = calcNewMax(newmax);
        legendItems.push(
            new LegendItem(
                `${formatNumberWithPeriods(newmax)} - ${formatNumberWithPeriods(oldmax-1)}`,
                "#ff5544",
                (comparator) => comparator >= newmax && comparator < oldmax
            )
        );
        legendItems.push(
            new LegendItem(
                `1 - ${formatNumberWithPeriods(newmax-1)}`,
                "#ff8080",
                (comparator) => comparator >= 1 && comparator < newmax
            )
        );
        legendItems.push(
            new LegendItem("No Data", "#ffff4d", (comparator) => true)
        );
    }
    return legendItems;
}

function calcNewMax(max){
    let retmax = Math.round(max/2);
    let maxlength = retmax.toString().length;
    if(maxlength===1){
        return (max/2).toFixed(3);
    }
    else{
        return Math.round(retmax/Math.pow(10,maxlength-1))*Math.pow(10,maxlength-1);
    }
}

export default buildLegend;