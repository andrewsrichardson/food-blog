import React from "react";
import {Link} from "gatsby"
import "./Menu.css"

function Menu(props){

    const ListLink = props => (
        <li className="list-link">
          <Link to={props.to}>{props.children}</Link>
        </li>
    )
    let vis = {visibility: `hidden`}
    let trans = {transform: `scale(0)`, transition:`all 0.4s ease`}
    let opacity = {opacity: `0`, transition: `opacity 0.4s ease`}

    if (props.isOpen){
        vis = {visibility: `visible`}
        trans = {transform: `scale(1)`, transition:`all 0.4s ease`}
        opacity = {opacity: `1`, transition: `opacity 0.4s ease`}
    }

    return(
    <div className="menu-wrap">    
        <div className="menu" style={vis}>
            <div style={trans}>
                <div style={opacity}>
                    <ul>
                        <ListLink to="/categories">Categories</ListLink>
                        <ListLink to="/about">About</ListLink>
                        <ListLink to="/Contact">Contact</ListLink>
                    </ul>
                </div>
            </div>
        </div>
    </div>        
    )
}

export default Menu