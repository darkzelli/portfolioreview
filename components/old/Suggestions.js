"use client"
import styles from '../../css/suggestions.module.css'

import { useQuery } from '@tanstack/react-query';
import { createClient } from "@/utils/supabase/client";

import PushPinIcon from '@mui/icons-material/PushPin';

const supabase = createClient()

const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return await user
}

export default function Suggestions(props) {
    const userQuery = useQuery({queryKey: ['user'], queryFn: () => getUser()})

    return (
        <span className={styles.Suggestions}>
            <span className={styles.details}> 
                <span>{props?.content?.name} </span>
                <span>{props?.content?.pinned ? <PushPinIcon fontSize='inherit'/> : ""}</span>
            </span>
            <span>{props?.content?.payload}</span>
            {userQuery?.data?.id === props?.content?.owner ?  <span className={styles.deleteBTN}>Delete</span> : ""}
        </span>
    );

 }