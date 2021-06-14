import buildLegend from "./BuildLegend";

//builds an array of various legends
//legendNames being the [0] entry.
function buildLegends(legendNames,maxValues){
    var legends = [legendNames];
    for(let i=0; i<legendNames.length; i++){
        legends.push(buildLegend(maxValues[i]));
    }
    return legends;
}

export default buildLegends;