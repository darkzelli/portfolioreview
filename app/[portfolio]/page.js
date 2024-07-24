"use client"

import styles from './user-portfolio.module.css'
import logo from "/review_logo_white.png" 
import Image from "next/image";
import { redirect, useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

export default function UserPortfolio() {
    const params = useParams()
    useEffect(() => {
        redirect(`/dashboard?portfolio=${params.portfolio}`)
    })

    return (
        <span className={styles.userPortfolio}>
            <Link href="/"><Image src={logo} width={150} height={150} alt="logo.png"/></Link>
           <span>Sending you to <span className={styles.username}>{params.portfolio}'s</span> Portfolio...</span>
        </span>
    );

 }