"use client"

import styles from './user-portfolio.module.css'
import logo from "/review_logo_white.png" 
import Image from "next/image";
import { redirect, useParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

import portfolio1 from '../../images/1.jpg'
import Header from '@/components/old/Header';

import PortfolioPage from '@/components/PortfolioPage'
import Footer from '@/components/old/Footer';

export default function UserPortfolio() {
    const params = useParams()
    


    

    return (
        <span className={styles.userPortfolio}>
            <Header/>
            <PortfolioPage portfolio={params?.portfolio}/>
        </span>
    );

 }


 
