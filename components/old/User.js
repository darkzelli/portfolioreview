import styles from '../../css/user.module.css'
import { createClient } from '@/utils/supabase/client'


export default function User() {
    async function signOut(){
        const supabase = createClient()
        const { error } = await supabase.auth.signOut()
        if(error) console.log("Could not sign out")
    }
    return (
        <span className={styles.user}>
            <span className={styles.signoutbtn} onClick={() => signOut()}>Log Out</span>
        </span>
    );

 }