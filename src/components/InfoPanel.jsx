import React, {useState} from 'react';
import "./InfoPanel.css";
import Legend from "./Legend";
import Newsticker from "./Newsticker";
import NewstickerLanguage from "./NewstickerLanguage";

const InfoPanel = (props) => {
    const [activeLanguage, setActiveLanguage] = useState("Deutsch");
    return (
        <div className="InfoStructure">
            <div className ="Header">
                <h2>Legend</h2>
            </div>
            <Legend legends={props.legends} active={props.active} />
            <div className = "Header">
                <h2>Newsticker</h2>
            </div>
            <Newsticker activeLanguage={activeLanguage}/>
            <NewstickerLanguage activeLanguage={activeLanguage} setActiveLanguage={setActiveLanguage}/>
        </div>
     );
}
 
export default InfoPanel;