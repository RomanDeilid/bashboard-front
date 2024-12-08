import sidebar from "../public/icons8-menu.svg"
import styles from "./Header.module.css";



function Header({active,setActive, menuActive, setMenuActive} ) {

    return (
        <div className={styles.header}>

                <img className={styles.sidebar} src={sidebar} alt="svg sidebar" onClick={()=>{
                   setMenuActive(!menuActive)}}/>
            <div className={styles.company}> {localStorage.getItem("company_name").toUpperCase()}</div>

            <div className={styles.user} onClick={()=>{
                setActive(!active) }}>{localStorage.getItem("user_name")[0].toUpperCase() } </div>


        </div>

    );
}

export default Header;
