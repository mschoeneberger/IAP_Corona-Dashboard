import "./Tooltipbox.css";
import React from 'react';
import {FaInfoCircle} from "react-icons/fa";

const tooltipText = {
    "None": (<></>),
    "Cumulative Cases": {
        "English": (<>
            <h5>Cumulative Cases<FaInfoCircle style={{float:"right"}}/></h5>
            <p>All confirmed cases added up.</p>
        </>),
        "Deutsch": (<>
            <h5>Kumulative Fälle<FaInfoCircle style={{float:"right"}}/></h5>
            <p>Alle bestätigten Fälle zusammenaddiert.</p>
        </>)
    },
    "New Cases(21 Days)": {
        "English": (<>
            <h5>New Cases (21Days)<FaInfoCircle style={{float:"right"}}/></h5>
            <p>All new, confirmed cases in the last 21 days added up to approximate the active cases in that region.</p>
        </>),
        "Deutsch": (<>
            <h5>Neue Fälle (21 Tage)<FaInfoCircle style={{float:"right"}}/></h5>
            <p>Alle neu bestätigten Fälle der letzten 21 Tage aufaddiert, um die Zahl der aktiven Infektionen zu approximieren.</p>
        </>)
    },
    "7-Day-Incidence": {
        "English": (<>
            <h5>7-Day-Incidence<FaInfoCircle style={{float:"right"}}/></h5>
            <p>A measurement to compare infection trends. The value of the new cases of the last 7 days per 100 000 people.</p>
        </>),
        "Deutsch": (<>
            <h5>7-Tages-Inzidenz<FaInfoCircle style={{float:"right"}}/></h5>
        <p>Ein Maß zum Vergleichen des Infektionsgeschehens. Der Wert wird gebildet aus den Neuinfektionen der letzten 7 Tage pro 100 000 Einwohner.</p>
        </>)
    },
    "ICU-Occupancy": {
        "English": (<>
            <h5>ICU-Occupancy<FaInfoCircle style={{float:"right"}}/></h5>
            <p>Percentage value of how many Intensive-Care-Units are currently occupied. For German countries only.</p>
        </>),
        "Deutsch": (<>
            <h5>Intensivstation-Belegung<FaInfoCircle style={{float:"right"}}/></h5>
            <p>Prozentualer Wert, der angibt wie viele Intensivbetten aktuell belegt sind. Nur für deutsche Bundesländer.</p>
        </>)
    },
    "Cumulative Fatalities": {
        "English": (<>
            <h5>Cumulative Fatalities<FaInfoCircle style={{float:"right"}}/></h5>
            <p>All confirmed Covid-19 related deaths added up.</p>
        </>),
        "Deutsch": (<>
            <h5>Kumulative Todesfälle<FaInfoCircle style={{float:"right"}}/></h5>
            <p>Alle bestätigten, mit Covid-19 in Verbindung gebrachten Todesfälle aufaddiert.</p>
        </>)
    },
    "Testing Rate": {
        "English": (<>
            <h5>Testing Rate<FaInfoCircle style={{float:"right"}}/></h5>
            <p>Covid-19 related tests per week.</p>
        </>),
        "Deutsch": (<>
            <h5>Test Rate<FaInfoCircle style={{float:"right"}}/></h5>
            <p>Covid-19-Tests pro Woche.</p>
        </>)
    },
    "Vaccinated Population": {
        "English": (<>
            <h5>Vaccinated Population<FaInfoCircle style={{float:"right"}}/></h5>
            <p>Amount of people that have been vaccinated against Covid-19.</p>
        </>),
        "Deutsch": (<>
            <h5>Geimpfte Bevölkerung<FaInfoCircle style={{float:"right"}}/></h5>
            <p>Anzahl der gegen Corona geimpften Menschen.</p>
        </>)
    }
};

const Tooltipbox = (props) => {
    var vis = "hidden";
    if(props.tooltipOpen === "None"){
        vis = "hidden";
    }
    else{
        vis = "visible";
    }
    var a = (<div className="Tooltipbox" style={{visibility: "visible"}}>
            {tooltipText[props.tooltipOpen][props.activeLanguage]}
        </div>);
    a.props.style.visibility = vis;
    return a;
}
 
export default Tooltipbox;