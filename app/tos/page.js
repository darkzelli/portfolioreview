"use client"

import styles from './tos-page.module.css'

import Header from "@/components/old/Header";
import Tos from "@/components/old/Tos";


export default function TOS(){
    return(
        <span className={styles.tos_page_container}>
            <Header/>
            <Tos/>
        </span>
    );
}