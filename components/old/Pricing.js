import styles from '../../css/pricing.module.css'

import Link from 'next/link';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import RedeemIcon from '@mui/icons-material/Redeem';

export default function Pricing() {
    return (
        <span className={styles.pricingContainer}>
            <span className={styles.maintext}>PRiCiNG</span>
            <span className={styles.undertext}>Start improving your portfolio quickly</span>
            <span className={styles.undertext2}><span className={styles.percentOff}><RedeemIcon fontSize='inherit'/> $2 off</span> for the first 100 customers</span>
            <span className={styles.options}>
                <span className={styles.Pricingtab}>
                    <span className={styles.maintext}>Start for Free</span>
                    <span className={styles.priceInfo}>
                        <span className={styles.ogPrice}>$10</span>
                        <span className={styles.price}>FREE</span>
                    </span>
                    <span className={styles.features}>
                        <span className={styles.feature}><CloseIcon/>Upload a Portfolio</span>
                        <span className={styles.feature} ><CheckIcon/>View portfolios</span>
                    </span>
                    <Link href="/dashboard" className={styles.button}>Start Free</Link>
                </span>
                <span className={styles.Pricingtab}>
                    <span className={styles.maintext}>Become a member</span>
                    <span className={styles.priceInfo}>
                        <span className={styles.ogPrice}>$25</span>
                        <span className={styles.price}>$10</span>
                    </span>
                    <span className={styles.features}>
                        <span className={styles.feature}><CheckIcon/>Upload a Portfolio</span>
                        <span className={styles.feature} ><CheckIcon/>View portfolios</span>
                    </span>
                    <Link href="/dashboard" className={styles.button}>One Time Payment</Link>
                </span>
            </span>
        </span>
    );

 }