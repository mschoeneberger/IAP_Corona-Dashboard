import React from 'react';
import "./Legend.css";

const Legend = (props) => {
    var legendIndex = props.legends[0].findIndex((legendName)=>{return legendName === props.active;}) + 1;
    const items = props.legends[legendIndex];
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