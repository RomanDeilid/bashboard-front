import React, { useState } from "react";

import styles from "./Login.module.css"
import {Navigate} from "react-router-dom";
import {In} from "../../store/actions/sign";

const Login = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    return (

        sessionStorage.getItem("authorization")!=null
        ?
            <Navigate to="/"  />
            :
            <div className={styles.wrapper}>
                <div className={styles.singArea}>
                    <div className={styles.header}> Authorization</div>
                <input

                    type = "text"
                    placeholder={"Email"}
                    value = { email }
                    onChange = { ( event ) => { setEmail( event.target.value ) }}

                />

                <input

                    type = "password"
                    placeholder={"Password"}
                    value = { password }
                    onChange = { ( event ) => { setPassword( event.target.value ) }}

                />
                    <div className={styles.navButton}>
                <button onClick = { () => In( email, password ) } >

                   Log in

                </button>

                <button>

                    Register

                </button>
                    </div>
                </div>
            </div>



    );

}

export default Login;