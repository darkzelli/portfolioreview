"use client"
import styles from '../../css/user.module.css'
import { createClient } from '@/utils/supabase/client'

import { userContext } from '../UseUser'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { revalidateUser, revalidateUserData } from '../revalidateTags'

import { useQueryClient } from '@tanstack/react-query'

export default function User() {
    const queryClient = useQueryClient()
    const router = useRouter()
    async function signOut(){
        const supabase = createClient()
        await supabase.auth.signOut().then(() => queryClient.invalidateQueries({queryKey: ['user', 'userdata']})).catch((error) => console.log(error))
        
    }
    return (
        <span className={styles.user}>
            <span className={styles.signoutbtn} onClick={() => signOut()}>Log Out</span>
        </span>
    );

 }