import React from "react";
import Select from 'react-select'
import "./AddCountry.css"
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const styles = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, backgroundColor: 'gray' } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, fontWeight: 'bold', color: 'white', paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: 'none' } : base;
  },
};

const orderOptions = values => {
  return (
    values &&
    values.filter(v => v.isFixed).concat(values.filter(v => !v.isFixed))
  );
};


const AddCountry = (props) => {

  const onChange = (value, { action, removedValue }) => {
    var check_count = true
    switch (action) {
      case "remove-value":
        check_count = !check_count
      case "pop-value":
        if (removedValue.isFixed) {
          return;
        }
        break;
      case "clear":
        value = props.country_list.filter(v => v.isFixed);
        break;
      default:
        break;
    }
    value = orderOptions(value);
    if(props.showing.length >= props.number_of_colors && check_count) return props.alert.show("Maximum number of countries reached")
    props.setSelectedCountries(value);
  };

  return (
    <Select 
      options={props.country_list} 
      components={animatedComponents}
      className="AddCountry"
      isMulti={true} 
      onChange={onChange}
      styles={styles}
      value={props.selectedCountries}
      isClearable={props.selectedCountries && props.selectedCountries.some(v => !v.isFixed)}
      theme={(theme) => ({
        ...theme,
        borderRadius: 0,
        colors: {
        ...theme.colors,
          text: 'red',
          neutral0: 'white',
          primary25: '#B2D4FF',
          primary: '#2684FF',
          neutral90: 'green'
        },
      })}
    />
  )
}

export default AddCountry