import styles from '../../css/user.module.css'
import { createClient } from '@/utils/supabase/client'

import { userContext } from '../UseUser'
import { useContext } from 'react'
import { useRouter } from 'next/navigation'

export default function User() {
    const [user, setUser, userData, setUserData] = useContext(userContext)
    const router = useRouter()
    async function signOut(){
        const supabase = createClient()
        const { error } = await supabase.auth.signOut()
        if(error) console.log("Could not sign out")
        else{
            setUser(null)
            router.push("/dashboard")
        }
    }
    return (
        <span className={styles.user}>
            <span className={styles.signoutbtn} onClick={() => signOut()}>Log Out</span>
        </span>
    );

 }