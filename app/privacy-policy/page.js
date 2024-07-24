"use client"
import Header from "@/components/old/Header";
import PrivacyPolicy from "@/components/old/PrivacyPolicy";

import styles from './privacy-policy-page.module.css'

export default function PRIVACYPOLICY(){
    return(
        <span className={styles.privacy_page_container}>
            <Header/>
            <PrivacyPolicy/>
        </span>
    );
}