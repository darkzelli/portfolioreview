"use client"
import styles from '../css/portfolio-page.module.css'
import Image from "next/image";
import Link from 'next/link';
import { createClient } from "@/utils/supabase/client";
import { useQuery } from '@tanstack/react-query';

import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose} from '@/components/ui/dialog';

import Suggestions from '@/components/old/Suggestions';
import LaunchIcon from '@mui/icons-material/Launch';
import EmailIcon from '@mui/icons-material/Email';
import { usePathname } from 'next/navigation'

import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SailingIcon from '@mui/icons-material/Sailing';
import InfoIcon from '@mui/icons-material/Info';

import GalleryCard from '@/components/old/GalleryCard'
import LinkCard from '@/components/LinkCard'

import thumbnail from '../default_thumbnail.png'
const desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

const supabase = createClient()

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

export default function PortfolioPage({portfolio}) {
    const [dialogStatus, setDialogStatus] = useState(false)
    const [portfolioData, setPortfolioData] = useState()
    const [replies, setReplies] = useState([])
    const [suggestion, setSuggestion] = useState("")
    const [gallery, setGalley] = useState([])
    const [socialOne, setSocialOne] = useState("")
    const [socialTwo, setSocialTwo] = useState("")
    const pathname = usePathname()

    const userDataQuery = useQuery({queryKey: ['userdata'], queryFn: () => getUserData()})
    const userQueryGalleryCount = useQuery({queryKey: ['gallery'], queryFn: () => getGalleryCount()})
    useEffect(() => {
        getPortfolio()
        getReplies()
        getGallery()
    }, [portfolio])


    async function calculateSocials(){
        console.log(portfolioData?.account?.socials)
        setSocialOne(possibleSocials(portfolioData?.account?.socials[0]?.social))
        setSocialTwo(possibleSocials(portfolioData?.account?.socials[1]?.social))
    }


    function possibleSocials(social){
        switch(social){
            case "Twitter":
                return <XIcon fontSize='inherit'/>
            case "Github":
                return <GitHubIcon fontSize='inherit'/>
            case "Facebook":
                return <FacebookIcon fontSize='inherit'/>
            case "Linkedin":
                return <LinkedInIcon fontSize='inherit'/>
            case "Youtube":
                return <YouTubeIcon fontSize='inherit'/>
            case "Instagram":
                return <InstagramIcon fontSize='inherit'/>
            case "Artstation":
                return <SailingIcon fontSize='inherit'/>
            default:
                return ""
        }
    }
    async function getGallery(){
        const designerQuery = await supabase
            .from('accounts')  
            .select('*')
            .limit(3)
        setGalley(designerQuery?.data ?? null)
    }

    async function getReplies(){
        const queryComments = await supabase.from('comments').select().eq('portfolio_location', portfolio);
        if(Array.isArray(queryComments?.data)){
            setReplies(queryComments?.data.sort((a,b) => b.pinned - a.pinned))
        }
    }

    async function getPortfolio(){
        let portfoliodata = {}
        const queryAccountData = await supabase.from('accounts').select().eq('route_url', portfolio);
        if(Array.isArray(queryAccountData.data)){ 
            portfoliodata.account = queryAccountData?.data[0]
            setPortfolioData(portfoliodata)
            calculateSocials()
        }

    }

    async function submitSuggestion(){
        if(userDataQuery?.data && suggestion?.length <= 300){
            const {error} = await supabase
                .from('comments')
                .insert({owner: userDataQuery?.data?.id , name: userDataQuery?.data?.name, payload: suggestion, portfolio_location: portfolio});
        }
    }
    const iconTwitter =  <span className={styles.ico}><Link className={styles.socialLink} target='_blank' passHref={true} href={portfolioData?.account?.socials[portfolioData?.account?.socials?.findIndex(e => e.social === "Twitter")]?.url ?? "/dashboard"}><XIcon fontSize='inherit'/></Link></span>
    const iconGithub =  <span className={styles.ico}><Link className={styles.socialLink} target='_blank' passHref={true} href={portfolioData?.account?.socials[portfolioData?.account?.socials?.findIndex(e => e.social === "Github")]?.url ?? "/dashboard"}><GitHubIcon fontSize='inherit'/></Link></span>
    const iconFacebook = <span className={styles.ico}><Link className={styles.socialLink} target='_blank' passHref={true} href={portfolioData?.account?.socials[portfolioData?.account?.socials?.findIndex(e => e.social === "Facebook")]?.url ?? "/dashboard"}><FacebookIcon fontSize='inherit'/></Link></span>
    const iconLinkedIn = <span className={styles.ico}><Link className={styles.socialLink} target='_blank' passHref={true} href={portfolioData?.account?.socials[portfolioData?.account?.socials?.findIndex(e => e.social === "Linkedin")]?.url ?? "/dashboard"}><LinkedInIcon fontSize='inherit'/></Link></span>
    const iconYoutube = <span className={styles.ico}><Link className={styles.socialLink} target='_blank' passHref={true} href={portfolioData?.account?.socials[portfolioData?.account?.socials?.findIndex(e => e.social === "Youtube")]?.url ?? "/dashboard"}><YouTubeIcon fontSize='inherit'/></Link></span>
    const iconInstagram = <span className={styles.ico}><Link className={styles.socialLink} target='_blank' passHref={true} href={portfolioData?.account?.socials[portfolioData?.account?.socials?.findIndex(e => e.social === "Instagram")]?.url ?? "/dashboard"}><InstagramIcon fontSize='inherit'/></Link></span>
    const iconArtstation = <span className={styles.ico}><Link className={styles.socialLink} target='_blank' passHref={true} href={portfolioData?.account?.socials[portfolioData?.account?.socials?.findIndex(e => e.social === "Artstation")]?.url ?? "/dashboard"}><SailingIcon fontSize='inherit'/></Link></span>
    return (
        <span className={styles.userPortfolio}>
            <span className={styles.content}>
                <span className={styles.infoandimage}>
                    <span className={styles.info}>
                        <span className={styles.userInfo}>
                            <span className={styles.user}>{portfolioData?.account?.name ? portfolioData?.account?.name: "No Portfolio"}</span>
                            <span className={styles.role}>{portfolioData?.account?.role}</span>
                        </span>
                        <span className={styles.infoBtns}>
                                {portfolioData?.account?.socials?.some(e => e.social === "Twitter") ? iconTwitter : ""} 
                                {portfolioData?.account?.socials?.some(e => e.social === "Github") ? iconGithub : ""} 
                                {portfolioData?.account?.socials?.some(e => e.social === "Facebook") ? iconFacebook : ""} 
                                {portfolioData?.account?.socials?.some(e => e.social === "Linkedin") ? iconLinkedIn : ""} 
                                {portfolioData?.account?.socials?.some(e => e.social === "Youtube") ? iconYoutube : ""} 
                                {portfolioData?.account?.socials?.some(e => e.social === "Instagram") ? iconInstagram : ""} 
                                {portfolioData?.account?.socials?.some(e => e.social === "Artstation") ? iconArtstation : ""} 
                            <span className={styles.visit}>
                                <Link className={styles.linktext} target='_blank' passHref={true} href={portfolioData?.account?.portfolio_url ?? "/dashboard"}>Visit Portfolio</Link>
                                <span className={styles.linkbtn}><LaunchIcon fontSize='inherit'/></span>
                            </span>
                        </span>
                    </span>
                    <span className={styles.imageContainer}>
                        <Image  className={styles.image} alt='portfolio.png' src={portfolioData?.account?.thumbnail ?? thumbnail} width={928} height={522}/>
                    </span>
                </span>
                <span className={styles.description}>{portfolioData?.account?.description}</span>
            </span>
            <span className={styles.suggestionContainer}>
                <span className={styles.suggesttopLabel}>Suggestions<span className={ suggestion?.length <= 0 ? styles.displayNone : ( suggestion?.length <= 300 ? styles.suggestionCount : styles.suggestionCountRed)}>{suggestion?.length ?? 0}/300</span></span>
                <span className={styles.suggestionContainerContainer}>
                    <span className={styles.suggestions}>
                        {replies.map((item, key) => (
                            <Suggestions key={key} content={item} />
                        ))}
                    </span> 
                    <span className={styles.suggest}>
                        <input className={styles.suggestInput} onChange={(e) => setSuggestion(e.target.value)} placeholder='suggest something...'/>
                        <span className={styles.suggesthr}></span>
                        <span className={styles.suggestBTN} onClick={() => submitSuggestion()}>
                            Enter
                        </span>
                    </span>
                </span>

            </span>
            {gallery ? <span className={styles.alsoLike}>
                <span className={styles.alsoLikeLabel}> You might also like</span>
                <span className={styles.alsoLikeGallery}>{gallery?.map((data, key) => (
                    <LinkCard content={data} key={key}/>
                ))}</span>
            </span> : ""}
            <span onClick={() => setDialogStatus(true)} className={styles.report}><span className={styles.icon}><InfoIcon fontSize='inherit'/></span>Report</span>
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