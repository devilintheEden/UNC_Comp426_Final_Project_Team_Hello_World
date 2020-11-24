// import { render } from '@testing-library/react';
import React from 'react';
import styles from './Font_page.module.css';

function Font_page() {
  let userData=[{
    "sample_image": "a path to a file",
    "Font_name": "font name",
    "Font_author": "font author",
    "Font_tags": ["tag1", "tag2", "..."],
    "Font_license": "font license (determine whether users can download this file) ",
    "Font_info": "font info (date published + additional info if users add them)"
}];
  return (
    <div className={styles.fontPage}>
      <div className={styles.fontContainer}>
        {userData.map((data,key) => {
          return (
            <div key = {key}>
              <div className={styles.top}>
                <h2 className={styles.fontName}>{data.Font_name}</h2>
                <button className={styles.favoriteButton} type="button">Favorite</button>
                <button className={styles.downloadButton} type="button">Download</button>
              </div>

              <div className={styles.mid}>
                <p className={styles.fontInfo}>{data.Font_info}</p>
                <p className={styles.fontType}>Type: {data.Font_type}</p>
                <p className="downloads"> Downloads: {data.Downloads}</p>
              </div>
              
              <div className={styles.bottom}>
                <input type="text" class = {styles.textbox} placeholder="type here to try font"/>
                <div className="b">
                  <h4 className={styles.fontTags}>Tags: {data.Font_tags}</h4>      
                  <h4 className={styles.fontAuthor}>Creator: {data.Font_author}</h4>
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