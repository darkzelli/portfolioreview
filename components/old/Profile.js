"use client"
import styles from '../../css/profile.module.css'

import { useEffect, useState} from 'react';

import Link from 'next/link';

import { createClient } from "@/utils/supabase/client";
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { ToastContainer, toast, useToast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



import PersonIcon from '@mui/icons-material/Person';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';
import Groups3Icon from '@mui/icons-material/Groups3';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SailingIcon from '@mui/icons-material/Sailing';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose} from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
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
    const [username, setUserName] = useState("")
    const [userRole, setUserRole] = useState()
    const [socials, setSocials] = useState([])
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

        if(allowedPattern.test(username) && username?.length <= 15) updateData.name = username
        else if(username.length === 0){}
        else toast("Name was not updated! Your new name must have no special characters and be under 15 characters", {type: 'error', theme: 'dark', hideProgressBar: true})
        
        if(socials?.length > 0){
            updateData.socials = socials
        }

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

    function handleSocialAdd(){
        if(socials?.some(e => e.url === currentlyBeingAddedSocail)){
        }else if(socials?.some(e => e.social === whichSocial)){
            const index = socials?.findIndex(e => e.social  === whichSocial)
            socials[index] = {social: whichSocial, url: currentlyBeingAddedSocail}
        } else{
            if(socials?.length >= 2){
                socials[0] = {social: whichSocial, url: currentlyBeingAddedSocail}
            }else{
                socials?.push({social: whichSocial, url: currentlyBeingAddedSocail})
            }
        }
        setDialogSocialStatus(false)
    }
        

    const roleView = <><span className={userDataQuery?.data?.role === "Developer" ? styles.selectedCard : styles.card }>Developer</span><span className={userDataQuery?.data?.role === "Designer" ? styles.selectedCard : styles.card }>Designer</span><span className={userDataQuery?.data?.role === "Artist" ? styles.selectedCard : styles.card }>Artist</span></>
    const roleEdit = <><span onClick={() => setUserRole("Developer")}className={userRole === "Developer" ? styles.selectedCard : styles.card }>Developer</span><span onClick={() => setUserRole("Designer")} className={userRole === "Designer" ? styles.selectedCard : styles.card }>Designer</span><span onClick={() => setUserRole("Artist")} className={userRole === "Artist" ? styles.selectedCard : styles.card }>Artist</span></>
    
    

    const twitterEdit =  <Popover><PopoverTrigger><span className={socials?.some(e => e.social === "Twitter") ? styles.socialIconSelected : styles.socialIcon}><XIcon fontSize='inherit'/></span></PopoverTrigger><PopoverContent><span className={styles.popoverSocials}><span>Editing Twitter</span><span className={styles.popoverInputContainer}><input className={styles.popoverInput} placeholder='twitter.com/'/></span><span className={styles.popoverSet}>Set Active</span></span></PopoverContent></Popover>
    const githubEdit =  <Popover><PopoverTrigger><span className={socials?.some(e => e.social === "Github") ? styles.socialIconSelected : styles.socialIcon} ><GitHubIcon fontSize='inherit'/></span></PopoverTrigger><PopoverContent><span className={styles.popoverSocials}><span>Editing Github</span><span className={styles.popoverInputContainer}><input className={styles.popoverInput} placeholder='github.com/'/></span><span className={styles.popoverSet}>Set Active</span></span></PopoverContent></Popover>
    const facebookEdit = <Popover><PopoverTrigger><span className={socials?.some(e => e.social === "Facebook") ? styles.socialIconSelected : styles.socialIcon} ><FacebookIcon fontSize='inherit'/></span></PopoverTrigger><PopoverContent><span className={styles.popoverSocials}><span>Editing Facebook</span><span className={styles.popoverInputContainer}><input className={styles.popoverInput} placeholder='facebook.com/'/></span><span className={styles.popoverSet}>Set Active</span></span></PopoverContent></Popover>
    const linkedinEdit = <Popover><PopoverTrigger><span className={socials?.some(e => e.social === "Linkedin") ? styles.socialIconSelected : styles.socialIcon} ><LinkedInIcon fontSize='inherit'/></span></PopoverTrigger><PopoverContent><span className={styles.popoverSocials}><span>Editing LinkedIn</span><span className={styles.popoverInputContainer}><input className={styles.popoverInput} placeholder='linkedin.com/'/></span><span className={styles.popoverSet}>Set Active</span></span></PopoverContent></Popover>
    const youtubeEdit = <Popover><PopoverTrigger><span className={socials?.some(e => e.social === "Youtube") ? styles.socialIconSelected : styles.socialIcon} ><YouTubeIcon fontSize='inherit'/></span></PopoverTrigger><PopoverContent><span className={styles.popoverSocials}><span>Editing Youtube</span><span className={styles.popoverInputContainer}><input className={styles.popoverInput} placeholder='youtube.com/'/></span><span className={styles.popoverSet}>Set Active</span></span></PopoverContent></Popover>
    const instagramEdit = <Popover><PopoverTrigger><span className={socials?.some(e => e.social === "Instagram") ? styles.socialIconSelected : styles.socialIcon} ><InstagramIcon fontSize='inherit'/></span></PopoverTrigger><PopoverContent><span className={styles.popoverSocials}><span>Editing Instagram</span><span className={styles.popoverInputContainer}><input className={styles.popoverInput} placeholder='instagram.com/'/></span><span className={styles.popoverSet}>Set Active</span></span></PopoverContent></Popover>
    const artsationEdit = <Popover><PopoverTrigger><span className={socials?.some(e => e.social === "Artstation") ? styles.socialIconSelected : styles.socialIcon} ><SailingIcon fontSize='inherit'/></span></PopoverTrigger><PopoverContent><span className={styles.popoverSocials}><span>Editing ArtStation</span><span className={styles.popoverInputContainer}><input className={styles.popoverInput} placeholder='artstation.com/'/></span><span className={styles.popoverSet}>Set Active</span></span></PopoverContent></Popover>


    const twitterView =  <span className={userDataQuery?.data?.socials?.some((e) => e.social === "Twitter") ? styles.socialIconSelected : styles.disabledsocialIcon} ><XIcon fontSize='inherit'/></span>
    const githubView =  <span className={userDataQuery?.data?.socials?.some((e) => e.social === "Github") ? styles.socialIconSelected : styles.disabledsocialIcon} ><GitHubIcon fontSize='inherit'/></span>
    const facebookView = <span className={userDataQuery?.data?.socials?.some((e) => e.social === "Facebook") ? styles.socialIconSelected : styles.disabledsocialIcon} ><FacebookIcon fontSize='inherit'/></span>
    const linkedinView = <span className={userDataQuery?.data?.socials?.some((e) => e.social === "Linkedin") ? styles.socialIconSelected : styles.disabledsocialIcon} ><LinkedInIcon fontSize='inherit'/></span>
    const youtubeView = <span className={userDataQuery?.data?.socials?.some((e) => e.social === "Youtube") ? styles.socialIconSelected : styles.disabledsocialIcon} ><YouTubeIcon fontSize='inherit'/></span>
    const instagramView = <span className={userDataQuery?.data?.socials?.some((e) => e.social === "Instagram") ? styles.socialIconSelected : styles.disabledsocialIcon} ><InstagramIcon fontSize='inherit'/></span>
    const artsationView = <span className={userDataQuery?.data?.socials?.some((e) => e.social === "Artstation") ? styles.socialIconSelected : styles.disabledsocialIcon} ><SailingIcon fontSize='inherit'/></span>

    return (
        <span className={styles.profile}>
            <span className={styles.mode} onClick={() => setEditMode(!editMode)}><span className={styles.modeIcon}>{editMode ? <EditIcon/> : <VisibilityIcon/>}</span>{ editMode ? "Edit Mode" : "View Mode"}</span>
            <span className={styles.label}> <span className={styles.icon}><PersonIcon fontSize='inherit'/></span> <span>Name</span><span className={editMode ? (username?.length <= 15 ? styles.nameCount : styles.nameCountRed) : styles.displayNone}>{username?.length ?? 0}/15</span> </span>
            <span className={styles.inputareaContainer}><input type='text' name='name' placeholder={userQuery?.data ? userDataQuery?.data?.name : 'name'} disabled={!editMode} onChange={(e) => setUserName(e.target.value)}className={editMode ? styles.input : styles.disabledInput}/></span>
            <span className={styles.label}> <span className={styles.icon}><EmailIcon fontSize='inherit'/></span> <span>Email</span> </span>
            <span className={styles.inputareaContainer}><span className={styles.disabledInput}>{editMode ? "Your email can not be changed" : userQuery?.data?.email}</span></span>
            <span className={styles.label}> <span className={styles.icon}><MilitaryTechIcon fontSize='inherit'/></span> <span>Membership</span> </span>
            <span className={styles.cardContainer}><span className={styles.membershipCard}>{userDataQuery?.data?.membership ? userDataQuery?.data?.membership : "FREE"}</span>{(userDataQuery?.data?.membership === "Member" || userDataQuery?.data?.membership === "Staff") ?  "" :  <span onClick={() => setDialogPaymentStatus(true)}>Upgrade</span>}</span>
            <span className={styles.label}> <span className={styles.icon}><WaterDropIcon fontSize='inherit'/></span> <span>Role</span> </span>
            <span className={styles.cardContainer}>{editMode ? roleEdit : roleView}</span>
            <span className={styles.label}> <span className={styles.icon}><Groups3Icon fontSize='inherit'/></span> <span>Socials</span> </span>
            <span className={styles.socials}>
                {editMode ? twitterEdit : twitterView}
                {editMode ? githubEdit : githubView}
                {editMode ? facebookEdit : facebookView}
                {editMode ? linkedinEdit : linkedinView}
                {editMode ? youtubeEdit : youtubeView}
                {editMode ? instagramEdit : instagramView}
                {editMode ? artsationEdit : artsationView}

            </span>
            <span className={editMode ? styles.savechanges : styles.displayNone} onClick={() =>  handleUpdate()}>Save Changes</span>
            <Dialog  open={dialogSocialStatus} onOpenChange={setDialogSocialStatus} >
                <DialogContent>
                    <DialogHeader>
                        <span className={styles.dialogTitle}><DialogTitle>Editing {whichSocial}</DialogTitle></span>
                    </DialogHeader>
                    <input type='text' placeholder={whichSocial + ".com/"} onChange={(e) => setCurrentlyBeingAddedSocail(e.target.value)}/>
                    <span className={styles.addSocial} onClick={() => handleSocialAdd()}>Add {whichSocial}</span>
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