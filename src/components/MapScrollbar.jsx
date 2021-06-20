import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const MapScrollbar = (props) => {
    var date;
    var max;
    var datetext;
    if(props.activeLanguage === "English"){
        datetext = "Displayed Date: ";
    }
    else{
        datetext = "Dargestelltes Datum: ";
    }
    
    if(props.alldates.length === 0){
        date = "Loading";
        max = 365;
    }
    else{
        date=props.alldates[props.mapDate].toLocaleDateString();
        max=props.alldates.length-1;
    }
    return (
    <div style={{flexBasis:"95%", flexGrow:"1", height:"100%", display:"flex", flexDirection:"row", paddingRight:"5%", alignItems:"center"}}>
        {props.alldates.length === 0 ? (<>
                <p style={{padding:"2px"}}>Loading</p>
            </>
        ) : (<>
                <p>{datetext}{date}</p>
                <Slider dots step={7} min={0} max={max} value={props.mapDate} onChange={props.setMapDate} reverse="true" disabled={(props.focus === "World") ? (props.countries.length === 0) : (props.regions.length ===0)}/>
            </>
        )}
        
    </div>);
}
 
export default MapScrollbar;