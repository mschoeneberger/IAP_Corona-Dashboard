import React from 'react';
import Playbutton from "./Playbutton";
import MapScrollbar from "./MapScrollbar";

const Timerow = (props) => {
    return (
        <div style={{flexBasis:"5vh", flexGrow:"0", width:"100%", display:"flex", flexDirection:"row"}}>
            <Playbutton playStatus={props.playStatus} setPlayStatus={props.setPlayStatus} mapDate={props.mapDate} setMapDate={props.setMapDate} focus={props.focus} countries={props.countries} regions={props.regions}/>
            <MapScrollbar setPlayStatus={props.setPlayStatus} playStatus={props.playStatus} alldates={props.alldates} mapDate={props.mapDate} setMapDate={props.setMapDate} activeLanguage={props.activeLanguage} focus={props.focus} countries={props.countries} regions={props.regions}/>
        </div>
    );
}
 
export default Timerow;