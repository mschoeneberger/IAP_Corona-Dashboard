import React, {useState} from 'react';
import styled from 'styled-components';

const langs = ["Deutsch", "English"];

const Tab = styled.button`
  padding: calc(min(1vh,1vw));
  height: 10vh;
  width: 50%;
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

function NewstickerLanguage() {
  const [active, setActive] = useState(langs[0])
    return (
      <div style={{height:"10vh", width:"30vw"}}>
        {
          langs.map(lang=>
              <Tab
                key={lang}
                active={active === lang}
                onClick={() => setActive(lang)}>
                {lang}
              </Tab>
            )
        }
      </div>
    );
  }

  export default NewstickerLanguage;