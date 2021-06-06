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
            "English" : <div style={{display:"flex", flexDirection:"row"}}>
                <ul>
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
                <br/>
                <ul>
                    <li><p>Countries GeoJSON: <a href="https://datahub.io/core/geo-countries" target="blank">https://datahub.io/core/geo-countries</a></p></li>
                    <li><p>German Counties GeoJSON: <a href="http://opendatalab.de/projects/geojson-utilities/" target="blank">http://opendatalab.de/projects/geojson-utilities/</a></p></li>
                    <li><p>Austrian States GeoJSON: <a href="https://github.com/ginseng666/GeoJSON-TopoJSON-Austria" target="blank">https://github.com/ginseng666/GeoJSON-TopoJSON-Austria</a></p></li>
                    <li><p>French Departments GeoJSON: <a href="https://france-geojson.gregoiredavid.fr/" target="blank">https://france-geojson.gregoiredavid.fr/</a></p></li>
                    <li><p>Danish Municipalities GeoJSON: <a href="https://github.com/magnuslarsen/geoJSON-Danish-municipalities/blob/master/municipalities/municipalities.geojson" target="blank">https://github.com/magnuslarsen/geoJSON-Danish-municipalities/blob/master/municipalities/municipalities.geojson</a></p></li>
                    <li><p>Belgian Regions GeoJSON: <a href="https://data.europa.eu/data/datasets/a69112d0897cd6639e918d7e40176754030fc70d?locale=de" target="blank">https://data.europa.eu/data/datasets/a69112d0897cd6639e918d7e40176754030fc70d?locale=de</a></p></li>
                    <li><p>Swiss Cantons GeoJSON: <a href="https://www.swisstopo.admin.ch/de/home.html" target="blank">https://www.swisstopo.admin.ch/de/home.html</a></p></li>
                    <li><p>Netherlands Regions GeoJSON: <a href="https://www.webuildinternet.com/articles/2015-07-19-geojson-data-of-the-netherlands/provinces.geojson" target="blank">https://www.webuildinternet.com/articles/2015-07-19-geojson-data-of-the-netherlands/provinces.geojson</a></p></li>
                </ul>
                <br/>
                <ul>
                    <li><p>French Population by Departments: <a href="https://en.wikipedia.org/wiki/List_of_French_departments_by_population" target="blank">https://en.wikipedia.org/wiki/List_of_French_departments_by_population</a></p></li>
                    <li><p>Danish Population by Municipalities: <a href="https://en.wikipedia.org/wiki/List_of_municipalities_of_Denmark" target="blank">https://en.wikipedia.org/wiki/List_of_municipalities_of_Denmark</a></p></li>
                    <li><p>Population for different countries JSON: <a href="https://github.com/samayo/country-json/blob/master/src/country-by-population.json" target="blank">https://github.com/samayo/country-json/blob/master/src/country-by-population.json</a></p></li>
                    <li><p>Belgian Population by Regions: <a href="https://en.wikipedia.org/wiki/Provinces_of_Belgium" target="blank">https://en.wikipedia.org/wiki/Provinces_of_Belgium</a></p></li>
                    <li><p>Netherlands Population by Regions: <a href="https://en.wikipedia.org/wiki/Provinces_of_the_Netherlands" target="blank">https://en.wikipedia.org/wiki/Provinces_of_the_Netherlands</a></p></li>
                </ul>
            </div>
            ,
            "Deutsch" : <div style={{display:"flex", flexDirection:"row"}}>
                <ul>
                    <li><p>Coronadaten WHO: <a href="https://github.com/mahabub81/covid-19-api" target="blank">https://github.com/mahabub81/covid-19-api</a></p></li>
                    <li><p>Coronadaten Dänemark: <a href="https://files.ssi.dk/covid19/overvagning/data/data-epidemiologisk-rapport-02032021-2bak" target="blank">https://files.ssi.dk/covid19/overvagning/data/data-epidemiologisk-rapport-02032021-2bak</a></p></li>
                    <li><p>Coronadaten Niederlande: <a href="https://github.com/J535D165/CoronaWatchNL" target="blank">https://github.com/J535D165/CoronaWatchNL</a></p></li>
                    <li><p>Coronadaten Belgien: <a href="https://github.com/openZH/covid_19" target="blank">https://github.com/openZH/covid_19</a></p></li>
                    <li><p>Coronadaten Frankreich: <a href="https://www.data.gouv.fr/fr/datasets/r/406c6a23-e283-4300-9484-54e78c8ae675" target="blank">https://www.data.gouv.fr/fr/datasets/r/406c6a23-e283-4300-9484-54e78c8ae675</a></p></li>
                    <li><p>Coronadaten Schweiz: <a href="https://github.com/openZH/covid_19" target="blank">https://github.com/openZH/covid_19</a></p></li>
                    <li><p>Coronadaten Österreich: <a href="https://covid19-dashboard.ages.at" target="blank">https://covid19-dashboard.ages.at</a></p></li>
                    <li><p>Coronadaten Deutschland: <a href="https://opendata.arcgis.com/datasets/dd4580c810204019a7b8eb3e0b329dd6_0.geojson" target="blank">https://opendata.arcgis.com/datasets/dd4580c810204019a7b8eb3e0b329dd6_0.geojson</a></p></li>
                    <li><p>Intensivstationdaten Deutschland: <a href="https://diviexchange.blob.core.windows.net/%24web/bundesland-zeitreihe.csv" target="blank">https://diviexchange.blob.core.windows.net/%24web/bundesland-zeitreihe.csv</a></p></li>
                    <li><p>Impfdaten Deutschland: <a href="https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Daten/Impfquotenmonitoring.xlsx?__blob=publicationFile" target="blank">https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Daten/Impfquotenmonitoring.xlsx?__blob=publicationFile</a></p></li>
                </ul>
                <br/>
                <ul>
                    <li><p>Länder GeoJSON: <a href="https://datahub.io/core/geo-countries" target="blank">https://datahub.io/core/geo-countries</a></p></li>
                    <li><p>Deutsche Landkreise GeoJSON: <a href="http://opendatalab.de/projects/geojson-utilities/" target="blank">http://opendatalab.de/projects/geojson-utilities/</a></p></li>
                    <li><p>Österreichische Bundesländer GeoJSON: <a href="https://github.com/ginseng666/GeoJSON-TopoJSON-Austria" target="blank">https://github.com/ginseng666/GeoJSON-TopoJSON-Austria</a></p></li>
                    <li><p>Französische Departments GeoJSON: <a href="https://france-geojson.gregoiredavid.fr/" target="blank">https://france-geojson.gregoiredavid.fr/</a></p></li>
                    <li><p>Dänische Gemeinden GeoJSON: <a href="https://github.com/magnuslarsen/geoJSON-Danish-municipalities/blob/master/municipalities/municipalities.geojson" target="blank">https://github.com/magnuslarsen/geoJSON-Danish-municipalities/blob/master/municipalities/municipalities.geojson</a></p></li>
                    <li><p>Belgische Regionen GeoJSON: <a href="https://data.europa.eu/data/datasets/a69112d0897cd6639e918d7e40176754030fc70d?locale=de" target="blank">https://data.europa.eu/data/datasets/a69112d0897cd6639e918d7e40176754030fc70d?locale=de</a></p></li>
                    <li><p>Schweizer Kantone GeoJSON: <a href="https://www.swisstopo.admin.ch/de/home.html" target="blank">https://www.swisstopo.admin.ch/de/home.html</a></p></li>
                    <li><p>Niederländische Regionen GeoJSON: <a href="https://www.webuildinternet.com/articles/2015-07-19-geojson-data-of-the-netherlands/provinces.geojson" target="blank">https://www.webuildinternet.com/articles/2015-07-19-geojson-data-of-the-netherlands/provinces.geojson</a></p></li>
                </ul>
                <br/>
                <ul>
                    <li><p>Französische Bevölkerung nach Departments: <a href="https://en.wikipedia.org/wiki/List_of_French_departments_by_population" target="blank">https://en.wikipedia.org/wiki/List_of_French_departments_by_population</a></p></li>
                    <li><p>Dänische Bevölkerung nach Gemeinden: <a href="https://en.wikipedia.org/wiki/List_of_municipalities_of_Denmark" target="blank">https://en.wikipedia.org/wiki/List_of_municipalities_of_Denmark</a></p></li>
                    <li><p>Bevölkerung unterschiedlicher Länder JSON: <a href="https://github.com/samayo/country-json/blob/master/src/country-by-population.json" target="blank">https://github.com/samayo/country-json/blob/master/src/country-by-population.json</a></p></li>
                    <li><p>Belgische Bevölkerung nach Regionen: <a href="https://en.wikipedia.org/wiki/Provinces_of_Belgium" target="blank">https://en.wikipedia.org/wiki/Provinces_of_Belgium</a></p></li>
                    <li><p>Niederländische Bevölkerung nach Regionen: <a href="https://en.wikipedia.org/wiki/Provinces_of_the_Netherlands" target="blank">https://en.wikipedia.org/wiki/Provinces_of_the_Netherlands</a></p></li>
                </ul>
            </div>
        }
    }
    else{
        head={"English": "About Us", "Deutsch": "Über Uns"};
        body={
            "English" : <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   

Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat</p>
            ,
            "Deutsch" : <div>
                <p>Wir sind Maximilian (Informatik), Larry (Informatik) und Tassia (Informatik) von der Universität Heidelberg. Im Rahmen des Anfängerpraktikums für Bachelorstudent*innen entstand bei uns dieses Corona-Dashboard während der COVID-19-Pandemie.</p>
                <br/>
                <p>Unser Ziel war es, ein übersichtliches Dashboard zu kreieren, das sich intuitiv und einfach bedienen lässt, und zugleich möglichst viele relevante Informationen zu transportieren, grafisch darzustellen und leicht vergleichbar zu machen.</p>
                <p>Weiter wollten wir (wie bei manch anderes Dashboards üblich) uns bei der Darstellung nicht nur auf die deutschen Landkreise beschränken, sondern auch die Unterregionen der deutschen Nachbarn miteinbeziehen, da auch das Virus an den Grenzen nicht Halt macht.</p>
                <br/>
                <p>Unser Dashboard lässt sich grob in zwei Teile gliedern:</p>
                <ul>
                    <li>
                        <p>Der Kartenteil verschafft einen leicht verständlichen, aktuellen Überblick über die aktuelle Lage der Welt bzw. den einzelnen Regionen rund um Deutschland. Bei Klick auf ein Land bzw. eine Region werden zusätzliche, relevante Daten mittels Popup angezeigt.</p>
                        <p>Während man sich mit dem Newsticker auf dem Laufenden halten kann, lässt sich die Sprache der gesamten Seite zwischen Englisch und Deutsch umschalten mit einem Klick auf die entsprechende Landesflagge.</p>
                        <p>Unter der Karte ermöglichen die Tabs es, verschiedene Aspekte der Pandemie grafisch auf der Karte darzustellen. Eine Tooltipbox informiert über die Bedeutung der Aspekte.</p>
                        <p>Das Umschalten zwischen Weltansicht und Regionsansicht erfolgt über einen Button auf der oberen Leiste. Dort finden sich auch der Name unseres Dashboards, das Datum der letzten Aktualisierung, sowie ein Knopf für das Menü.</p>
                    </li>
                    <li>
                        <p>Der Graphenteil ermöglicht einen detaillierten Vergleich unterschiedlicher Coronadaten mehrerer Länder bzw. Regionen auch über einen (frei wählbaren) zeitlichen Verlauf.</p>
                        <p>Desweiteren werden hier auch die deutschen Impfstatistiken angezeigt.</p>
                    </li>
                </ul>
                <br/>
                <p>Verwendete Werkzeuge:</p>
                <ul>
                    <li><p>bootsrap</p></li>
                    <li><p>react</p></li>
                    <li><p>leaflet</p></li>
                    <li><p>chart.js</p></li>
                </ul>
            </div>
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