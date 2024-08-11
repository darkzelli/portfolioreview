"use client"

//styles
import styles from './dashboard-page.module.css'

//React
import { useState, useEffect } from "react";

//Next
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

//Other Functional Libaries
import { useQuery } from '@tanstack/react-query';
import { createClient } from "@/utils/supabase/client";

//Icons
import MenuIcon from '@mui/icons-material/Menu';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import StoreIcon from '@mui/icons-material/Store';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import TollIcon from '@mui/icons-material/Toll';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

//Outsourced Components
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose} from '@/components/ui/dialog';

//Created Components
import DashboardNav from "@/components/old/DashboardNav";
import Gallery from "@/components/old/Gallery";
import Portfolio from "@/components/old/Portfolio";
import Profile from "@/components/old/Profile";
import Shop from "@/components/old/Shop";
import Whatsnew from "@/components/old/Whatsnew";
import User from '@/components/old/User';
import Suggestions from '@/components/old/Suggestions';
import { AdminPanel } from '@/components/old/AdminPanel';

const supabase = createClient()
//Images
import portfolio1 from '../../images/1.jpg'

const getUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if(user){
        const {data, error} = await supabase
            .from('accounts')
            .select()
            .eq('id', user?.id);
        return (await data[0] ?? null)  
    }else return null
}

const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return await user
}

export default function DASHBOARD(){
    //React Hooks - Alphabetical Order
    const [dialogStatus, setDialogStatus] = useState(false)
    const [hamburgerOpen, setHamburgerOpen] = useState(false)
    const [portfolio_location, setPortfolio_location] = useState()
    const [portfolioData, setPortfolioData] = useState()
    const [replies, setReplies] = useState([])
    const searchParams = useSearchParams()
    const [suggestion, setSuggestion] = useState()
    const [tab, setTab] = useState("gallery");
    const [tabContent, setTabContent] = useState();
    const [userPortfolio, setUserPortfolio] = useState("")

    //Outsourced Hooks
    const userQuery = useQuery({queryKey: ['user'], queryFn: () => getUser()})
    const userDataQuery = useQuery({queryKey: ['userdata'], queryFn: () => getUserData()})

    async function getReplies(portfolio){
        const queryComments = await supabase.from('comments').select().eq('portfolio_location', portfolio);
        if(Array.isArray(queryComments?.data)){
            setReplies(queryComments?.data.sort((a,b) => b.pinned - a.pinned))
        }
    }

    async function getPortfolio(portfolio){
        let portfoliodata = {}
        const queryAccountData = await supabase.from('accounts').select().eq('route_url', portfolio);
        if(Array.isArray(queryAccountData.data)){ 
            portfoliodata.account = queryAccountData?.data[0]
            setPortfolioData(portfoliodata)
        }
    }

    async function submitSuggestion(){
        if(userDataQuery?.data){
            const {error} = await supabase
                .from('comments')
                .insert({owner: userDataQuery?.data?.id , name: userDataQuery?.data?.name, payload: suggestion, portfolio_location: portfolio_location});
            if(error) toast("Error adding comment", {type: 'error', theme: 'dark', hideProgressBar: true})
        }else if(error) toast("<ust be logged in to add a comment", {type: 'error', theme: 'dark', hideProgressBar: true})
    }

    useEffect(() => {
        if(searchParams.has('portfolio')){
            const portfolio = searchParams.get('portfolio')
            setUserPortfolio(portfolio)
            setDialogStatus(true)
            getPortfolio(portfolio) 
            getReplies(portfolio)
            setPortfolio_location(portfolio)
            console.log(replies)
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
            <Dialog open={dialogStatus} onOpenChange={setDialogStatus}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{portfolioData ? userPortfolio : "No User Found"}<Link target='_blank' passHref={true} href={portfolioData?.account?.portfolio_url ?? "/dashboard"}><OpenInNewOutlinedIcon/></Link></DialogTitle>
                        <DialogDescription>@{portfolioData?.account?.name}</DialogDescription>
                        <DialogDescription>{portfolioData?.account?.role}</DialogDescription>
                    </DialogHeader>
                    <Image  className={styles.image} alt='portfolio.png' src={portfolio1} width={512} height={288}/>
                    <DialogDescription>{portfolioData?.account?.description}</DialogDescription>

                    <span className={styles.suggestInputContainer}>
                        <input className={styles.suggestInput} onChange={(e) => setSuggestion(e.target.value)} placeholder='suggest something...'/>
                        <span className={styles.suggestBTN} onClick={() => submitSuggestion()}>
                            Suggest
                        </span>
                    </span>
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