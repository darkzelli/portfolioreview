"use client";
import { useState } from 'react';
import styles from './../css/waitlist.module.css'
import { Resend } from 'resend';
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_SECRET_KEY)
export default function Waitlist() {
  const [email, setEmail] = useState();
  const [result, setResult] = useState(null);
  const signup = () => {

  }
    return (
        <span className={styles.waitlist}>
          {
            result ? <>{result}</> : <><div className={styles.email}><input type='email' placeholder='example@gmail.com' onChange={(e) => setEmail(e.target.value)}/></div>
            <div className={styles.signup} onClick={signup}>Sign up</div></>
          }

        </span>
    );

 }
