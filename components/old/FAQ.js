"use client"
import styles from '../../css/faq.module.css'



export default function FAQ() {
    return (
        <span className={styles.faqContainer}>
            <h1 className={styles.maintext}>Frequently Asked Questions</h1>
            <span className={styles.question1}>
                Why use Portfolio Review?
            </span>
            <span className={styles.info}>
                Tired of wondering if your portfolio is up to par? Still sending your portfolio to tech youtubers? Well, with portfolio review you don't have to any more. Get the criticism and suggestions you need to get the job you want. 
            </span>
            <span className={styles.question2}>
                Can I become a member for free?
            </span>
            <span className={styles.info}>
                Yes. There are two ways to become a member for free. The first option is to click "Start Free" under the pricing section. The second option is to verify yourself as industry professional or recruiter. More information about this can be found in the recruiter tab in your dashboard.
            </span>
            <span className={styles.question3}>
                How do I upload my portfolio?
            </span>
            <span className={styles.info}>
                Simply take your portfolio website url and enter it into your dashboard
            </span>
            <span className={styles.question4}>
                What are Critique Credits?
            </span>
            <span className={styles.info1}>
               Critique credits are credits used to critique, suggest or comment on a portfolio
            </span>
        </span>
    );

 }