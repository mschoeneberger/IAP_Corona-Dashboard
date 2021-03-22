import styled from 'styled-components';
import {FaArrowLeft} from "react-icons/fa";
import "./InfoWindow.css";

const Button = styled.button`
  padding: calc(min(0.8vh,0.8vw));
  height: 100%;
  flex-basis: 10%;
  flex-grow: 1;
  cursor: pointer;
  opacity: 1;
  background: black;
  color: white;
  outline: 0;
  border: 0px;
`;

const InfoWindow = (props) => {
    var head;
    var body;
    if(props.infoWindow === "hidden"){
        return <></>
    } 
    else if(props.infoWindow === "sources"){
        head={"English": "Sources", "Deutsch": "Quellen"};
        body={
            "English" : <ul>
                <li><p>Example source 1: <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="blank">www.source.asdf</a></p></li>
            </ul>
            ,
            "Deutsch" : <ul>
                <li><p>Quellbeispiel 1: <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="blank">www.source.asdf</a></p></li>
            </ul>
        }
    }
    else{
        head={"English": "About Us", "Deutsch": "Über Uns"};
        body={
            "English" : <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   

Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat</p>
            ,
            "Deutsch" : <p>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi.   

Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.   

Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis.   

At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur</p>
        }
    }
    return (<div>
            <div className="top">
                <Button onClick={()=>props.setInfoWindow("hidden")}>
                    <FaArrowLeft style={{verticalAlign:"middle"}}/>
                </Button>
                <h1 style={{flexBasis:"80%", flexGrowth:"1"}}>{head[props.activeLanguage]}</h1>
            </div>
            {body[props.activeLanguage]}
        </div>
      );
}
 
export default InfoWindow;