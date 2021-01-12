import React from 'react';
import "./InfoPanel.css";
import Legend from "./Legend";
import Newsticker from "./Newsticker";
import NewstickerLanguage from "./NewstickerLanguage";

const InfoPanel = (legendItems) => {
    return (
        <div className="InfoStructure">
            <div className ="Header">
                <h2>Legend</h2>
            </div>
            <Legend legendItems={legendItems.legendItems}/>
            <div className = "Header">
                <h2>Newsticker</h2>
            </div>
            <Newsticker/>
            <NewstickerLanguage/>
        </div>
     );
}
 
export default InfoPanel;