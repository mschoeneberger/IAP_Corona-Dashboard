import React from 'react';
import "./Legend.css";

const Legend = (legendItems) => {
    const items = legendItems.legendItems;
    return (
        <div className="Legend">
           {items.map((item) => (
               <div key={item.title}
                style ={{
                    backgroundColor: item.color,
                    textAlign: "center",
                    textJustify: "center",
                    height: "5vh",
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