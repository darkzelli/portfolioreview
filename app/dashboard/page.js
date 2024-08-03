"use client"

import styles from './dashboard-page.module.css'

import MenuIcon from '@mui/icons-material/Menu';

import DashboardNav from "@/components/old/DashboardNav";
import Gallery from "@/components/old/Gallery";
import Portfolio from "@/components/old/Portfolio";
import Profile from "@/components/old/Profile";
import Settings from "@/components/old/Settings";
import MembershipTab from "@/components/old/MembershipTab";
import Shop from "@/components/old/Shop";
import Whatsnew from "@/components/old/Whatsnew";
import { AdminPanel } from '@/components/old/AdminPanel';
import User from '@/components/old/User';


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

import { useSearchParams } from 'next/navigation';


import { useState, useEffect } from "react";

import Image from 'next/image';


import portfolio1 from '../../images/1.jpg'



import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from '@/components/ui/dialog';

import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import Link from 'next/link';
import Suggestions from '@/components/old/Suggestions';

import { useQuery } from '@tanstack/react-query';

const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return await user
}

export default function DASHBOARD(){
    
    const [hamburgerOpen, setHamburgerOpen] = useState(false)
    const [tab, setTab] = useState("gallery");
    const [tabContent, setTabContent] = useState();
    const searchParams = useSearchParams()
    const [dialogStatus, setDialogStatus] = useState(false)
    const [userPortfolio, setUserPortfolio] = useState("")
    const [portfolioData, setPortfolioData] = useState()
    const [replies, setReplies] = useState([])

    const userQuery = useQuery({queryKey: ['user'], queryFn: () => getUser()})

    async function getPortfolio(portfolio){
        console.log(portfolio)
        fetch(process.env.NEXT_PUBLIC_NEXT_URL + "api/user/info?portfolio=" + portfolio.toString() , {method: "GET"})
        .then((res) => res.json().then((data) => {
          if(res.status === 200){setPortfolioData(data); setReplies(data?.message?.portfolio?.suggestions)}
          else console.log("an error")
        }).catch((err) => console.log(err)))
        .catch((err) => console.log(err))
    }


    useEffect(() => {
        if(searchParams.has('portfolio')){
            const portfolio = searchParams.get('portfolio')
            setUserPortfolio(portfolio)
            setDialogStatus(true)
            getPortfolio(portfolio)

            
        }    
    }, [searchParams.get('portfolio')])

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
            case "settings":
                setTabContent(<Settings/>)
                break;
            case "membership":
                setTabContent(<MembershipTab/>)
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
    const suggest = <></>
    return(
        <span className={styles.dashboard_page_container}>
            <span className={styles.Hamburger}>
                <span onClick={() => setHamburgerOpen(!hamburgerOpen)}><MenuIcon fontSize='inherit'/></span>
                <span className={hamburgerOpen ? styles.Hamburger_Menu : styles.Hamburger_Menu_Closed}>
                    {userQuery?.data ? <span  onClick={() => setTab("user")} className={tab === "user" ? styles.purpleColor : styles.blackColor}><PowerSettingsNewIcon fontSize='inherit' /></span> : <Link className={styles.twentyFour} href="/login"><PowerSettingsNewIcon fontSize='inherit' /></Link>}
                    <span onClick={() => setTab("gallery")}className={tab === "gallery" ? styles.purpleColor : styles.blackColor}><PermMediaIcon fontSize='inherit'/></span>
                    {userQuery?.data ? <span onClick={() => setTab("portfolio")} className={tab === "portfolio" ? styles.purpleColor : styles.blackColor}><FolderOpenIcon fontSize='inherit'/></span> : <></>}
                    {userQuery?.data ? <span onClick={() => setTab("profile")} className={tab === "profile" ? styles.purpleColor : styles.blackColor}><PersonIcon fontSize='inherit'/></span> : <></>}
                    {userQuery?.data ? <span onClick={() => setTab("shop")} className={tab === "shop" ? styles.purpleColor : styles.blackColor}><StoreIcon fontSize='inherit'/></span> : <></>}
                    <span onClick={() => setTab("whatsnew")} className={tab === "whatsnew" ? styles.purpleColor : styles.blackColor}><HistoryIcon fontSize='inherit'/></span>
                </span>
            </span>
            <span className={styles.nav}><DashboardNav tabSetter={setTab} currentTab={tab}/></span>
            <span className={styles.dashboard_content}>
                {tabContent}
            </span>
            <Dialog open={dialogStatus}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{portfolioData?.message?.name ? userPortfolio : "No User Found"}<Link target='_blank' passHref={true} href={portfolioData?.message?.portfolio?.url ?? "/dashboard"}><OpenInNewOutlinedIcon/></Link></DialogTitle>
                        <DialogDescription>{portfolioData?.message?.role}</DialogDescription>
                        <DialogDescription>{portfolioData?.message?.description}</DialogDescription>
                    </DialogHeader>
                    <Image  className={styles.image} alt='portfolio.png' src={portfolio1} width={512} height={288}/>
                    <span className={styles.portfolioDetails}> 
                        <span className={styles.favorites}> 
                            <span>{portfolioData?.message?.portfolio?.likes ?? 0}</span>
                            <span>Likes</span>
                        </span>
                        <span className={styles.views}>
                            <span>{portfolioData?.message?.portfolio?.views ?? 0}</span>
                            <span>Views</span>
                        </span>
                    </span>
                    {portfolioData?.message?.portfolio?.suggestions?.length < 100 ?<span className={styles.suggest}>
                        <span className={styles.suggestInputContainer}><input className={styles.suggestInput} placeholder='suggest something...'/></span>
                        <span className={styles.suggestBTN}>Suggest</span>
                    </span> : "" }
                    <span className={styles.portfolioComments}>
                        {replies.map((item, key) => (
                            <Suggestions key={key} content={item} />
                        ))}
                    </span>
                    <button onClick={() => setDialogStatus(false)}>close</button>
                </DialogContent>
            </Dialog>
        </span>
    );
}