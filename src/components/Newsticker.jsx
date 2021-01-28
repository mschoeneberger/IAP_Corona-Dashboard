import React from 'react';
import "./Newsticker.css"

var titles = ["a","b","c"];
var articleLinks = ["","",""];

const Newsticker = (props) => {
    const GerRSS_URL = "https://www.tagesschau.de/xml/rss2/";
    const GerNewsURL = "https://www.tagesschau.de/thema/corona/";
    const EngRSS_URL = "https://cors-anywhere.herokuapp.com/https://www.politico.eu/feed/";
    const EngNewsURL = "https://www.politico.eu";
    var actRSS_URL;
    var linkText;
    var source;

    if(props.activeLanguage === "Deutsch"){
        actRSS_URL = GerRSS_URL;
        linkText = "[Mehr]";
        source = <li><p>Mehr News zu Corona gibt es hier: <a href={GerNewsURL} target="blank">tagesschau.de</a></p></li>
    }
    else{
        actRSS_URL = EngRSS_URL;
        linkText = "[More]";
        source = <li><p>For more Corona news go here: <a href={EngNewsURL} target="blank">politico.eu</a></p></li>
    }
    fetch(actRSS_URL)
            .then(response => response.text())
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {
                const items = data.querySelectorAll("item");
                var counter = 0;
                items.forEach(item => {
                    if (counter === 3){
                        return;
                    }
                    if(item.innerHTML.toLowerCase().includes("corona") || item.innerHTML.toLowerCase().includes("covid") || item.innerHTML.toLowerCase().includes("lockdown")){
                        const date = new Date(item.querySelector("pubDate").innerHTML);
                        titles[counter] = date.toLocaleString() + " - " + item.querySelector("title").innerHTML;
                        articleLinks[counter] = item.querySelector("link").innerHTML;
                        counter+=1;
                    }
                })
            })
    return (
        <div className="Newsticker">
            <ul>
                <li><p>{titles[0]} <a href={articleLinks[0]} target="blank">{linkText}</a></p></li>
                <li><p>{titles[1]} <a href={articleLinks[1]} target="blank">{linkText}</a></p></li>
                <li><p>{titles[2]} <a href={articleLinks[2]} target="blank">{linkText}</a></p></li>
                {source}
            </ul>
        </div>);
}
 
export default Newsticker;