import styles from '../css/gallerycard.module.css'

import { createClient } from "@/utils/supabase/client";
import Link from 'next/link';
import Image from "next/image";

import { useEffect, useState } from 'react';

import defaultthumbnail from '../default_thumbnail.png'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import NotesIcon from '@mui/icons-material/Notes';



const supabase = createClient()

export default function LinkCard({content}) {
    const [replyCount, setReplyCount] = useState(0);


    async function getReplies(){
        const queryComments = await supabase
            .from('comments')
            .select('*', { count: 'exact' })
            .eq('portfolio_location', content?.route_url);
            setReplyCount(queryComments?.count ?? 0)
    }
    



    

    useEffect(() => {
        getReplies()
    }, [content])

    return (
        <span className={styles.GalleryCard}>
            <Link href={"/" + content?.route_url}><Image alt="" src={content?.thumbnail ?? defaultthumbnail} width={288} height={162}/></Link>
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
    
        </span>
    );

}