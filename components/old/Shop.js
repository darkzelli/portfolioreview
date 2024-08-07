"use client";
import styles from '../../css/shop.module.css'

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import { createClient } from "@/utils/supabase/client";

import CheckIcon from '@mui/icons-material/Check';




const supabase = createClient()

const getUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    const {data, error} = await supabase
        .from('accounts')
        .select()
        .eq('id', user?.id);
    return (await data[0] ?? null)
}

export default function Shop() {
    const userDataQuery = useQuery({queryKey: ['userdata'], queryFn: () => getUserData()})

    return (
        <span className={styles.shop}>
            { (userDataQuery?.data?.membership === "Member" ||  userDataQuery?.data?.membership === "Staff") ? <></> : <span className={styles.Pricingtab}>
                    <span className={styles.maintext}>Become a member</span>
                    <span className={styles.priceInfo}>
                        <span className={styles.ogPrice}>$25</span>
                        <span className={styles.price}>$10</span>
                    </span>
                    <span className={styles.features}>
                        <span className={styles.feature}><CheckIcon/>Upload a Portfolio</span>
                        <span className={styles.feature}><CheckIcon/>Unlimited Critique Credits</span>
                        <span className={styles.feature} ><CheckIcon/>View portfolios</span>
                    </span>
                    <Link href="/membership" className={styles.button}>One Time Payment</Link>
            </span>}
            <span className={styles.credits}>
                <span className={styles.Credittab}>
                        <span className={styles.maintext}>20 Critique Credits</span>
                        <span className={styles.priceInfo}>
                            <span className={styles.ogPrice}>$5</span>
                            <span className={styles.price}>$3</span>
                        </span>
                        <span className={styles.features}>
                            <span className={styles.feature}>Critique credits are credits used to critique, suggest or comment on a portfolio</span>

                        </span>
                        <Link href="/dashboard" className={styles.cbutton}>One Time Payment</Link>
                </span>
                <span className={styles.Credittab}>
                        <span className={styles.maintext}>50 Critique Credits</span>
                        <span className={styles.priceInfo}>
                            <span className={styles.ogPrice}>$10</span>
                            <span className={styles.price}>$6</span>
                        </span>
                        <span className={styles.features}>
                            <span className={styles.feature}>Critique credits are credits used to critique, suggest or comment on a portfolio</span>

                        </span>
                        <Link href="/dashboard" className={styles.cbutton}>One Time Payment</Link>
                </span>
            </span>
        </span>
    );

 }