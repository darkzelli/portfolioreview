"use client"
import styles from '../../css/portfolio.module.css'

import { useState } from 'react';

import { createClient } from "@/utils/supabase/client";
import { useQuery, useQueryClient, useMutation  } from '@tanstack/react-query';

import DescriptionIcon from '@mui/icons-material/Description';
import LinkIcon from '@mui/icons-material/Link';
import FolderIcon from '@mui/icons-material/Folder';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';


const supabase = createClient()

const getUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    const {data, error} = await supabase
        .from('accounts')
        .select()
        .eq('id', user?.id);
    return (await data[0] ?? null)
}


export default function Portfolio() {
    const [desc, setDesc] = useState()
    const [editMode, setEditMode] = useState(false)
    const [portfolio, setPortfolio] = useState()
    const [url, setUrl] = useState()
    const queryClient = useQueryClient()
    const userDataQuery = useQuery({queryKey: ['userdata'], queryFn: () => getUserData()})


    const mutation = useMutation({
        mutationFn: () => getUserData(),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['userdata']})
        }

    })

    async function handleUpdate(){
        let updateData = {};

        const allowedPattern = /[a-zA-Z1-9]+$/
        const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9.-]+)(:[0-9]{1,5})?(\/\S*)?$/

        if(allowedPattern.test(desc) && desc?.length <= 120) updateData.description = desc
        if(urlPattern.test(url)) updateData.route_url = url
        if(urlPattern.test(portfolio)) updateData.portfolio_url = portfolio

        const { data: { user } } = await supabase.auth.getUser()
        updateData.id = user?.id

        const { error } = await supabase
            .from('accounts')
            .upsert(updateData)
        if(!error) mutation.mutate()
    }
    return (
        <span className={styles.portfolio}>
            <span className={styles.mode} onClick={() => setEditMode(!editMode)}><span className={styles.modeIcon}>{editMode ? <EditIcon/> : <VisibilityIcon/>}</span>{ editMode ? "Edit Mode" : "View Mode"}</span>
            <span className={styles.label}><span className={styles.icon}><DescriptionIcon fontSize='inherit'/></span> <span>Description</span> </span>
            <span className={styles.textareaContainer}><textarea placeholder={userDataQuery?.data ? userDataQuery?.data?.description : ''} className={editMode ? styles.textarea : styles.disabledTextArea} disabled={!editMode}  onChange={(e) => setDesc(e.target.value)}/></span>
            <span className={styles.label}> <span className={styles.icon}><LinkIcon fontSize='inherit'/></span> <span>URL</span> </span>
            <span className={styles.inputareaContainer}><input disabled={!editMode} type='url' name='url' placeholder={userDataQuery?.data ? "portfolioreview.me/" + userDataQuery?.data?.route_url : ''} onChange={(e) => setUrl(e.target.value)} className={editMode ? styles.input : styles.disabledInput}/></span>
            <span className={styles.label}> <span className={styles.icon}><FolderIcon fontSize='inherit'/></span> <span>Portfolio</span> </span>
            <span className={styles.inputareaContainer}><input disabled={!editMode} type='url' name='portfolio' placeholder={userDataQuery?.data ? userDataQuery?.data?.portfolio_url : ''} onChange={(e) => setPortfolio(e.target.value)} className={editMode ? styles.input : styles.disabledInput}/></span>
            <span className={editMode ? styles.savechanges : styles.displayNone} onClick={() =>  handleUpdate()}>Save Changes</span>
        </span>
    );

 }