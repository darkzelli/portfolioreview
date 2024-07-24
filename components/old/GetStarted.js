import styles from '../../css/getstarted.module.css'

export default function GetStarted() {
    return (
        <span className={styles.getStartedContainer}>
            <span className={styles.maintext}>Get Started</span>
            <span className={styles.stepsContainer}>
                <span className={styles.step1}>
                    <span className={styles.nunber}>1</span>
                    <span className={styles.textCon}>
                        <span className={styles.maintextStep1}>Begin your journey by simply logging into your account. No sign-up required</span>
                        <span className={styles.undertextStep1}>Where you can explore all the incredible features and benefits we have to offer. Experience the full potential of our platform with a one time payment.</span>
                    </span>
                    
                </span>
                <span className={styles.step2}>
                    <span className={styles.nunber1}>2</span>
                    <span className={styles.textCon}>
                        <span className={styles.maintextStep2}>Simply link your portfolio in the dashboard by copying and pasting your portfolio URL. </span>
                        <span className={styles.undertextStep2}>No uploading is needed, and it takes just one second to showcase your work.</span>
                    </span>
                </span>
                <span className={styles.step3}>
                    <span className={styles.nunber2}>3</span>
                    <span className={styles.textCon}>
                        <span className={styles.maintextStep3}>Customize your profile and set it to public to start receiving feedback instantly.</span>
                        <span className={styles.undertextStep3}>Allow peers to view your work and provide valuable criticism that can help you grow and improve.</span>
                    </span>
                </span>
            </span>
        </span>
    );

 }