import styles from '../../css/gallerycard.module.css'

import NotesIcon from '@mui/icons-material/Notes';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from 'next/link';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose} from '@/components/ui/dialog';

import Suggestions from '@/components/old/Suggestions';

import { useEffect, useState } from 'react';

import portfolio1 from '../../images/1.jpg'

import defaultthumbnail from '../../default_thumbnail.png'

const supabase = createClient()

export default function GalleryCard({content}) {
    const [dialogStatus, setDialogStatus] = useState(false)
    const [replies, setReplies] = useState([])
    const [thumbnail, setThumbnail] = useState()
    async function getReplies(){
        const queryComments = await supabase.from('comments').select().eq('portfolio_location', content?.route_url);
        if(Array.isArray(queryComments?.data)){
            setReplies(queryComments?.data.sort((a,b) => b.pinned - a.pinned))
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

    async function getThumbnail(){
        console.log('ffefe')
        const { data } = supabase.storage.from('test').getPublicUrl(content?.id + '/thumbnail')
        setThumbnail(data?.publicUrl ?? null)
    }

    useEffect(() => {
        getReplies()
        getThumbnail()
        console.log(thumbnail?.error)
    }, [content])
    return (
        <span className={styles.GalleryCard}>
            <Image alt="" src={thumbnail ?? defaultthumbnail} width={288} height={162} onClick={() => setDialogStatus(true)}/>
            <span className={styles.details}>
                <span className={styles.user}>
                    <span className={styles.detail}>{content?.name}</span>
                    <span className={styles.detail}><FiberManualRecordIcon fontSize='inherit'/></span>
                    <span className={styles.detail}>{content?.role}</span>
                </span>
                <span className={styles.info}>
                    <span className={styles.detail}><NotesIcon fontSize='inherit'/></span>
                    <span className={styles.detail}>40</span>
                </span>
            </span>
            <Dialog open={dialogStatus} onOpenChange={setDialogStatus}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{content?.name ? content?.name : "No User Found"}<Link target='_blank' passHref={true} href={content?.portfolio_url ?? "/dashboard"}><OpenInNewOutlinedIcon/></Link></DialogTitle>
                        <DialogDescription>portfolioreview.me/{content?.route_url}</DialogDescription>
                        <DialogDescription>{content?.role}</DialogDescription>
                    </DialogHeader>
                    <Image  className={styles.image} alt='portfolio.png' src={`https://ohfftirpfjwsakryntaz.supabase.co/storage/v1/object/public/test/${content?.id}/thumbnail`} width={512} height={288}/>
                    <DialogDescription>{content?.description}</DialogDescription>

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