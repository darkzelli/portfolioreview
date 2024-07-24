import styles from '../../css/flyers.module.css'

export default function Flyers() {
    return (
        <span className={styles.container}>
            <div className={styles.ring}>s</div>
            <div className={styles.ring}></div>
            <div className={styles.ring}></div>
        </span>
    );

 }