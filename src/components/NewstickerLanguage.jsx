import React from 'react';
import styled from 'styled-components';

const languages = ["Deutsch", "English"];

const Tab = styled.button`
  padding: calc(min(1vh,1vw));
  height: 100%;
  flex-grow: 1;
  cursor: pointer;
  opacity: 0.6;
  background: black;
  color: white;
  outline: 0;
  border: 1px solid #222222;
  border-top: 2px solid #222222;
  font-size: calc(min(2vh,2vw));
  ${({ active }) =>
    active &&
    `
      border-top: 2px solid blue;
      opacity: 1;
    `}
`;

function NewstickerLanguage(props) {
    return (
      <div style={{height: "10vh", flexGrow: "0", width:"100%", display:"flex", flexDirection:"row", overflow:"hidden"}}>
        {
          languages.map(lang=>
              <Tab
                key={lang}
                active={props.activeLanguage === lang}
                onClick={() => props.setActiveLanguage(lang)}>
                {lang === "Deutsch" ? (
                  <img src="https://www.countryflags.io/DE/flat/64.png" alt="Deutsch" width="70%" height="70%"/>
                ) : (
                  <img src="https://www.countryflags.io/GB/flat/64.png" alt ="English" width="70%" height="70%"/>
                )} 
              </Tab>
          )
        }
      </div>
    );
  }

  export default NewstickerLanguage;