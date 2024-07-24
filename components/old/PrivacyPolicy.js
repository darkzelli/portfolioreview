import styles from '../../css/privacy-policy.module.css'

export default function PrivacyPolicy(){
    return(
        <span className={styles.ppContainer}>
            <span>Portfolio Review Privacy Policy</span>
            <span>Welcome to Portfolio Review's Privacy Policy!</span>
            <span className={styles.white}>
                This Privacy Policy describes how Portfolio Review ("we", "our", or "us") collects, uses, and shares information when you use our website located at portfolioreview.me (the "Website") and the services offered by Portfolio Review (collectively, the "Service").
            </span>
            <span>1. Information We Collect</span>
            <span className={styles.white}>
                We collect certain information when you use our Service, including:
            </span>
            <span className={styles.white}>
                Information you provide to us, such as when you create an account, submit user content, or contact us for support.
                Automatically collected information, such as your IP address, device information, and usage data when you access or use our Service.
                Cookies and similar technologies to collect information about your interactions with our Service.
            </span>
            <span>2. How We Use Your Information</span>
            <span className={styles.white}>
                We use the information we collect for various purposes, including:
            </span>
            <span className={styles.white}>
                Providing, maintaining, and improving our Service.
                Communicating with you, including responding to your inquiries and providing customer support.
                Personalizing your experience and delivering targeted advertising.
                Complying with legal obligations and enforcing our terms and policies.
            </span>
            <span>3. Information Sharing</span>
            <span className={styles.white}>
                We may share your information with third parties for various purposes such as:
            </span>
            <span className={styles.white}>
                Service providers who assist us in operating our Service or conducting our business.
                Third parties with whom you authorize us to share your information.
                Law enforcement or government agencies in response to legal requests or as necessary for legal compliance.
                Other parties in connection with a corporate transaction, such as a merger or acquisition.
            </span>
            <span>4. Your Choices</span>
            <span className={styles.white}>
                You have certain choices regarding the information we collect and how it's used, including:
            </span>
            <span className={styles.white}>
                Updating or correcting your information by accessing your account settings.
                Opting out of certain data collection and sharing by adjusting your browser settings or opting out of targeted advertising.
                Contacting us if you have any questions or concerns about your privacy.
            </span>
            <span>5. Data Security</span>
            <span className={styles.white}>
                We take reasonable measures to protect your information from unauthorized access, disclosure, alteration, or destruction.
            </span>
            <span>6. Changes to This Policy</span>
            <span className={styles.white}>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on the Website. You are advised to review this Privacy Policy periodically for any changes.
            </span>
            <span>7. Contact Us</span>
            <span className={styles.white}>
                If you have any questions about these Terms, please contact us at support@portfolioreview.me
            </span>
        </span>
    );
}