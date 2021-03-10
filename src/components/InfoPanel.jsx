import React, {useState} from 'react';
import "./InfoPanel.css";
import Legend from "./Legend";
import Newsticker from "./Newsticker";
import NewstickerLanguage from "./NewstickerLanguage";

const InfoPanel = (props) => {
    const languageOptions = {
        "English": "Legend",
        "Deutsch": "Legende"
    }
    return (
        <div className="InfoStructure">
            <div className ="Header">
                <h2>{languageOptions[props.activeLanguage]}</h2>
            </div>
            <Legend legends={props.legends} active={props.active} />
            <div className = "Header">
                <h2>Newsticker</h2>
            </div>
            <Newsticker activeLanguage={props.activeLanguage}/>
            <NewstickerLanguage activeLanguage={props.activeLanguage} setActiveLanguage={props.setActiveLanguage}/>
        </div>
     );
}
 
export default InfoPanel;