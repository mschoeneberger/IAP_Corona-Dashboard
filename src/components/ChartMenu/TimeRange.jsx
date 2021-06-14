
import React from "react";
import DatePicker from "react-datepicker";
import "./TimeRange.css"
import "react-datepicker/dist/react-datepicker.css";

const TimeRange = (props) => {

  if(props.endDate == null){
    return null
  } else {
    var lastUpdate = new Date(props.lastUpdate)
   
  return (
    <form>
    {props.activeLanguage === "English" ? (<label className="margin">from: </label>) : (<label className="margin">von: </label>)}
    <DatePicker
    selected={props.startDate}
    onChange={date => props.setStartDate(date)}
    selectsStart
    startDate={props.startDate}
    endDate={props.endDate}
    maxDate={props.endDate}
    minDate={new Date("01/22/2020")}
    className="DatePicker"
    popperPlacement="left"
  />
  <br/>
  {props.activeLanguage === "English" ? (<label className="margin2">to: </label>) : (<label className="margin2">bis: </label>)}
  <DatePicker
    selected={props.endDate}
    onChange={date => props.setEndDate(date)}
    selectsEnd
    startDate={props.startDate}
    endDate={props.endDate}
    minDate={props.startDate}
    maxDate={lastUpdate}
    className="DatePicker"
    popperPlacement="left"
  />
  
  </form>
  );
  }
};
export default TimeRange
