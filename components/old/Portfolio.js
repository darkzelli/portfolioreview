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
    const {account, accountData} = useContext(userContext)
    const [user, setUser] = useState()
    const [userData, setUserData] = useState()

    let parsedData;
    useEffect(() => {
      if(account) setUser(JSON.parse(account?.value))
      if(accountData) parsedData = JSON.parse(accountData?.value)
      if(Array.isArray(parsedData)) setUserData(parsedData[0])
    }, [])


    async function handleUpdate(){
        let updateData = {};

        if(desc !== undefined) updateData.description = desc
        if(url !== undefined)  updateData.url = url
        if(portfolio !== undefined)updateData.portfolio.url = portfolio

        const { data: { user } } = await supabase.auth.getUser()
        updateData.id = user?.id

        const { data, error } = await supabase
            .from('accounts')
            .upsert(updateData)
        if(error) console.log(error)
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