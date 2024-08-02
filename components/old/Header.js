"use client"
import styles from '../../css/header.module.css'

import logo from "/review_logo_white.png" 

import { useEffect, useState, useContext} from 'react';

import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";


import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

import { createClient } from "@/utils/supabase/client";
import { userContext } from '../UseUser';





export default function Header(){
    const [hamOpen, setHamOpen] = useState(false);
    const {account, accountData} = useContext(userContext)
    const [user, setUser] = useState()
    const [userData, setUserData] = useState()

    let parsedData;
    useEffect(() => {
      connectSupa()
      console.log(account, accountData)
      if(account) setUser(JSON.parse(account?.value))
      if(accountData) parsedData = JSON.parse(accountData?.value)
      if(Array.isArray(parsedData)) setUserData(parsedData[0])
    }, [])

    async function connectSupa(){
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser()
     setUser(user)
    } 



    return(
        <span className={styles.header}>
          <ul className={styles.header_ul}>
            <li className={styles.logo_links}>
              <span className={styles.logo}>
                <Link href="/"><Image src={logo} width={150} height={150} alt="logo.png"/></Link>
              </span>
              <span>
                <ul className={styles.nav_links}>
                  <li>
                    <span className={styles.nav_br}></span>
                  </li>
                  <li>
                    <Link href="/dashboard">
                    Gallery
                    </Link>
                  </li>
                </ul>
              </span>
            </li>
            <li>
              <span>
                <ul className={styles.nav_user}>

                  <li>
                    <Link className={styles.nav_signup} href={user !== null ? "/dashboard" : "/login"}><span>{user !== null ? userData?.name : "Log in"}</span></Link>
                  </li>
                  <li className={styles.nav_menu}>
                    <span onClick={() => hamOpen ? setHamOpen(false) : setHamOpen(true)}>{hamOpen ? <CloseIcon className={styles.nav_menuicon}></CloseIcon> : <MenuIcon className={styles.nav_menuicon}></MenuIcon>}</span>
                  </li>
                </ul>
              </span>
            </li>
          </ul>
          <span className={hamOpen ? styles.extendedNav : styles.disnone}>
            <span><Link href="/dashboard">Gallery</Link></span>
            <span>
              {user !== null ? <Link href="/login">{userData?.name}</Link> : <Link href="/login">Log In</Link>}
            </span>
          </span>
        </span>
    );
}