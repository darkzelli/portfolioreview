import styles from '../../css/gallerycard.module.css'

import NotesIcon from '@mui/icons-material/Notes';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose} from '@/components/ui/dialog';

import Suggestions from '@/components/old/Suggestions';

import { useEffect, useState } from 'react';

import portfolio1 from '../../images/1.jpg'

import defaultthumbnail from '../../default_thumbnail.png'

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

export default function GalleryCard({content}) {
    const [dialogStatus, setDialogStatus] = useState(false)
    const [replies, setReplies] = useState([])
    const [replyCount, setReplyCount] = useState(0);
    const [suggestion, setSuggestion] = useState()

    const userDataQuery = useQuery({queryKey: ['userdata'], queryFn: () => getUserData()})

    async function getReplies(){
        const queryComments = await supabase
            .from('comments')
            .select('*', { count: 'exact' })
            .eq('portfolio_location', content?.route_url);
        if(Array.isArray(queryComments?.data)){
            setReplies(queryComments?.data.sort((a,b) => b.pinned - a.pinned))
            setReplyCount(queryComments?.count)
        }
    }

 


    async function submitSuggestion(){
        if(userDataQuery?.data && suggestion?.length <= 300){
            const {error} = await supabase
                .from('comments')
                .insert({owner: userDataQuery?.data?.id , name: userDataQuery?.data?.name, payload: suggestion, portfolio_location: content?.route_url});
            if(error) toast("Error suggesting", {type: 'error', theme: 'dark', hideProgressBar: true})
        }else toast("Must be logged in to add a comment & less than 300 charatcers", {type: 'error', theme: 'dark', hideProgressBar: true})
    }

    

    useEffect(() => {
        getReplies()
    }, [content])
    return (
        <span className={styles.GalleryCard}>
            <Image alt="" src={content?.thumbnail ?? defaultthumbnail} width={288} height={162} onClick={() => setDialogStatus(true)}/>
            <span className={styles.details}>
                <span className={styles.user}>
                    <span className={styles.detail}>{content?.name}</span>
                    <span className={styles.detail}><FiberManualRecordIcon fontSize='inherit'/></span>
                    <span className={styles.detail}>{content?.role}</span>
                </span>
                <span className={styles.info}>
                    <span className={styles.detail}><NotesIcon fontSize='inherit'/></span>
                    <span className={styles.detail}>{replyCount}</span>
                </span>
            </span>
            <Dialog open={dialogStatus} onOpenChange={setDialogStatus}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{content?.name ? content?.name : "No User Found"}<Link target='_blank' passHref={true} href={content?.portfolio_url ?? "/dashboard"}><OpenInNewOutlinedIcon/></Link></DialogTitle>
                        <DialogDescription>portfolioreview.me/{content?.route_url}</DialogDescription>
                        <DialogDescription>{content?.role}</DialogDescription>
                    </DialogHeader>
                    <Image  className={styles.image} alt='portfolio.png' src={content?.thumbnail ?? defaultthumbnail} width={512} height={288}/>
                    <DialogDescription>{content?.description}</DialogDescription>

                    <span className={styles.suggestInputContainer}>
                        <input className={styles.suggestInput} onChange={(e) => setSuggestion(e.target.value)} placeholder='suggest something...'/>
                        <span className={styles.suggesthr}></span>
                        <span className={styles.suggestBTN} onClick={() => submitSuggestion()}>
                            Enter
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
            <ToastContainer stacked/>
        </span>
    );

 }