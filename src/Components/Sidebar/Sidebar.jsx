import React from 'react';
import styles from "./Sidebar.module.css"
import cross from "./public/cross_1.svg"
import {NavLink} from "react-router-dom";


function Sidebar({active,setActive}) {

    return (
        <div className={`${styles.wrapper} ${active?styles.wrapperActive:""}`} onClick={()=>{setActive(!active) }}>
            <div className={styles.menu} onClick={(e)=>{e.stopPropagation()}}>
             <div className={styles.headerMenu}>
             <h1> "DashBoard"  </h1>
                 <img  className={styles.button} onClick={()=>{setActive(!active) }} src={cross} alt="cross"/>
             </div>
                <NavLink to="/task">
                Task
                </NavLink>
                <NavLink to="/sheet">
                   Sheet
                </NavLink>
                <NavLink to="/login">
                   Company
                </NavLink>
            </div>
        </div>
    );
}

export default Sidebar;