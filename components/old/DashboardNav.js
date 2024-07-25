"use client"
import styles from '../../css/dashboard-nav.module.css'

import logo from "/review_logo_black.png" 

import Image from "next/image";
import Link from 'next/link';


import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import FeedbackIcon from '@mui/icons-material/Feedback';
import GavelIcon from '@mui/icons-material/Gavel';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import StoreIcon from '@mui/icons-material/Store';
import LogoutIcon from '@mui/icons-material/Logout';

import { createClient } from "@/utils/supabase/client";

import { useState, useEffect, useContext } from 'react';

import { userContext } from '../UseUser';

export default function DashboardNav(props) {
    const [user, setUser] = useContext(userContext)

    useEffect(() => {
        connectSupa()
    }, [])
  
    async function connectSupa(){
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser()
        setUser(user)
    } 
    const session = false

    const enabledGallery = <li  className={props.currentTab === "gallery" ? styles.selectedTab : styles.notSelectedTab} onClick={() => props.tabSetter("gallery")}><span><span className={styles.icon}><PermMediaIcon/></span>Gallery</span></li>
    const disabledGallery = <li className={styles.disabledTab}><span><span className={styles.icon}><PermMediaIcon/></span>Gallery</span></li>
    const enabledPortfolio = <li  className={props.currentTab === "portfolio" ? styles.selectedTab : styles.notSelectedTab} onClick={() => props.tabSetter("portfolio")}><span><span className={styles.icon}><FolderOpenIcon/></span>Portfolio</span></li>
    const disabledPortfolio = <li className={styles.disabledTab}><span><span className={styles.icon}><FolderOpenIcon/></span>Portfolio</span></li>
    const enabledProfile = <li  className={props.currentTab === "profile" ? styles.selectedTab : styles.notSelectedTab} onClick={() => props.tabSetter("profile")}><span><span className={styles.icon}><PersonIcon/></span>Profile</span></li>
    const disabledProfile = <li className={styles.disabledTab}><span><span className={styles.icon}><PersonIcon/></span>Profile</span></li>
    const enabledShop = <li  className={props.currentTab === "shop" ? styles.selectedTab : styles.notSelectedTab} onClick={() => props.tabSetter("shop")}><span><span className={styles.icon}><StoreIcon/></span>Shop</span></li>
    const disabledShop = <li className={styles.disabledTab}><span><span className={styles.icon}><StoreIcon/></span>Shop</span></li>

    return (
        <span className={styles.Settings_Nav_Container}>
           <ul className={styles.settingsUl}>
                <li className={styles.image}><Image src={logo} width={150} height={150} alt="logo.png"/></li>
                <li  className={props.currentTab === "user" ? styles.selectedTab : styles.notSelectedTab}><span><span className={styles.icon}><PowerSettingsNewIcon/></span>{user ? <span onClick={() => props.tabSetter("user")}>{user?.email}</span> : <Link href="/login">Log in</Link>}</span></li>
                {user ? enabledGallery : disabledGallery}
                {user ? enabledPortfolio : disabledPortfolio}
                {user ? enabledProfile : disabledProfile}
                {user ? enabledShop : disabledShop}
                <li  className={props.currentTab === "whatsnew" ? styles.selectedTab : styles.notSelectedTab} onClick={() => props.tabSetter("whatsnew")}><span><span className={styles.icon}><HistoryIcon/></span>What's New</span></li>
                <li ><span><Link href="https://insigh.to/b/portfolio-review" className={styles.link}><span className={styles.icon}><FeedbackIcon/></span>Feedback</Link></span></li>
                <li><span><Link href="/tos" className={styles.link}><span className={styles.icon}><GavelIcon/></span>TOS</Link></span></li>
                <li><span><Link href="/privacy-policy" className={styles.link}><span className={styles.icon}><PrivacyTipIcon/></span>Privacy Policy</Link></span></li>
                {session?.user?.adminStatus ? <li onClick={() => props.tabSetter("adminpanel")}><span><span className={styles.icon}><AdminPanelSettingsIcon/></span>Admin Panel</span></li> : <></>} 
           </ul>
        </span>
    );

 }