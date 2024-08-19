"use client"
import styles from '../../css/profile.module.css'

import { useState} from 'react';

import Link from 'next/link';

import { createClient } from "@/utils/supabase/client";
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { ToastContainer, toast, useToast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import PersonIcon from '@mui/icons-material/Person';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import Groups3Icon from '@mui/icons-material/Groups3';

import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SailingIcon from '@mui/icons-material/Sailing';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose} from '@/components/ui/dialog';

import Membership from '@/components/old/Membership';





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

export default function Profile() {
    const [currentlyBeingAddedSocail, setCurrentlyBeingAddedSocail] = useState(null)
    const [dialogPaymentStatus, setDialogPaymentStatus] = useState(false)
    const [dialogSocialStatus, setDialogSocialStatus] = useState(false)
    const [whichSocial, setWhichSocial] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const [username, setUserName] = useState()
    const [userRole, setUserRole] = useState()
    const [social, setSocial] = useState([])
    const queryClient = useQueryClient()
    const userQuery = useQuery({queryKey: ['user'], queryFn: () => getUser()})
    const userDataQuery = useQuery({queryKey: ['userdata'], queryFn: () => getUserData()})

    

    const mutation = useMutation({
        mutationFn: () => getUserData(),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['userdata']})
        }

    })

    async function handleUpdate(){
        let updateData = {};

        const allowedPattern = /^[a-zA-Z0-9]+$/;

        if(allowedPattern.test(username) && username.length <= 15) updateData.name = username
        else toast("Name was not updated! Your new name must have no special characters and be under 15 characters", {type: 'error', theme: 'dark', hideProgressBar: true})
        

        if(allowedPattern.test(userRole)) updateData.role = userRole

        const { data: { user } } = await supabase.auth.getUser()
        updateData.id = user?.id
        const { error } = await supabase
            .from('accounts')
            .upsert(updateData)
        if(!error){
            toast("Profile Updated", {type: 'success', theme: 'dark', hideProgressBar: true})
            mutation.mutate()
            setEditMode(false)
        }else toast("Error updating Portfolio", {type: 'error', theme: 'dark', hideProgressBar: true})
        
    }

    function editSocial(social){
        setDialogSocialStatus(true)
        setWhichSocial(social)
    }

    const roleView = <><span className={userDataQuery?.data?.role === "Developer" ? styles.selectedCard : styles.card }>Developer</span><span className={userDataQuery?.data?.role === "Designer" ? styles.selectedCard : styles.card }>Designer</span><span className={userDataQuery?.data?.role === "Artist" ? styles.selectedCard : styles.card }>Artist</span></>
    const roleEdit = <><span onClick={() => setUserRole("Developer")}className={userRole === "Developer" ? styles.selectedCard : styles.card }>Developer</span><span onClick={() => setUserRole("Designer")} className={userRole === "Designer" ? styles.selectedCard : styles.card }>Designer</span><span onClick={() => setUserRole("Artist")} className={userRole === "Artist" ? styles.selectedCard : styles.card }>Artist</span></>
    return (
        <span className={styles.profile}>
            <span className={styles.mode} onClick={() => setEditMode(!editMode)}><span className={styles.modeIcon}>{editMode ? <EditIcon/> : <VisibilityIcon/>}</span>{ editMode ? "Edit Mode" : "View Mode"}</span>
            <span className={styles.label}> <span className={styles.icon}><PersonIcon fontSize='inherit'/></span> <span>Name</span> </span>
            <span className={styles.inputareaContainer}><input type='text' name='name' placeholder={userQuery?.data ? userDataQuery?.data?.name : 'name'} disabled={!editMode} onChange={(e) => setUserName(e.target.value)}className={editMode ? styles.input : styles.disabledInput}/></span>
            <span className={styles.label}> <span className={styles.icon}><EmailIcon fontSize='inherit'/></span> <span>Email</span> </span>
            <span className={styles.inputareaContainer}><span className={styles.disabledInput}>{editMode ? "Your email can not be changed" : userQuery?.data?.email}</span></span>
            <span className={styles.label}> <span className={styles.icon}><MilitaryTechIcon fontSize='inherit'/></span> <span>Membership</span> </span>
            <span className={styles.cardContainer}><span className={styles.membershipCard}>{userDataQuery?.data?.membership ? userDataQuery?.data?.membership : "FREE"}</span>{(userDataQuery?.data?.membership === "Member" || userDataQuery?.data?.membership === "Staff") ?  "" :  <span onClick={() => setDialogPaymentStatus(true)}>Upgrade</span>}</span>
            <span className={styles.label}> <span className={styles.icon}><WaterDropIcon fontSize='inherit'/></span> <span>Role</span> </span>
            <span className={styles.cardContainer}>{editMode ? roleEdit : roleView}</span>
            <span className={styles.label}> <span className={styles.icon}><Groups3Icon fontSize='inherit'/></span> <span>Socials</span> </span>
            <span className={styles.socials}>
                <span className={editMode ? styles.socialIcon : styles.disabledsocialIcon} onClick={() => editSocial("X")}><XIcon fontSize='inherit'/></span>
                <span className={editMode ? styles.socialIcon : styles.disabledsocialIcon} onClick={() => editSocial("Github")}><GitHubIcon fontSize='inherit'/></span>
                <span className={editMode ? styles.socialIcon : styles.disabledsocialIcon} onClick={() => editSocial("Facebook")}><FacebookIcon fontSize='inherit'/></span>
                <span className={editMode ? styles.socialIcon : styles.disabledsocialIcon} onClick={() => editSocial("Linkedin")}><LinkedInIcon fontSize='inherit'/></span>
                <span className={editMode ? styles.socialIcon : styles.disabledsocialIcon} onClick={() => editSocial("Youtube")}><YouTubeIcon fontSize='inherit'/></span>
                <span className={editMode ? styles.socialIcon : styles.disabledsocialIcon} onClick={() => editSocial("Instagram")}><InstagramIcon fontSize='inherit'/></span>
                <span className={editMode ? styles.socialIcon : styles.disabledsocialIcon} onClick={() => editSocial("Artstation")}><SailingIcon fontSize='inherit'/></span>
            </span>
            <span className={editMode ? styles.savechanges : styles.displayNone} onClick={() =>  handleUpdate()}>Save Changes</span>
            <Dialog  open={dialogSocialStatus} onOpenChange={setDialogSocialStatus} >
                <DialogContent>
                    <DialogHeader>
                        <span className={styles.dialogTitle}><DialogTitle>Editing {whichSocial}</DialogTitle></span>
                    </DialogHeader>
                    <input type='text' placeholder={whichSocial + ".com/"} onChange={()}/>
                    <span className={styles.addSocial} onClick={() => }>Add {whichSocial}</span>
                </DialogContent>
            </Dialog>
            <Dialog  open={dialogPaymentStatus} onOpenChange={setDialogPaymentStatus} >
                <DialogContent>
                    <DialogHeader>
                        <span className={styles.dialogTitle}><DialogTitle>Portfolio Review Membership</DialogTitle></span>
                    </DialogHeader>
                    <span className={styles.StripeMembership}>
                        <Membership/>
                    </span>
                </DialogContent>
            </Dialog>
            <ToastContainer/>
        </span>
    );

 }