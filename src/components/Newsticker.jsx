import React, {useState, useEffect} from 'react';
import "./Newsticker.css";
import NewsItem from "../entities/NewsItem";

const Newsticker = (props) => {
    const sourceURLs = ["https://www.tagesschau.de/thema/corona/", "https://www.politico.eu/coronavirus-in-europe/"];
    const sourceListItems = [
        <li><p>Mehr News zu Corona gibt es hier: <a href={sourceURLs[0]} target="blank">tagesschau.de</a></p></li>,
        <li><p>For more Corona news go here: <a href={sourceURLs[1]} target="blank">politico.eu</a></p></li>
    ];

    var [news, setNews] = useState([]);

    useEffect(() => 
        async function fetchNews() {
            const rssURLs = ["https://www.tagesschau.de/xml/rss2/", "https://cors-anywhere.herokuapp.com/https://www.politico.eu/feed/"];
            const linkTexts = ["[Mehr]", "[More]"];
            for (let i = 0; i<rssURLs.length; i++){
                var titles = [];
                var articleLinks = [];
                await fetch(rssURLs[i])
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
                            titles.push(date.toLocaleString() + " - " + item.querySelector("title").innerHTML);
                            articleLinks.push(item.querySelector("link").innerHTML);
                            counter+=1;
                        }
                    })
                })
                news[i] = new NewsItem(linkTexts[i],titles,articleLinks);
            }
            setNews(news);
        });

    if(news.length === 0){
        return <div className="Newsticker"/>;
    }

    if(props.activeLanguage === "English"){
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