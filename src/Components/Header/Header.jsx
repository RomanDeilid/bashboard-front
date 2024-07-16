import sidebar from "./public/icons8-menu.svg"
import styles from "./Header.module.css";


function Header({companyName="R-NOX",sheetName="Front", name="Roma"}) {
    return (
        <div className={styles.header}>
                <img className={styles.sidebar} src={sidebar} alt="svg sidebar" onClick={()=>{
                    console.log("tЫk")}}/>
            <div className={styles.company}> {companyName}({sheetName})</div>
            <div className={styles.user} onClick={()=>{
                console.log("tЫk2")}}>{name[0]} </div>
        </div>
    );
}

export default Header;
