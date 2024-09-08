"use client"
import styles from '../../css/dashboard-nav.module.css'


import Image from "next/image";
import Link from 'next/link';
import Drawer from '@mui/material/Drawer';
import { createClient } from "@/utils/supabase/client";
import { useQuery } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose} from '@/components/ui/dialog';
import { usePathname } from 'next/navigation'
import { useState } from 'react';


import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import FeedbackIcon from '@mui/icons-material/Feedback';
import GavelIcon from '@mui/icons-material/Gavel';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import StoreIcon from '@mui/icons-material/Store';
import InfoIcon from '@mui/icons-material/Info';


import logo from "/review_logo_black.png" 

const supabase = createClient()

export function testLocal(){
  const stor = typeof window !== 'undefined' ? window.localStorage : undefined
  stor.setItem("Dopper", "213313")
}

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


export default function DashboardNav(props) {
    const [dialogStatus, setDialogStatus] = useState(false)
    const pathname = usePathname()
    const userQuery = useQuery({queryKey: ['user'], queryFn: () => getUser()})
    const userDataQuery = useQuery({queryKey: ['userdata'], queryFn: () => getUserData()})
    //console.log('loading:',userQuery.isLoading,'fecthing:',userQuery.isFetching)
    //console.log('loading:',userDataQuery.isLoading,'fecthing:',userDataQuery.isFetching)

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
                <li className={styles.image}><Link href="/"><Image src={logo} width={150} height={150} alt="logo.png"/></Link></li>
                <li  className={props.currentTab === "user" ? styles.selectedTab : styles.notSelectedTab}><span><span className={styles.icon}><PowerSettingsNewIcon/></span>{userQuery?.data ? <span onClick={() => props.tabSetter("user")}>{userDataQuery?.data?.name !== undefined && userDataQuery?.data?.name !== null   ? userDataQuery?.data?.name : "Account"}</span> : <Link href="/login">Log in</Link>}</span></li>
                {enabledGallery}
                {userQuery?.data ? enabledPortfolio : disabledPortfolio}
                {userQuery?.data ? enabledProfile : disabledProfile}
                <li  className={props.currentTab === "whatsnew" ? styles.selectedTab : styles.notSelectedTab} onClick={() => props.tabSetter("whatsnew")}><span><span className={styles.icon}><HistoryIcon/></span>What's New</span></li>
                <li ><span><Link href="https://insigh.to/b/portfolio-review" className={styles.link}><span className={styles.icon}><FeedbackIcon/></span>Feedback</Link></span></li>
                <li><span><Link href="/tos" className={styles.link}><span className={styles.icon}><GavelIcon/></span>TOS</Link></span></li>
                <li><span><Link href="/privacy-policy" className={styles.link}><span className={styles.icon}><PrivacyTipIcon/></span>Privacy Policy</Link></span></li>
                <li className={styles.reportissue} onClick={() => setDialogStatus(true)}><span><span className={styles.icon}><InfoIcon/></span>Report Issue</span></li>
           </ul>
           <Dialog open={dialogStatus} onOpenChange={setDialogStatus}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Report An Issue</DialogTitle>
                        <DialogDescription>Please provide as much information as possible</DialogDescription>
                    </DialogHeader>
                    <form className={styles.issueDialogForm}>
                      <span className={styles.currentLocationContainer}>
                        <span className={styles.locationLabel}>Location</span>
                        <span className={styles.currentLocation}>{pathname}</span>
                      </span>
                      <span className={styles.issueLab}>
                        <label className={styles.issueLabel}>Subject</label>
                        <input className={styles.issueInput}placeholder='Button does not Work...' required/>
                      </span>
                      <span className={styles.issueLab}>
                        <label className={styles.issueLabel}>Issue</label>
                        <textarea  className={styles.issueInput}placeholder='Describe the issue' required/>
                      </span>
                      <span className={styles.submitIssue}>Submit</span>
                    </form>
                </DialogContent>
            </Dialog>
        </span>
    );

 }