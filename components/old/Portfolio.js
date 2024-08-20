"use client"
import styles from '../../css/portfolio.module.css'

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { createClient } from "@/utils/supabase/client";
import { useQuery, useQueryClient, useMutation  } from '@tanstack/react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CirclePicker } from 'react-color'

import DescriptionIcon from '@mui/icons-material/Description';
import LinkIcon from '@mui/icons-material/Link';
import FolderIcon from '@mui/icons-material/Folder';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import NoteIcon from '@mui/icons-material/Note';



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
    const [desc, setDesc] = useState("")
    const [editMode, setEditMode] = useState(false)
    const [image, setImage] = useState()
    const [message, setMessage] = useState("")
    const [messagecolor, setMessageColor] = useState(null)
    const [preview, setPreview] = useState(null)
    const [previewName, setPreviewName] = useState("")
    const [portfolio, setPortfolio] = useState("")
    const [url, setUrl] = useState("")
    const queryClient = useQueryClient()
    const [userThumbnail, setUserThumbnail] = useState()
    const userDataQuery = useQuery({queryKey: ['userdata'], queryFn: () => getUserData()})
    const userQuery = useQuery({queryKey: ['user'], queryFn: () => getUser()})
    


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
        if(userDataQuery?.data?.thumbnail){
            const thumbnail = userDataQuery?.data?.thumbnail
            const removedUrl = thumbnail.split(userDataQuery?.data?.id?.toString())[1]
            const {data, error } = await supabase
                .storage
                .from('test')
                .remove([userQuery?.data?.id + removedUrl ]);
            if(!error && userQuery?.data?.id){
                const imageUpload = await supabase.storage.from('test').upload(userQuery?.data?.id + "/" + previewName , image, {
                })
                const { error } = await supabase
                    .from('accounts')
                    .upsert({id: userQuery?.data?.id, thumbnail: process.env.NEXT_PUBLIC_IMAGE_URL + userQuery?.data?.id + "/" + previewName});
                dataMutation.mutate()
                
            }
        }else{
            if(userQuery?.data?.id){
                console.log("started thumbnail addition")
                const imageUpload = await supabase.storage.from('test').upload(userQuery?.data?.id + "/" + previewName , image, {
                })
                const { error } = await supabase
                    .from('accounts')
                    .upsert({id: userQuery?.data?.id, thumbnail: process.env.NEXT_PUBLIC_IMAGE_URL + userQuery?.data?.id + "/" + previewName});
                dataMutation.mutate()
                
            }
        }
        
    }

    async function handleUpdate(){
        let updateData = {};
        if(image) imageUpdate()

        const allowedPattern = /^[a-zA-Z0-9 ]+$/
        const urlPattern = /^[a-zA-Z0-9_-]+$/
        const PortfolioPattern = /^(https?:\/\/)?([a-zA-Z0-9.-]+)(:[0-9]{1,5})?(\/\S*)?$/
        //des
        if(allowedPattern.test(desc) && desc?.length <= 120) updateData.description = desc
        else if(desc?.length === 0){}
        else toast("Description was not updated! Your new description must have no special characters and be under 120 characters", {type: 'error', theme: 'dark', hideProgressBar: true})
        //message
        if(allowedPattern.test(message) && message?.length <= 200) updateData.message = message
        else if(message?.length === 0){}
        else toast("Message was not updated! Your new description must have no special characters and be under 120 characters", { type: 'error', theme: 'dark', hideProgressBar: true})
        //color
        if(messagecolor) updateData.message_color = messagecolor
        else if(messagecolor === null){}
        else toast("Message Color was not updated! Your new description must have no special characters and be under 120 characters", {type: 'error', theme: 'dark', hideProgressBar: true})
        //url
        if(urlPattern?.test(url) && url?.length <= 25) updateData.route_url = url
        else if(url.length === 0){}
        else toast("URL was not updated! Your new url must be url encoded and be under 25 characters", {type: 'error', theme: 'dark', hideProgressBar: true})
        //portfolio_url
        if(PortfolioPattern?.test(portfolio)) updateData.portfolio_url = portfolio
        else if(portfolio.length === 0){}
        else toast("Portfolio was not updated! Invalid Website", { type: 'error', theme: 'dark', hideProgressBar: true})

        const { data: { user } } = await supabase.auth.getUser()
        updateData.id = user?.id

        const { error } = await supabase
            .from('accounts')
            .upsert(updateData)
        if(!error){
            toast("Portfolio Updated", {type: 'success', theme: 'dark', hideProgressBar: true})
            dataMutation.mutate()
            setEditMode(false)
        }else toast("Error updating Portfolio", {type: 'error', theme: 'dark', hideProgressBar: true})
    }

    useEffect(() => {
        setUserThumbnail(userDataQuery?.data?.thumbnail)
    }, [])
    if(userDataQuery?.data?.membership === "Free") return <span className={styles.noMembership}><span className={styles.becomeMember}>Become a Member</span><span>Click <b>"Upgrade"</b> in the profile tab to become a member and get started on your portfolio</span></span>
    return (
        <span className={styles.portfolio}>
            <span className={styles.mode} onClick={() => setEditMode(!editMode)}><span className={styles.modeIcon}>{editMode ? <EditIcon/> : <VisibilityIcon/>}</span>{ editMode ? "Edit Mode" : "View Mode"}</span>
            <span className={styles.label}> <span className={styles.icon}><SaveAltIcon fontSize='inherit'/></span> <span>Thumbnail</span> </span>
            { editMode ? <span  className={styles.thumbnail}> { preview ? <Image  alt='thumbnail.png' src={preview} width={512} height={288}/> : ""}<input onChange={(e) => {updatePreview(e.target.files[0]); setPreviewName(e.target.files[0]?.name)}} className={styles.inputfile} type='file'/></span> : <span className={styles.thumbnail_image}><Image  alt='thumbnail.png' src={userThumbnail ? userThumbnail : thumbnail} width={512} height={288}/></span> }
            <span className={styles.label}><span className={styles.icon}><DescriptionIcon fontSize='inherit'/></span> <span>Description</span> </span>
            <span className={styles.textareaContainer}><textarea placeholder={userDataQuery?.data ? userDataQuery?.data?.description : ''} className={editMode ? styles.textarea : styles.disabledTextArea} disabled={!editMode}  onChange={(e) => setDesc(e.target.value)}/></span>
            <span className={styles.label}> <span className={styles.icon}><NoteIcon fontSize='inherit'/></span> <span>Message</span> </span>
            <span className={ editMode ? styles.colopickerContainer : styles.displayNone}>
                <span className={styles.colorpicker}><CirclePicker onChangeComplete={(e) => setMessageColor(e.hex)}/></span>
            </span>
            <span className={styles.textareaContainer}><textarea placeholder={userDataQuery?.data ? userDataQuery?.data?.message : ''} className={editMode ? styles.textarea : styles.disabledTextArea} disabled={!editMode}  onChange={(e) => setMessage(e.target.value)}/></span>
            <span className={styles.label}> <span className={styles.icon}><LinkIcon fontSize='inherit'/></span> <span>URL</span> </span>
            <span className={editMode ? styles.urlinputcontainer : styles.diabledurlinputcontainer}>
                <span className={styles.origiurl}>portfolioreview.me/</span>
                <input disabled={!editMode} type='url' name='url' placeholder={userDataQuery?.data ? userDataQuery?.data?.route_url : ''} onChange={(e) => setUrl(e.target.value)} className={styles.urlinput}/></span>
            <span className={styles.label}> <span className={styles.icon}><FolderIcon fontSize='inherit'/></span> <span>Portfolio</span> </span>
            <span className={styles.inputareaContainer}><input disabled={!editMode} type='url' name='portfolio' placeholder={userDataQuery?.data ? userDataQuery?.data?.portfolio_url : ''} onChange={(e) => setPortfolio(e.target.value)} className={editMode ? styles.input : styles.disabledInput}/></span>
            <span className={editMode ? styles.savechanges : styles.displayNone} onClick={() =>  handleUpdate()}>Save Changes</span>
            <ToastContainer stacked/>
        </span>
    )

 }