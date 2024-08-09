"use client"
import styles from '../../css/portfolio.module.css'

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { createClient } from "@/utils/supabase/client";
import { useQuery, useQueryClient, useMutation  } from '@tanstack/react-query';

import DescriptionIcon from '@mui/icons-material/Description';
import LinkIcon from '@mui/icons-material/Link';
import FolderIcon from '@mui/icons-material/Folder';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import thumbnail from '../../default_thumbnail.png'

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


export default function Portfolio() {
    const filereader = new FileReader()
    const [desc, setDesc] = useState()
    const [editMode, setEditMode] = useState(false)
    const [image, setImage] = useState()
    const [preview, setPreview] = useState(null)
    const [portfolio, setPortfolio] = useState()
    const [url, setUrl] = useState()
    const queryClient = useQueryClient()
    const userDataQuery = useQuery({queryKey: ['userdata'], queryFn: () => getUserData()})
    const userQuery = useQuery({queryKey: ['user'], queryFn: () => getUser()})
    const userQueryThumbnail = useQuery({queryKey: ['thumbnail'], queryFn: () => getThumbnail()})


    const getThumbnail = async () => {
        if(userQuery?.data?.id){
            const { data } = supabase.storage.from('test').getPublicUrl(userQuery?.data?.id + '/thumbnail')
            return (data?.publicUrl ?? null)
        }else return null
    }
    
    const thumbnailMutation = useMutation({
        mutationFn: () => getThumbnail(),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['thumbnail']})
        }
    })

    const dataMutation = useMutation({
        mutationFn: () => getUserData(),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['userdata']})
        }

    })
    
    function updatePreview(e){
        setImage(e)
        filereader.readAsDataURL(e)
    }

    filereader.addEventListener('load', () => {
        setPreview(filereader.result)
    })

    async function imageUpdate(){
        //for instant updating image on page no cache
        const randomindex =  Math.floor(Math.random()*100)
        if(userQuery?.data?.id){
            const imageUpload = await supabase.storage.from('test').upload(userQuery?.data?.id + '/thumbnail' + `?ri=${randomindex}` , image, {
                upsert: true
            })
            if(!imageUpload.error) thumbnailMutation.mutate()
        }    
    }

    async function testonclick(){
        const {data, error } = await supabase.storage.from('test').list(userQuery?.data?.id)
        if(data)console.log({data})
        if(error)console.log({error})
    }

    async function handleUpdate(){
        let updateData = {};
        imageUpdate()

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
        if(!error){
            dataMutation.mutate()
            setEditMode(false)
        }
    }
    return (
        <span className={styles.portfolio}>
            <span className={styles.mode} onClick={() => setEditMode(!editMode)}><span className={styles.modeIcon}>{editMode ? <EditIcon/> : <VisibilityIcon/>}</span>{ editMode ? "Edit Mode" : "View Mode"}</span>
            <span className={styles.label}> <span className={styles.icon}><SaveAltIcon fontSize='inherit'/></span> <span>Thumbnail</span> </span>
            { editMode ? <span  className={styles.thumbnail}> { preview ? <Image  alt='thumbnail.png' src={preview} width={512} height={288}/> : ""}<input onChange={(e) => updatePreview(e.target.files[0])} className={styles.inputfile} type='file'/></span> : <span className={styles.thumbnail_image}><Image  alt='thumbnail.png' src={userQueryThumbnail?.data ? userQueryThumbnail?.data : thumbnail} width={512} height={288}/></span> }
            <span className={styles.label}><span className={styles.icon}><DescriptionIcon fontSize='inherit'/></span> <span>Description</span> </span>
            <span className={styles.textareaContainer}><textarea placeholder={userDataQuery?.data ? userDataQuery?.data?.description : ''} className={editMode ? styles.textarea : styles.disabledTextArea} disabled={!editMode}  onChange={(e) => setDesc(e.target.value)}/></span>
            <span className={styles.label}> <span className={styles.icon}><LinkIcon fontSize='inherit'/></span> <span>URL</span> </span>
            <span className={styles.inputareaContainer}><input disabled={!editMode} type='url' name='url' placeholder={userDataQuery?.data ? "portfolioreview.me/" + userDataQuery?.data?.route_url : ''} onChange={(e) => setUrl(e.target.value)} className={editMode ? styles.input : styles.disabledInput}/></span>
            <span className={styles.label}> <span className={styles.icon}><FolderIcon fontSize='inherit'/></span> <span>Portfolio</span> </span>
            <span className={styles.inputareaContainer}><input disabled={!editMode} type='url' name='portfolio' placeholder={userDataQuery?.data ? userDataQuery?.data?.portfolio_url : ''} onChange={(e) => setPortfolio(e.target.value)} className={editMode ? styles.input : styles.disabledInput}/></span>
            <span className={editMode ? styles.savechanges : styles.displayNone} onClick={() =>  handleUpdate()}>Save Changes</span>
            <button onClick={() => testonclick()}>Tester</button>
        </span>
    )

 }