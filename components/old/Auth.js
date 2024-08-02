"use client";
import Link from 'next/link';
import styles from '../../css/auth.module.css'
import { useState, useRef, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";

import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

import { createClient } from "@/utils/supabase/client";

import { userContext } from "@/components/UseUser"



import logo from "/review_logo_black.png" 
import { revalidateUser, revalidateUserData } from '../revalidateTags';

export default function AuthPage(){
    
    const [login, setLogin] = useState(true);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState()
    const [supabase, setSupabase] = useState()
    const [message, setMessage] = useState(null)
    const {account, accountData} = useContext(userContext)
    const [user, setUser] = useState()
    const [userData, setUserData] = useState()
    const router = useRouter()
    
    let parsedData;
    useEffect(() => {
        setSupabase(createClient())
        if(account) setUser(JSON.parse(account?.value))
        if(accountData) parsedData = JSON.parse(accountData?.value)
        if(Array.isArray(parsedData)) setUserData(parsedData[0])
    }, [])
    
    async function loginCallback(){
        const { data: { user } } = await supabase.auth.getUser()
        const {data, error} = await supabase
            .from('accounts')
            .upsert({id: user?.id, name: "fucker"}, { onConflict: "id"});
        if(!error){
            revalidateUser()
            revalidateUserData()
            router.push("/dashboard")
        }

    }

    async function signIn(){
        return new Promise(async(resolve, reject) => {
            const { error, data } = await supabase?.auth.signInWithPassword({
                email,
                password,
            })
            if(data) setUser(data.user)
    
            if(error){
                reject("error 400")
            }
            resolve("accepted 200")
        })
    }

    async function signUp(){
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              emailRedirectTo: `http://localhost:3000/auth/callback`,
            },
        });
      
        if (error) {
            setMessage("Sorry Could not authenticate user...");
        }
      
        setMessage("Check the email to provided to continue the sign in process...");
    }

    function handleSubmit(auth){
        switch(auth){
            case "google":
                console.log("google")
                break;
            case "github":
                console.log("github")
                break;
            case "email":
                if(login) signIn().then(() => loginCallback()).catch((err) => setMessage("Sorry Could not authenticate user..."))
                else signUp()
                break;
        }
    }

    function checkAuthErrors(){
        confirmAuth()
    }
    async function confirmAuth(){
        
    }

    if(message !== null) return (<div className={styles.SignupContainer}>{message}</div>)
    return(
        <span className={styles.SignupContainer}>
            <span className={styles.signup_formcontainer}>
                <span className={styles.signupform}>
                    <span className={styles.smalltext} onClick={() => setLogin(!login)}>{login ? "Sign up" : "Log In"}</span>
                    <span className={styles.maintext}>{login ? "Log In" : "Sign up"}</span>
                    <input type='email' name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                    <input type='password' name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                    <span onClick={() => handleSubmit("email")} className={styles.submit}>Enter</span>
                    <span className={styles.providersContainer}>
                        <span onClick={() => handleSubmit("google")} className={styles.providersGoogle}>
                            <GoogleIcon style={{color: 'white'}}/>
                        </span>
                        <span onClick={() => handleSubmit("github")} className={styles.providersGithub}>
                            <GitHubIcon style={{color: 'white'}}/>
                        </span>
                    </span>
                </span>
                <span className={styles.details}>By logging in, you agree to Portfolio Review’s <span className={styles.underlinedSpan}><Link href="/tos">Terms of Service</Link></span> and the <span className={styles.underlinedSpan}><Link href="/privacy-policy">Privacy Policy</Link></span></span>
            </span>
        </span>
    );
}