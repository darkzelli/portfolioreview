"use client"
import styles from '../css/portfolio-page.module.css'
import Image from "next/image";
import Link from 'next/link';
import { createClient } from "@/utils/supabase/client";
import { useQuery } from '@tanstack/react-query';

import { useEffect, useState } from 'react';

import Suggestions from '@/components/old/Suggestions';

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
    const [portfolioData, setPortfolioData] = useState()
    const [replies, setReplies] = useState([])
    const [suggestion, setSuggestion] = useState()

    const userDataQuery = useQuery({queryKey: ['userdata'], queryFn: () => getUserData()})
    useEffect(() => {
        getPortfolio()
        getReplies()
    }, [portfolio])

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
        }
    }

    async function submitSuggestion(){
        if(userDataQuery?.data){
            const {error} = await supabase
                .from('comments')
                .insert({owner: userDataQuery?.data?.id , name: userDataQuery?.data?.name, payload: suggestion, portfolio_location: portfolio});
            if(error) toast("Error adding comment", {type: 'error', theme: 'dark', hideProgressBar: true})
        }else if(error) toast("<ust be logged in to add a comment", {type: 'error', theme: 'dark', hideProgressBar: true})
    }

    return (
        <span className={styles.userPortfolio}>
            <span className={styles.content}>
                <span className={styles.infoandimage}>
                    <span className={styles.info}>
                        <span className={styles.userInfo}>
                            <span className={styles.user}>{portfolioData?.account?.name ? portfolioData?.account?.name: "No Portfolio"}</span>
                            <span className={styles.role}>{portfolioData?.account?.role}</span>
                        </span>
                        <span className={styles.visit}><Link target='_blank' passHref={true} href={portfolioData?.account?.portfolio_url ?? "/dashboard"}>Visit Portfolio</Link></span>
                    </span>
                    <span className={styles.imageContainer}>
                        <Image  className={styles.image} alt='portfolio.png' src={thumbnail} width={928} height={522}/>
                    </span>
                </span>
                <span className={styles.description}>{portfolioData?.account?.description}</span>
            </span>
            <span className={styles.suggestionContainer}>
                <span className={styles.suggestionContainerContainer}>
                    <span className={styles.label}>Suggestions</span>
                    <span className={styles.suggestions}>
                        {replies.map((item, key) => (
                            <Suggestions key={key} content={item} />
                        ))}
                    </span>
                    <span className={styles.suggest}>
                        <input className={styles.suggestInput} onChange={(e) => setSuggestion(e.target.value)} placeholder='suggest something...'/>
                        <span className={styles.suggestBTN} onClick={() => submitSuggestion()}>
                            Suggest
                        </span>
                    </span>
                </span>

            </span>
        </span>
    );

 }