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
            "Deutsch" : 
            <p> Wir sind Maximilian (Informatik), Larry (Computerlinguistik) und Tassia (Informatik) von der Universität Heidelberg. Im Rahmen des Anfängerpraktikums für Bachelorstudenten entstand bei uns dieses Corona-Dashboard während der COVID-19-Pandemie.
            <br></br>
            <br></br>
            <b>Ziel:</b> Unser Ziel ist es, im Vergleich zu anderen Corona-Dashboards, in <i>einer</i> Anwendung möglichst viele Daten so präzise wie möglich darzustellen. Gleichzeitig wollen wir Informationen übersichtlich und in angemessener Ladezeit präsentieren.
            Da die verschiedenen Institutionen (Regionen, Staaten) ihre Daten sehr unterschiedlich zugänglich machen und formatieren, beschränken wir uns auf die geographisch nahe Umgebung von Heidelberg bzw. Deutschland. So haben wir für die meisten an Deutschland angrenzenden Länder verschiedene Corona-Charakteristiken der einzelnen Länder-Gliederungen aufgeschlüsselt: Frankreich, Schweiz, Österreich, 
            <br></br>
Die Graphen bieten die Möglichkeit zum Vergleich verschiedener Länder.
            <br></br>
            <br></br>
            <b>Werkzeuge:</b> 
            <br></br>
            React.js
            <br></br>
            Leaflet (interaktive Karte)
            <br></br>
            Chart.js (Graphen)
            </p>
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
