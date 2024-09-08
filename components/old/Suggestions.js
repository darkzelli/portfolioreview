"use client"
import styles from '../../css/suggestions.module.css'

import { useQuery } from '@tanstack/react-query';
import { createClient } from "@/utils/supabase/client";
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose} from '@/components/ui/dialog';
import { useState } from 'react';

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
    const [dialogStatus, setDialogStatus] = useState(false)
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
                <span>
                    <Popover>
                        <PopoverTrigger>{props?.content?.name}</PopoverTrigger>
                        <PopoverContent>
                            <span className={styles.popoverContainer}>
                                <span className={styles.popoverName}>{props?.content?.name}</span>
                                <span className={styles.popoverRole}>{userDataQuery?.data?.role}</span>
                                <Link className={styles.popoverVisit} href={"/" +  userDataQuery?.data?.route_url}>Visit Profile</Link>
                                <span className={styles.popoverReport} onClick={() => setDialogStatus(true)}>Report User</span>
                            </span>
                        </PopoverContent>
                    </Popover>
                </span>
                <span>{props?.content?.pinned ? <PushPinIcon fontSize='inherit'/> : ""} </span>
                <span>{userDataQuery?.data?.route_url === props?.content?.portfolio_location ?  (props?.content?.pinned ? <span className={styles.Pin} onClick={() => pinSuggestion(true)}>unpin</span> : <span className={styles.Pin} onClick={() => pinSuggestion(true)}>Pin</span>): ""}</span>
            </span>
            <span>{props?.content?.payload}</span>
            {userQuery?.data?.id === props?.content?.owner ?  <span className={styles.deleteBTN} onClick={() => deleteSuggestion()}>Delete</span> : ""}
            <Dialog open={dialogStatus} onOpenChange={setDialogStatus}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Report User</DialogTitle>
                        <DialogDescription>Please provide as much information as possible</DialogDescription>
                    </DialogHeader>
                    <form className={styles.issueDialogForm}>
                      <span className={styles.currentLocationContainer}>
                        <span className={styles.locationLabel}>User</span>
                        <span className={styles.currentLocation}>{userDataQuery?.data?.route_url}</span>
                      </span>
                      <span className={styles.issueLab}>
                        <label className={styles.issueLabel}>Subject</label>
                        <input className={styles.issueInput}placeholder='Posted obscene content...' required/>
                      </span>
                      <span className={styles.issueLab}>
                        <label className={styles.issueLabel}>Infraction</label>
                        <textarea  className={styles.issueInput}placeholder='Describe the issue' required/>
                      </span>
                      <span className={styles.submitIssue}>Submit</span>
                    </form>
                </DialogContent>
            </Dialog>
        </span>
    );

}