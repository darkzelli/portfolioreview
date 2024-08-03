import styles from '../../css/showcase.module.css'

import Image from 'next/image';
import Link from 'next/link';

import portfolio1 from '../../images/1.jpg'
import portfolio2 from '../../images/2.jpg'
import portfolio3 from '../../images/3.jpg'
import portfolio4 from '../../images/4.jpg'
import portfolio5 from '../../images/5.jpg'
import portfolio6 from '../../images/6.jpg'
import portfolio7 from '../../images/7.jpg'
import portfolio8 from '../../images/8.jpg'
import portfolio9 from '../../images/9.jpg'
import portfolio10 from '../../images/10.jpg'
import portfolio11 from '../../images/11.jpg'
import portfolio12 from '../../images/12.jpg'
import portfolio13 from '../../images/13.jpg'
import portfolio14 from '../../images/14.jpg'
import portfolio15 from '../../images/15.jpg'
import portfolio16 from '../../images/16.jpg'
import portfolio17 from '../../images/17.jpg'
import portfolio18 from '../../images/18.jpg'
import portfolio19 from '../../images/19.jpg'
import portfolio20 from '../../images/20.jpg'
import portfolio21 from '../../images/21.jpg'
import portfolio22 from '../../images/22.jpg'
import portfolio23 from '../../images/23.jpg'
import portfolio24 from '../../images/24.jpg'



export default function Showcase() {
    return (
        <span className={styles.showcase}>
            <span className={styles.maintext}>
                Featured Portfolios
            </span>
            <span className={styles.toprow}>
                <span className={styles.column1}>
                    <Link href="/dashboard"><Image  className={styles.image} alt='portfolio.png' src={portfolio1} width={384} height={216}/></Link>
                    <Link href="/dashboard"><Image  className={styles.image} alt='portfolio.png' src={portfolio2} width={384} height={216}/></Link>
                    <Link href="/dashboard"><Image  className={styles.image} alt='portfolio.png' src={portfolio3} width={384} height={216}/></Link>
                </span>
                <span className={styles.column2}>
                    <Link href="/dashboard"><Image  className={styles.image} alt='portfolio.png' src={portfolio4} width={384} height={216}/></Link>
                    <Link href="/dashboard"><Image  className={styles.image} alt='portfolio.png' src={portfolio5} width={384} height={216}/></Link>
                    <Link href="/dashboard"><Image  className={styles.image} alt='portfolio.png' src={portfolio6} width={384} height={216}/></Link>
                </span>
                <span className={styles.column3}>
                    <Link href="/dashboard"><Image className={styles.image} alt='portfolio.png' src={portfolio7} width={384} height={216}/></Link>
                    <Link href="/dashboard"><Image className={styles.image} alt='portfolio.png' src={portfolio8} width={384} height={216}/></Link>
                    <Link href="/dashboard"><Image className={styles.image} alt='portfolio.png' src={portfolio9} width={384} height={216}/></Link>
                </span>
                <span className={styles.column4}>
                    <Link href="/dashboard"><Image className={styles.image} alt='portfolio.png' src={portfolio10} width={384} height={216}/></Link>
                    <Link href="/dashboard"><Image className={styles.image} alt='portfolio.png' src={portfolio11} width={384} height={216}/></Link>
                    <Link href="/dashboard"><Image className={styles.image} alt='portfolio.png' src={portfolio12} width={384} height={216}/></Link>
                </span>
            </span>
            <span className={styles.bottomrow}>
                <span className={styles.column1}>
                    <Image className={styles.image} alt='portfolio.png' src={portfolio13} width={384} height={216}/>
                    <Image className={styles.image} alt='portfolio.png' src={portfolio14} width={384} height={216}/>
                    <Image className={styles.image} alt='portfolio.png' src={portfolio15} width={384} height={216}/>
                </span>
                <span className={styles.column2}>
                    <Image className={styles.image} alt='portfolio.png' src={portfolio16} width={384} height={216}/>
                    <Image className={styles.image} alt='portfolio.png' src={portfolio17} width={384} height={216}/>
                    <Image className={styles.image} alt='portfolio.png' src={portfolio18} width={384} height={216}/>
                </span>
                <span className={styles.column3}>
                    <Image className={styles.image} alt='portfolio.png' src={portfolio19} width={384} height={216}/>
                    <Image className={styles.image} alt='portfolio.png' src={portfolio20} width={384} height={216}/>
                    <Image className={styles.image} alt='portfolio.png' src={portfolio21} width={384} height={216}/>
                </span>
                <span className={styles.column4}>
                    <Image className={styles.image} alt='portfolio.png' src={portfolio22} width={384} height={216}/>
                    <Image className={styles.image} alt='portfolio.png' src={portfolio23} width={384} height={216}/>
                    <Image className={styles.image} alt='portfolio.png' src={portfolio24} width={384} height={216}/>
                </span>
                <span className={styles.blockedportfolios}>
                    <span className={styles.card}>
                        <span className={styles.cardMaintext}>Start for Free</span>
                        <span className={styles.cardUndertext}>Create an account to view the full gallery</span>
                        <span className={styles.cardButton}><Link href="/dashboard">Gallery</Link></span>
                    </span>
                </span>
            </span>
        </span>
    );

 }