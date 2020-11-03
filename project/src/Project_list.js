import React from 'react';
import './Project_list.css';
import {userData} from "./data";

class Project_list extends React.Component{
  constructor(props){
    super(props);
  }
// function Project_list() {
  render(){
  return (
    <div className="project-list">
      <div className="font-container">
        {userData.map((data,key) => {
          return (
            <div key = {key}>
              {/* <img className="image">{data.sample_image}</img> */}
              <div className="project">
                <p className="image">{data.sample_image}</p>
                <div className="text">
                      <h3 className="font-name">{data.Font_name}</h3>
                      <p className="last-modified">Last edit: {data.last_modified}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div className="new-project">
          <svg width="0.7cm" height="0.7cm" viewBox="0 0 16 16" class="bi bi-plus-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
          </svg>
          <p className="create">Create a new project</p>
        </div>
      </div>
    </div>
  )
}
}
export default Project_list;