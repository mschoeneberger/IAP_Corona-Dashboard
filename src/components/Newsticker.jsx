import React, {useState, useEffect} from 'react';
import "./Newsticker.css";
import LoadNewsTask from "../tasks/LoadNewsTask";

const Newsticker = (props) => {
    const sourceURLs = ["https://www.tagesschau.de/thema/corona/", "https://www.politico.eu/coronavirus-in-europe/"];
    const sourceListItems = [
        <li><p>Mehr News zu Corona gibt es hier: <a href={sourceURLs[0]} target="blank">tagesschau.de</a></p></li>,
        <li><p>For more Corona news go here: <a href={sourceURLs[1]} target="blank">politico.eu</a></p></li>
    ];

    var [news, setNews] = useState([]);
    const loadNews = () => {
        const loadNewsTask = new LoadNewsTask();
        loadNewsTask.load(setNews);
    };

    useEffect(loadNews, []);

    if(news.length === 0){
        return <div className="Newsticker"/>;
    }

    if(props.activeLanguage === "English"){
        if(news[1].titles[0] === undefined){
            return(
                <div className="Newsticker">
            <ul>
                <li><p>News could not be loaded.</p></li>
                <li><p>This is most likely due to a CORS-Error.</p></li>
                <li><p>Nothing to be worried about.</p></li>
                {sourceListItems[1]}
            </ul>
        </div>
        )}
        return (
            <div className="Newsticker">
            <ul>
                <li><p>{news[1].titles[0]} <a href={news[1].articleLinks[0]} target="blank">{news[1].linkText}</a></p></li>
                <li><p>{news[1].titles[1]} <a href={news[1].articleLinks[1]} target="blank">{news[1].linkText}</a></p></li>
                <li><p>{news[1].titles[2]} <a href={news[1].articleLinks[2]} target="blank">{news[1].linkText}</a></p></li>
                {sourceListItems[1]}
            </ul>
        </div>
        )
    }

    else{
        if(news[0].titles[0] === undefined){
            return(
            <div className="Newsticker">
            <ul>
                <li><p>Nachrichten konnten nicht geladen werden</p></li>
                <li><p>Es handelt sich vermutlich um einen CORS-Fehler.</p></li>
                <li><p>Das ist nicht weiter schlimm...</p></li>
                {sourceListItems[0]}
            </ul>
        </div>
        )}
        return (
            <div className="Newsticker">
            <ul>
                <li><p>{news[0].titles[0]} <a href={news[0].articleLinks[0]} target="blank">{news[0].linkText}</a></p></li>
                <li><p>{news[0].titles[1]} <a href={news[0].articleLinks[1]} target="blank">{news[0].linkText}</a></p></li>
                <li><p>{news[0].titles[2]} <a href={news[0].articleLinks[2]} target="blank">{news[0].linkText}</a></p></li>
                {sourceListItems[0]}
            </ul>
        </div>
        )
    }
}

export default Newsticker;