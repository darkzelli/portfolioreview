"use client"
import styles from '../../css/profile.module.css'
import PersonIcon from '@mui/icons-material/Person';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EmailIcon from '@mui/icons-material/Email';

import { useState, useContext, useEffect } from 'react';


import { createClient } from "@/utils/supabase/client";

import { userContext } from '../UseUser';


import Link from 'next/link';

export default function Profile() {
    const {account, accountData} = useContext(userContext)
    const [user, setUser] = useState()
    const [userData, setUserData] = useState()


    const [editMode, setEditMode] = useState(false)
    const [username, setUserName] = useState()
    const [userRole, setUserRole] = useState()

    const [test, settest] = useState()
    const supabase = createClient()

    let parsedData;
    useEffect(() => {
      if(account) setUser(JSON.parse(account?.value))
      if(accountData) parsedData = JSON.parse(accountData?.value)
      if(Array.isArray(parsedData)) setUserData(parsedData[0])
    }, [])

    

    function checkInput(value){
        const allowedPattern = /^[a-zA-Z0-9\S]*$/;
        return allowedPattern.test(value)
    }

    async function handleUpdate(){
        let updateData = {};
        
        if(username !== undefined && checkInput(username)){ 
            updateData.name = username
        }

        if(checkInput(userRole)){
            updateData.role = userRole
        }
        const { data: { user } } = await supabase.auth.getUser()
        updateData.id = user?.id
        const { data, error } = await supabase
            .from('accounts')
            .upsert(updateData)
        if(error) console.log(error)
        
    }

    const roleView = <><span className={userData?.role === "Developer" ? styles.selectedCard : styles.card }>Developer</span><span className={userData?.role === "Designer" ? styles.selectedCard : styles.card }>Designer</span><span className={userData?.role === "Artist" ? styles.selectedCard : styles.card }>Artist</span></>
    const roleEdit = <><span onClick={() => setUserRole("Developer")}className={userRole === "Developer" ? styles.selectedCard : styles.card }>Developer</span><span onClick={() => setUserRole("Designer")} className={userRole === "Designer" ? styles.selectedCard : styles.card }>Designer</span><span onClick={() => setUserRole("Artist")} className={userRole === "Artist" ? styles.selectedCard : styles.card }>Artist</span></>
    return (
        <span className={styles.profile}>
            <span className={styles.mode} onClick={() => setEditMode(!editMode)}><span className={styles.modeIcon}>{editMode ? <EditIcon/> : <VisibilityIcon/>}</span>{ editMode ? "Edit Mode" : "View Mode"}</span>
            <span className={styles.label}> <span className={styles.icon}><PersonIcon fontSize='inherit'/></span> <span>Name</span> </span>
            <span className={styles.inputareaContainer}><input type='text' name='name' placeholder={user ? userData?.name : 'name'} disabled={!editMode} onChange={(e) => setUserName(e.target.value)}className={editMode ? styles.input : styles.disabledInput}/></span>
            <span className={styles.label}> <span className={styles.icon}><EmailIcon fontSize='inherit'/></span> <span>Email</span> </span>
            <span className={styles.inputareaContainer}><span className={styles.disabledInput}>{editMode ? "Your email can not be changed" : user?.email}</span></span>
            <span className={styles.label}> <span className={styles.icon}><MilitaryTechIcon fontSize='inherit'/></span> <span>Membership</span> </span>
            <span className={styles.cardContainer}><span className={styles.membershipCard}>{userData?.membership ? userData?.membership : "FREE"}</span>{(userData?.membership === "Member" || userData?.membership === "Staff") ?  "" :  <Link href="/membership">Upgrade</Link>}</span>
            <span className={styles.label}> <span className={styles.icon}><WaterDropIcon fontSize='inherit'/></span> <span>Role</span> </span>
            <span className={styles.cardContainer}>{editMode ? roleEdit : roleView}</span>
            <span className={editMode ? styles.savechanges : styles.displayNone} onClick={() =>  handleUpdate()}>Save Changes</span>
        </span>
    );

 }