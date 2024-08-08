"use client";
import styles from '../../css/auth.module.css'

import { useState, useRef, useEffect, useContext } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { createClient } from "@/utils/supabase/client";

import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';



const supabase = createClient()

export default function AuthPage(){
    const [email, setEmail] = useState();
    const [login, setLogin] = useState(true);
    const [message, setMessage] = useState(null)
    const [password, setPassword] = useState()
    const queryClient = useQueryClient()
    const router = useRouter()


    async function loginCallback(){
        const { data: { user } } = await supabase.auth.getUser()
        if(user) queryClient.setQueriesData(['user'], user)

        const {error} = await supabase
            .from('accounts')
            .upsert({id: user?.id}, { onConflict: "id"})
        if(error) console.log(error)
        queryClient.invalidateQueries({queryKey: ['userdata']})

    }

    async function signIn(){
        return new Promise(async(resolve, reject) => {
            const { error, data } = await supabase?.auth.signInWithPassword({
                email,
                password,
            })
    
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

    async function handleSubmit(auth){
        switch(auth){
            case "google":
                const googleLogin = await supabase.auth.signInWithOAuth({
                    provider: 'google',
                })
                if(!googleLogin?.error) loginCallback()
                break;
            case "github":
                const githubLogin = await supabase.auth.signInWithOAuth({
                    provider: 'github',
                })
                if(!githubLogin?.error) loginCallback()
                break;
            case "email":
                if(login) signIn().then(() => loginCallback()).catch((err) => setMessage("Sorry Could not authenticate user..."))
                else signUp()
                break;
        }
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