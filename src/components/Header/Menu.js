import React from "react";
import {Link} from "gatsby"
import "./Menu.css"

function Menu(props){

    const ListLink = props => (
        <li className="list-link">
          <Link to={props.to}>{props.children}</Link>
        </li>
    )


    let openMenu = 'menu'    

    if (props.isOpen){
        openMenu = 'menu open'
    }

    return(
    <div className="menu-wrap">    
        <div className={openMenu}>
                    <ul>
                        <ListLink to="/categories">Categories</ListLink>
                        <ListLink to="/about">About</ListLink>
                        <ListLink to="/Contact">Contact</ListLink>
                    </ul>
                </div>
     </div>        
    )
}

export default Menu