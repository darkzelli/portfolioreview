import styles from './reward.module.css'

import Image from "next/image";
import Link from 'next/link';

import logo from "/review_logo_black.png" 

export default function Reward() {
    return (
        <span className={styles.reward}>
            <span className={styles.image}><Link href="/"><Image src={logo} width={150} height={150} alt="logo.png"/></Link></span>
            <span className={styles.maintext}>Reward</span>
            <span className={styles.undertext}>For reading the TOS you may be eligible for a reward. To claim the reward please enter your email and click the claim button below.</span>
            <span className={styles.inputareaContainer}><input type='email' name='email' placeholder='Email Address' className={styles.input}/></span>
            <span className={styles.card}>Claim</span>
        </span>
    );

 }