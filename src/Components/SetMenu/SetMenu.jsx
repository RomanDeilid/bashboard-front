import React, { useRef} from 'react';
import styles from "./SetMenu.module.css"
import {useClickOutside} from "./useClickOutside";
import {Out} from "../../store/actions/exit";



function SetMenu({active,setActive}) {
    const ref = useRef(null);

    useClickOutside(ref,()=>{if(active){
        setTimeout(()=>setActive(false),50);
    }})

    return (
        <div   ref={ref} className={`${styles.wrapper} ${active?styles.wrapperActive:""}`}>
        <div className={styles.headerMenu}  >

            <div className={styles.user} onClick={()=>{
                setActive(false) }}>{localStorage.getItem("user_name")[0].toUpperCase()}
            </div>
            <div className={styles.name}>{localStorage.getItem("user_name")} </div>
        </div>

            <div className={styles.body}>
            <ul>
                <li>Settings</li>
                <li>About</li>
                <li onClick={() => Out()} > Exit</li>

            </ul>
        </div>
        </div>
    );
}

export default SetMenu;