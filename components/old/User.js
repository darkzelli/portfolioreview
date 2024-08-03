"use client"
import styles from '../../css/user.module.css'

import { useRouter } from 'next/navigation'

import { createClient } from '@/utils/supabase/client'
import { useQueryClient } from '@tanstack/react-query'



export default function User() {
    const queryClient = useQueryClient()
    const router = useRouter()
    
    async function signOut(){
        const supabase = createClient()
        const { error } = await supabase.auth.signOut()
        if(error) console.log("Could not sign out")
        else{
            console.log("invalidating")
            queryClient.invalidateQueries({queryKey: ['user']})
            queryClient.invalidateQueries({queryKey: ['userdata']})
        }
    }

    return (
        <span className={styles.user}>
            <span className={styles.signoutbtn} onClick={() => signOut()}>Log Out</span>
        </span>
    );

 }