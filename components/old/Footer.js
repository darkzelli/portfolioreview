import styles from '../../css/footer.module.css'

import Link from 'next/link';

import CopyrightIcon from '@mui/icons-material/Copyright';


export default function Footer() {
    return (
        <span className={styles.footerContainer}>
            <span className={styles.copy}><CopyrightIcon fontSize='inherit'/>PortfolioReview.me All rights reserved.</span>
            <span className={styles.links}>
                <ul>
                    <li><Link href="https://insigh.to/b/portfolio-review">Feedback</Link></li>
                    <li><Link href="/tos">TOS</Link></li>
                    <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                    <li><Link href="/dashboard">Support</Link></li>
                </ul>
            </span>
        </span>
    );

 }