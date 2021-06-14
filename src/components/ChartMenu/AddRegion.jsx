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

const AddRegion = (props) => {

  const onChange = (value, { action, removedValue }) => {
    var check_count = true
    switch (action) {
      case "remove-value":
        check_count = !check_count
        var arr = [...props.selectedRegions]
        var index = arr.findIndex(x => (x.label === removedValue.label && x.value === removedValue.value))
        arr.splice(index,1)
        props.setSelectedRegions(arr)
        return
        break;
      case "pop-value":
        if (removedValue.isFixed) {
          return;
        }
        break;
      case "clear":
        value = props.region_list.filter(v => v.isFixed);
        break;
      default:
        break;
    }
    value = orderOptions(value);
    //if(props.showing.length >= props.number_of_colors && check_count) return props.alert.show("Maximum number of regions reached")
    props.setSelectedRegions(value);//x => [...x,{country:value[0].value,region:value[0].label}]
  };

  const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
  };

  const formatGroupLabel = data => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  return (
    <Select 
      options={props.region_list} 
      components={animatedComponents}
      formatGroupLabel={formatGroupLabel} 
      className="AddCountry"
      isMulti={true} 
      onChange={onChange}
      styles={styles}
      value={props.selectedRegions}
      //isClearable={props.selectedRegions && props.selectedRegions.some(v => !v.isFixed)}
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

export default AddRegion
