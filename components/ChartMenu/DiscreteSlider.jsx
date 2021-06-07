


import { DateRangePicker } from 'react-date-range';
import React from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'; 
import { addDays } from 'date-fns';

const Dings =  () => {

const [state, setState] = React.useState([
  {
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: 'selection'
  }
]);

function handleSelect(ranges){
  console.log(ranges);
  // {
  //   selection: {
  //     startDate: [native Date Object],
  //     endDate: [native Date Object],
  //   }
  // }
}
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }
  /*
  function componentDidMount() {
    $("#slider-range").slider({
        range: true,
        min: new Date('2010.01.01').getTime() / 1000,
        max: new Date('2014.01.01').getTime() / 1000,
        step: 86400,
        values: [new Date('2013.01.01').getTime() / 1000, new Date('2013.02.01').getTime() / 1000],
        slide: function (event, ui) {
            $("#amount").val((new Date(ui.values[0] * 1000).toDateString()) + " - " + (new Date(ui.values[1] * 1000)).toDateString());
        }
    });
    $("#amount").val((new Date($("#slider-range").slider("values", 0) * 1000).toDateString()) +
        " - " + (new Date($("#slider-range").slider("values", 1) * 1000)).toDateString());
}
*/
  return (
  <div>
  <p>
    <label for="amount">Date range:</label>
    <input type="text" id="amount" style="border: 0; color: #f6931f; font-weight: bold;" size="100" />
</p>
<div id="slider-range"></div>
</div>
  
)
  }





export default Dings;

/* <Popup trigger={<button> Trigger</button>} position="left center" modal
  nested>
    <div>
    <DateRangePicker
  onChange={item => setState([item.selection])}
  showSelectionPreview={true}
  moveRangeOnFirstSelection={false}
  months={2}
  ranges={state}
  direction="horizontal"
/>;
    </div>
  </Popup>

  */


/*
//class MyComponent extends React.Component {
export default () => (
  
     
        <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
      />

      
//}
)
*/
/*
 <Popup trigger={<button> Trigger</button>} position="left center">
        <div>
                </div>
      </Popup>
        */


/*
<DateRangePicker
        ranges={[selectionRange]}
        onChange={this.handleSelect}
      />
      */









/*
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import "./DiscreteSlider.css"
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


function valuetext(value) {
  return `${value}°C`;
}

function handleChange(value){
  console.log(value)
}

function ValueLabelComponent(props) {
  const { children, open, value } = props;
  
  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const AirbnbSlider = withStyles({
  root: {
    color: '#3a8589',
    height: 3,
    padding: '13px 0',
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: '#fff',
    border: '1px solid currentColor',
    marginTop: -12,
    marginLeft: -13,
    boxShadow: '#ebebeb 0 2px 2px',
    '&:focus, &:hover, &$active': {
      boxShadow: '#ccc 0 2px 3px 1px',
    },
    '& .bar': {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  active: {},
  track: {
    height: 3,
  },
  rail: {
    color: '#d8d8d8',
    opacity: 1,
    height: 3,
  },
})(Slider);

function AirbnbThumbComponent(props) {
  return (
    <span {...props}>
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </span>
  );
}

export default function DiscreteSlider() {
  const classes = useStyles();
/*
  return (
    <div className={classes.root}>
      <Typography id="discrete-slider" gutterBottom>
        Monate
      </Typography>
      <Slider
        defaultValue={1}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={12}
      />
    </div>
  );
  */
 /*
  return(
    <AirbnbSlider
        ThumbComponent={AirbnbThumbComponent}
        getAriaLabel={(index) => (index === 0 ? 'Minimum price' : 'Maximum price')}
        defaultValue={[20, 40]}
        onChange={handleChange}
        ValueLabelComponent={ValueLabelComponent}
        min={1}
        step={1}
        max={365}
      />
  )
}

*/

//export default  MyComponent