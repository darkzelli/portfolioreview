"use client"
import styles from '../../css/user.module.css'

import { useRouter } from 'next/navigation'

import { createClient } from '@/utils/supabase/client'
import { useQueryClient } from '@tanstack/react-query'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function User() {
    const queryClient = useQueryClient()
    const router = useRouter()
    
    async function signOut(){
        const supabase = createClient()
        const { error } = await supabase.auth.signOut()
        if(error) toast("Error Logging Out", {type: 'error', theme: 'dark', hideProgressBar: true})
        else{
            toast("Logged Out", {type: 'success', theme: 'dark', hideProgressBar: true})
            queryClient.invalidateQueries({queryKey: ['user']})
            queryClient.invalidateQueries({queryKey: ['userdata']})
        }
    }

    return (
        <span className={styles.user}>
            <span className={styles.signoutbtn} onClick={() => signOut()}>Log Out</span>
            <ToastContainer/>
        </span>
    );

 }