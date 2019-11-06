import React from "react";
import './ToggleMenuButton.css'



const ToggleMenuButton = props => (
    
    <button className="toggle-button" onClick={props.click}>
      <div className= "toggle-button_line"></div>
      <div className= "toggle-button_line"></div>
      <div className= "toggle-button_line"></div>
    </button>
    
);

export default ToggleMenuButton