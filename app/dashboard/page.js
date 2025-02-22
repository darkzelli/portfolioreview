"use client"

//styles
import styles from './dashboard-page.module.css'

//React
import { useState, useEffect } from "react";

//Next
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Drawer from '@mui/material/Drawer';

//Other Functional Libaries

//Icons
import MenuIcon from '@mui/icons-material/Menu';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import StoreIcon from '@mui/icons-material/Store';


//Outsourced Components


//Created Components
import DashboardNav from "@/components/old/DashboardNav";
import Gallery from "@/components/old/Gallery";
import Portfolio from "@/components/old/Portfolio";
import Profile from "@/components/old/Profile";
import Shop from "@/components/old/Shop";
import Whatsnew from "@/components/old/Whatsnew";
import User from '@/components/old/User';
import { AdminPanel } from '@/components/old/AdminPanel';

//Images


export default function DASHBOARD(){
    //React Hooks - Alphabetical Order
    const [drawer, setDrawer] = useState(false)
    const [tab, setTab] = useState("gallery");
    const [tabContent, setTabContent] = useState();


    useEffect(() => {
        switch(tab){
            case "user":
                setTabContent(<User/>)
                break;
            case "gallery":
                setTabContent(<Gallery/>)
                break;
            case "portfolio":
                setTabContent(<Portfolio/>)
                break;
            case "profile":
                setTabContent(<Profile/>)
                break;
            case "shop":
                setTabContent(<Shop/>)
                break;
            case "whatsnew":
                setTabContent(<Whatsnew/>)
                break;
            case "adminpanel":
                setTabContent(<AdminPanel/>)
                break;
            default:
                break;
        }
    }, [tab])

    const drawerContent = <></>

    return(
        <span className={styles.dashboard_page_container}>
            <span className={styles.Hamburger} onClick={() => setDrawer(true)}>
               <MenuIcon fontSize='inherit'/>
               {tab}
            </span>
            <Drawer open={drawer} onClose={() => setDrawer(false)}>
                <span className={styles.drawer}>
                    <DashboardNav tabSetter={setTab} currentTab={tab}/>
                </span>
            </Drawer>
            <span className={styles.nav}><DashboardNav tabSetter={setTab} currentTab={tab}/></span>
            <span className={styles.dashboard_content}>
                {tabContent}
            </span>
        </span>
    );
}
