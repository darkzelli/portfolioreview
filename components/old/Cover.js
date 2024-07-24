import styles from '../../css/cover.module.css'
import Particles from '../magicui/particles';

import Link from 'next/link';




export default function Cover() {
    return (
        <span className={styles.coverContainer}>
            <span className={styles.maintext}>MAKE YOUR <span className={styles.box}>PORTFOLIO</span></span>
            <span className={styles.maintext2}>THE <span className={styles.box}>BEST</span> IT CAN BE</span>
            <span className={styles.undertext}>Get advice and constructive criticism on your portfolio or</span>
            <span className={styles.undertext2}> provide feedback on others.</span>
            <span className={styles.blurryDot}></span>
            <span className={styles.button}><Link href="/login">Join Now</Link></span>
            
            <span><Particles className={styles.particles}  size={.2}/></span>
        </span>
    );

 }