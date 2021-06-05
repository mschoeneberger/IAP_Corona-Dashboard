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
                <li><p>Corona-Data WHO: <a href="https://github.com/mahabub81/covid-19-api" target="blank">https://github.com/mahabub81/covid-19-api</a></p></li>
                <li><p>Corona-Data Denmark: <a href="https://files.ssi.dk/covid19/overvagning/data/data-epidemiologisk-rapport-02032021-2bak" target="blank">https://files.ssi.dk/covid19/overvagning/data/data-epidemiologisk-rapport-02032021-2bak</a></p></li>
                <li><p>Corona-Data Netherlands: <a href="https://github.com/J535D165/CoronaWatchNL" target="blank">https://github.com/J535D165/CoronaWatchNL</a></p></li>
                <li><p>Corona-Data Belgium: <a href="https://github.com/openZH/covid_19" target="blank">https://github.com/openZH/covid_19</a></p></li>
                <li><p>Corona-Data France: <a href="https://www.data.gouv.fr/fr/datasets/r/406c6a23-e283-4300-9484-54e78c8ae675" target="blank">https://www.data.gouv.fr/fr/datasets/r/406c6a23-e283-4300-9484-54e78c8ae675</a></p></li>
                <li><p>Corona-Data Switzerland: <a href="https://github.com/openZH/covid_19" target="blank">https://github.com/openZH/covid_19</a></p></li>
                <li><p>Corona-Data Austria: <a href="https://covid19-dashboard.ages.at" target="blank">https://covid19-dashboard.ages.at</a></p></li>
                <li><p>Corona-Data Germany: <a href="https://opendata.arcgis.com/datasets/dd4580c810204019a7b8eb3e0b329dd6_0.geojson" target="blank">https://opendata.arcgis.com/datasets/dd4580c810204019a7b8eb3e0b329dd6_0.geojson</a></p></li>
                <li><p>ICU-Data Germany : <a href="https://diviexchange.blob.core.windows.net/%24web/bundesland-zeitreihe.csv" target="blank">https://diviexchange.blob.core.windows.net/%24web/bundesland-zeitreihe.csv</a></p></li>
                <li><p>Vaccination-Data Germany: <a href="https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Daten/Impfquotenmonitoring.xlsx?__blob=publicationFile" target="blank">https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Daten/Impfquotenmonitoring.xlsx?__blob=publicationFile</a></p></li>
            </ul>
            ,
            "Deutsch" : <ul>
                <li><p>Corona-Daten WHO: <a href="https://github.com/mahabub81/covid-19-api" target="blank">https://github.com/mahabub81/covid-19-api</a></p></li>
                <li><p>Corona-Daten Dänemark: <a href="https://files.ssi.dk/covid19/overvagning/data/data-epidemiologisk-rapport-02032021-2bak" target="blank">https://files.ssi.dk/covid19/overvagning/data/data-epidemiologisk-rapport-02032021-2bak</a></p></li>
                <li><p>Corona-Daten Niederlande: <a href="https://github.com/J535D165/CoronaWatchNL" target="blank">https://github.com/J535D165/CoronaWatchNL</a></p></li>
                <li><p>Corona-Daten Belgien: <a href="https://github.com/openZH/covid_19" target="blank">https://github.com/openZH/covid_19</a></p></li>
                <li><p>Corona-Daten Frankreich: <a href="https://www.data.gouv.fr/fr/datasets/r/406c6a23-e283-4300-9484-54e78c8ae675" target="blank">https://www.data.gouv.fr/fr/datasets/r/406c6a23-e283-4300-9484-54e78c8ae675</a></p></li>
                <li><p>Corona-Daten Schweiz: <a href="https://github.com/openZH/covid_19" target="blank">https://github.com/openZH/covid_19</a></p></li>
                <li><p>Corona-Daten Österreich: <a href="https://covid19-dashboard.ages.at" target="blank">https://covid19-dashboard.ages.at</a></p></li>
                <li><p>Corona-Daten Deutschland: <a href="https://opendata.arcgis.com/datasets/dd4580c810204019a7b8eb3e0b329dd6_0.geojson" target="blank">https://opendata.arcgis.com/datasets/dd4580c810204019a7b8eb3e0b329dd6_0.geojson</a></p></li>
                <li><p>ITS-Daten Deutschland: <a href="https://diviexchange.blob.core.windows.net/%24web/bundesland-zeitreihe.csv" target="blank">https://diviexchange.blob.core.windows.net/%24web/bundesland-zeitreihe.csv</a></p></li>
                <li><p>Impfdaten-Daten Deutschland: <a href="https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Daten/Impfquotenmonitoring.xlsx?__blob=publicationFile" target="blank">https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Daten/Impfquotenmonitoring.xlsx?__blob=publicationFile</a></p></li>
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