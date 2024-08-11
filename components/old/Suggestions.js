"use client"
import styles from '../../css/suggestions.module.css'

import { useQuery } from '@tanstack/react-query';
import { createClient } from "@/utils/supabase/client";

import PushPinIcon from '@mui/icons-material/PushPin';

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

const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return await user
}

export default function Suggestions(props) {
    const userQuery = useQuery({queryKey: ['user'], queryFn: () => getUser()})
    const userDataQuery = useQuery({queryKey: ['userdata'], queryFn: () => getUserData()})

    async function deleteSuggestion(){
        if(userQuery?.data?.id === props?.content?.owner){
            const response = await supabase
                .from('comments')
                .delete()
                .eq('payload', props?.content?.payload);
        }
    }
    async function pinSuggestion(pinstatus){
        if(userDataQuery?.data?.route_url === props?.content?.portfolio_location){
            const { error } = await supabase
                .from('comments')
                .update({pinned: pinstatus})
                .eq('payload', props?.content?.payload);
        }
    }
    return (
        <span className={styles.Suggestions}>
            <span className={styles.details}> 
                <span>{props?.content?.name} </span>
                <span>{props?.content?.pinned ? <PushPinIcon fontSize='inherit'/> : ""} </span>
                <span>{userDataQuery?.data?.route_url === props?.content?.portfolio_location ?  (props?.content?.pinned ? <span className={styles.Pin} onClick={() => pinSuggestion(true)}>unpin</span> : <span className={styles.Pin} onClick={() => pinSuggestion(true)}>Pin</span>): ""}</span>
            </span>
            <span>{props?.content?.payload}</span>
            {userQuery?.data?.id === props?.content?.owner ?  <span className={styles.deleteBTN} onClick={() => deleteSuggestion()}>Delete</span> : ""}
        </span>
    );

}