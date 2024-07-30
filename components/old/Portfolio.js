"use client"
import styles from '../../css/portfolio.module.css'

import DescriptionIcon from '@mui/icons-material/Description';
import LinkIcon from '@mui/icons-material/Link';
import FolderIcon from '@mui/icons-material/Folder';
import ImageIcon from '@mui/icons-material/Image';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { createClient } from "@/utils/supabase/client";


import { useEffect, useState, useContext } from 'react';

import { userContext } from '../UseUser';


import { unstable_cache } from 'next/cache';



export default function Portfolio() {
    
    const supabase = createClient()

    const [desc, setDesc] = useState()
    const [url, setUrl] = useState()
    const [portfolio, setPortfolio] = useState()
    const [editMode, setEditMode] = useState(false)
    const {user, setUser, userData, setUserData }  = useContext(userContext)

    useEffect(() => {
        
    }, [user])

    /*const getUserData = unstable_cache(
        async () => {
          return await supabase?.from('accounts').select()
        }, 
        ['userdata'],
        {
          tags: ['userdata']
        }
      )

    async function callUserData(){
        const data = await getUserData(); 
        setUserData(data)
    }
    let updateData = {
       
    };*/
    
    async function updateSessionData(){
        
    }

    async function handleUpdate(){
        
        if(desc !== undefined){ 
            updateData.description = desc
        }
        
        if(url !== undefined) {
            updateData.url = url
        }

        if(portfolio !== undefined) {
            updateData.portfolio.url = portfolio
        }


        const token = await getCsrfToken()
        fetch(process.env.NEXT_PUBLIC_NEXT_URL + "api/protected/user/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-request-token": token
            },
            body: JSON.stringify(updateData)
        }).then((res) => {
            if(res.status === 200){
                updateSessionData()
            }
        }).catch((err) => {})
    }
    return (
        <span className={styles.portfolio}>
            <span className={styles.mode} onClick={() => setEditMode(!editMode)}><span className={styles.modeIcon}>{editMode ? <EditIcon/> : <VisibilityIcon/>}</span>{ editMode ? "Edit Mode" : "View Mode"}</span>
            <span className={styles.label}><span className={styles.icon}><DescriptionIcon fontSize='inherit'/></span> <span>Description</span> </span>
            <span className={styles.textareaContainer}><textarea placeholder={user ? userData?.description : ''} className={editMode ? styles.textarea : styles.disabledTextArea} disabled={!editMode}  onChange={(e) => setDesc(e.target.value)}/></span>
            <span className={styles.label}> <span className={styles.icon}><LinkIcon fontSize='inherit'/></span> <span>URL</span> </span>
            <span className={styles.inputareaContainer}><input disabled={!editMode} type='url' name='url' placeholder={user ? userData?.route_url : ''} onChange={(e) => setUrl(e.target.value)} className={editMode ? styles.input : styles.disabledInput}/></span>
            <span className={styles.label}> <span className={styles.icon}><FolderIcon fontSize='inherit'/></span> <span>Portfolio</span> </span>
            <span className={styles.inputareaContainer}><input disabled={!editMode} type='url' name='portfolio' placeholder={user ? userData?.portfolio_url : ''} onChange={(e) => setPortfolio(e.target.value)} className={editMode ? styles.input : styles.disabledInput}/></span>
            <span className={editMode ? styles.savechanges : styles.displayNone} onClick={() =>  handleUpdate()}>Save Changes</span>
        </span>
    );

 }