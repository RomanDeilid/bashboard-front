import styles from "./Sticker.module.css"
export function Sticker({description="poka tyt pyswqeqweqweqweqwewqeqweqweqweqweqeqweqweqto",taskName="Test",createData="01.01.2023",updateDate="02.03.2024"}) {
    return (
        <div className={styles.space}>
                <div className={styles.headerTask}>
                    <div className={styles.taskName}> {taskName}</div>
                </div>
                <div className={styles.description}>
                    {description}
                </div>
                <div className={styles.dataInfo}>
                <div className={styles.dataUpdate}>Date Update: {updateDate}</div>
                <div className={styles.dataCreate}>Date Create: {createData}</div>
                </div>

        </div>
    );
};