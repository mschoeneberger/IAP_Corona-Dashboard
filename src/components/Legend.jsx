import React from 'react';
import "./Legend.css";

const Legend = (props) => {
    var legendIndex;
    var items;
    if(props.focus === "World"){
        legendIndex = props.legends[0].findIndex((legendName)=>{return legendName === props.active;}) + 1;
        items = props.legends[legendIndex];
    }
    else{
        legendIndex = props.regionLegends[0].findIndex((legendName)=>{return legendName === props.active;}) + 1;
        items = props.regionLegends[legendIndex];
    }
    return (
        <div className="Legend">
           {items.map((item) => (
               <div key={item.title}
                style ={{
                    backgroundColor: item.color,
                    textAlign: "center",
                    textJustify: "center",
                    flexGrow: "1",
                    color: item.textColor,
                    fontSize: "calc(min(2vw,2vh))"
                }}
               >
                   <span>{item.title}</span>
               </div>
           ))}
        </div>  
    );
}
 
export default Legend;