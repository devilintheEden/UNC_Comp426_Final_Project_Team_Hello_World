// import { render } from '@testing-library/react';
import React from 'react';
import './Font_page.css';
import {userData} from "./data";

function Font_page() {
  return (
    <div className="Font-page">
      <div className="font-container">
        {userData.map((data,key) => {
          return (
            <div key = {key}>
              <div className="top">
                <h2 className="font-name">{data.Font_name}</h2>
                <button className="favorite-button" type="button">Favorite</button>
                <button className="download-button" type="button">Download</button>
              </div>

              <div className="mid">
                <p className="font-info">{data.Font_info}</p>
                <p className="font-type">Type: {data.Font_type}</p>
                <p className="downloads"> Downloads: {data.Downloads}</p>
              </div>
              
              <div className="bottom">
                <input type="text" class = "textbox" placeholder="type here to try font"/>
                <div className="b">
                  <h4 className="font-tags">Tags: {data.Font_tags}</h4>      
                  <h4 className="font-author">Creator: {data.Font_author}</h4>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Font_page;