"use client"
import Header from "@/components/old/Header";
import Tos from "@/components/old/Tos";

import styles from './tos-page.module.css'

export default function TOS(){
    return(
        <span className={styles.tos_page_container}>
            <Header/>
            <Tos/>
        </span>
    );
}