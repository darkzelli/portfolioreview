import styles from './login.module.css'

import Header from "@/components/old/Header";
import AuthPage from "@/components/old/Auth";

export default function Login() {
    return (
        <span className={styles.login}>
            <Header/>
            <AuthPage/>
        </span>
    );

 }