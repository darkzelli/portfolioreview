"use client"
import styles from '../../css/notfound..module.css'

export default function Test() {
    function tester(){
        fetch(process.env.NEXT_PUBLIC_URL + "api/get-user-data", {
            method: "GET",
            cache: 'force-cache',
        }).then((res) => res.json().then((data) => console.log(data))).catch((err) => console.log(err))
    }
    return (
        <span className={styles.test}>
            <button onClick={() => tester()}>fetch</button>
        </span>
    );

 }