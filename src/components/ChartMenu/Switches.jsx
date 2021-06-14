import React from 'react';
import "../ChartMenu.css"
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { purple,white } from '@material-ui/core/colors';

const switchstyle = {zIndex: 999, "margin-left":"5px"}
const Switches = (props) => {

    const handleChange = (event) => {
        props.setRelativeState(event.target.checked);
       };

    
    const handleChangeVAC = (event) => {
        props.setShowVac(event.target.checked);
        /*
        if(event.target.checked){
            //document.querySelector("body").scrollTo({top:document.body.scrollHeight, left:0, behavior: "smooth"})
            wind.scrollBy({top: 600, left: 0, behavior: "smooth"})
        }
        */
    };
    const handleChangeCumVac = (event) => {
        props.setVacCumulative(event.target.checked);
    };
    const PurpleSwitch = withStyles({
    switchBase: {
        color: "#ffffff",
        '&$checked': {
        color: "#ffffff",
        },
        '&$checked + $track': {
        backgroundColor: "#b8b8b8",
        },
    },
    checked: {},
    track: {
        backgroundColor: "#7d7d7d"
    }
    })(Switch);
    
    return (
        <>
        {props.activeLanguage === "English" ? (
            <>
            <FormControlLabel
              control={
                <PurpleSwitch
                  style={switchstyle}
                  checked={props.relativeState}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label = "relative (%)"
            />
            <FormControlLabel
              control={
                <PurpleSwitch
                  style={switchstyle}
                  checked={props.showVac}
                  onChange={handleChangeVAC}
                  color="green"
                />
              }
              label = "German Vaccination"
            />
            {props.showVac ? (
                <>
                    <FormControlLabel
                        control={
                            <PurpleSwitch
                            style={switchstyle}
                            checked={props.vacCumulative}
                            onChange={handleChangeCumVac}
                            color="green"
                            />
                        }
                        label = "cumulative Vaccination"
                    />
                </>
            ):(<></>)}
            </>
        ) : (
            <>
                <FormControlLabel
                control={
                    <PurpleSwitch
                    style={switchstyle}
                    checked={props.relativeState}
                    onChange={handleChange}
                    color="primary"
                    />
                }
                label = "relativ (%)"
                />
                <FormControlLabel
                control={
                    <PurpleSwitch
                    style={switchstyle}
                    checked={props.showVac}
                    onChange={handleChangeVAC}
                    color="green"
                    />
                }
                label = "Deutsche Impfungen"
                />
                {props.showVac ? (
                    <>
                        <FormControlLabel
                            control={
                                <PurpleSwitch
                                style={switchstyle}
                                checked={props.vacCumulative}
                                onChange={handleChangeCumVac}
                                color="green"
                                />
                            }
                            label = "Kumulierte Impfungen"
                        />
                    </>
                ):(<></>)}
            </>
        )}
    </>)
}
export default Switches;