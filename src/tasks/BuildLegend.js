import LegendItem from "../entities/LegendItem";
import formatNumberWithSpaces from "./formatNumberWithSpaces";

//Builds a legend (array) with 7 Legend Items
function buildLegend (max) {
    var legendItems = [];
    var newmax = Math.floor(max);
    var maxlength = newmax.toString().length;
    var oldmax = Number.MAX_VALUE;
    //building the array for float values
    if(maxlength <= 2){
        newmax = max.toFixed(3);
        legendItems.push(
            new LegendItem(
                `${newmax}+`,
                "#330000",
                newmax,
                oldmax,
                "white"
            )
        );
        oldmax = newmax;
        newmax = calcNewMax(newmax);
        legendItems.push(
            new LegendItem(
                `${newmax} - ${oldmax}`,
                "#660000",
                newmax,
                oldmax,
                "white"
            )
        );
        oldmax = newmax;
        newmax = calcNewMax(newmax);
        legendItems.push(
            new LegendItem(
                `${newmax} - ${oldmax}`,
                "#990000",
                newmax,
                oldmax
            )
        );
        oldmax = newmax;
        newmax = calcNewMax(newmax);
        legendItems.push(
            new LegendItem(
                `${newmax} - ${oldmax}`,
                "#e60000",
                newmax,
                oldmax
            )
        );
        oldmax = newmax;
        newmax = calcNewMax(newmax);
        legendItems.push(
            new LegendItem(
                `${newmax} - ${oldmax}`,
                "#ff5544",
                newmax,
                oldmax
            )
        );
        legendItems.push(
            new LegendItem(
                `0.001 - ${newmax}`,
                "#ff8080",
                0.001,
                newmax
            )
        );
        legendItems.push(
            new LegendItem("No Data or below 0.001", "#ffff4d", 0, 0.001)
        );
    }
    //building the array for ints
    else{
        newmax = Math.round(newmax/Math.pow(10,maxlength-1))*Math.pow(10,maxlength-1);
        legendItems.push(
            new LegendItem(
                `${formatNumberWithSpaces(newmax)}+`,
                "#330000",
                newmax,
                oldmax,
                "white"
            )
        );
        oldmax = newmax;
        newmax = calcNewMax(newmax);
        legendItems.push(
            new LegendItem(
                `${formatNumberWithSpaces(newmax)} - ${formatNumberWithSpaces(oldmax)}`,
                "#660000",
                newmax,
                oldmax,
                "white"
            )
        );
        oldmax = newmax;
        newmax = calcNewMax(newmax);
        legendItems.push(
            new LegendItem(
                `${formatNumberWithSpaces(newmax)} - ${formatNumberWithSpaces(oldmax)}`,
                "#990000",
                newmax,
                oldmax
            )
        );
        oldmax = newmax;
        newmax = calcNewMax(newmax);
        legendItems.push(
            new LegendItem(
                `${formatNumberWithSpaces(newmax)} - ${formatNumberWithSpaces(oldmax)}`,
                "#e60000",
                newmax,
                oldmax
            )
        );
        oldmax = newmax;
        newmax = calcNewMax(newmax);
        legendItems.push(
            new LegendItem(
                `${formatNumberWithSpaces(newmax)} - ${formatNumberWithSpaces(oldmax)}`,
                "#ff5544",
                newmax,
                oldmax
            )
        );
        legendItems.push(
            new LegendItem(
                `1 - ${formatNumberWithSpaces(newmax)}`,
                "#ff8080",
                1,
                newmax
            )
        );
        legendItems.push(
            new LegendItem("No Data or below 1", "#ffff4d", 0, 1)
        );
    }
    return legendItems;
}

function calcNewMax(max){
    let retmax = Math.round(max/2);
    let maxlength = retmax.toString().length;
    if(maxlength <=2){
        return (max/2).toFixed(3);
    }
    else{
        return Math.floor(retmax/Math.pow(10,maxlength-1))*Math.pow(10,maxlength-1);
    }
}

export default buildLegend;