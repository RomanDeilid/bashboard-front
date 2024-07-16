import styles from "./Workspace.module.css"
import {Sticker} from "../Sticker/Sticker";
import Button from "../Button/Button";
import Windows from "../Windows/Windows";
export default function Workspace({description="poka tyt pyswqeqweqweqweqwewqeqweqweqweqweqeqweqweqto"}) {
    return (
        <div className={styles.space}>

            <div className={styles.todo}>
                <p className={styles.text}>ToDO</p>
            <Sticker/>

            </div>
            <div className={styles.todo}>
                <p className={styles.text}>Proces</p>
                <Sticker/>
                <Sticker/>
                <Sticker/>
                <Sticker/>

            </div>
            <div className={styles.todo}>
                <p className={styles.text}>done</p>
                <Sticker/>

            </div>
            <div className={styles.todo}>
                <p className={styles.text}>edit</p>
                <Sticker/>

            </div>
        <Button/>
        <Windows/>
        </div>
    );
}

