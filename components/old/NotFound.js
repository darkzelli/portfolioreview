import styles from '../../css/notfound..module.css'

export default function NotFound() {
    return (
        <span className={styles.notfound404}>
            404
            <h1 className={styles.notfound}>Oops! You're looking for something that doesn't exist</h1>
        </span>
    );

 }