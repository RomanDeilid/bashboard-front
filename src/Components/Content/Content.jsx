import React, {useState} from 'react';
import {Navigate, Outlet} from "react-router-dom";
import Header from "../Header/Header";
import SetMenu from "../SetMenu/SetMenu";
import Sidebar from "../Sidebar/Sidebar";
import NotificationContainer from "react-notifications/lib/NotificationContainer";
import styles from "../SetMenu/SetMenu.module.css";


function Content(props) {
    // const  item=[{value:"1",href:"1asdas1",icon:"ads"},{value:"2",href:"2asdas2",icon:"ads"}]
    const [menuActive,setMenuActive]=useState(false)
    const [active,setActive]=useState(false)



     // console.log(sessionStorage.getItem("authorization"))
    if (sessionStorage.getItem("authorization")==null){
        return <Navigate to="/login"/>
    }

    return (<div>
        <Header active={active} setActive={setActive} setMenuActive={setMenuActive} menuActive={menuActive}></Header>
           <Outlet/>

         <SetMenu active={active} setActive={setActive}/>
        <Sidebar  active={menuActive} setActive={setMenuActive}/>
            {/*item={item}}*/}

    </div>
    );
}

export default Content;

