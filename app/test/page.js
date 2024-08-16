"use client"
import styles from '../../css/notfound..module.css'
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { PersistedClient, Persister } from '@tanstack/react-query-persist-client'
  

import Link from 'next/link'

const supabase = createClient()
const getUserData = async () => {
    const {data, error} = await supabase
        .from('accounts')
        .select();
  
    return (await data[0] ?? null)
}

const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return await user
}


export default function Test() {
    const [name, setname] = useState();
    const router = useRouter()

    const queryClient = useQueryClient()

    const userQuery = useQuery({queryKey: ['user'], queryFn: () => getUser()})
    const { data, isLoading, isError, isFetching} = useQuery({queryKey: ['userdata'], queryFn: () => getUserData()})
    console.log({isLoading, isFetching})  
    const mutation = useMutation({
        mutationFn: () => getData(),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['userdata']})
        }

    })

    if(isLoading) return <div>loading...</div>
    if(isFetching)
    if(isError || !data) return <div>Error</div>

    const handleupdate = async() => {
        const { data: { user } } = await supabase.auth.getUser()
        const { data, error } = await supabase
            .from('accounts')
            .upsert({id: user?.id, name: name});
    }

    async function signIn(){
        const emailr = "thereezen24@gmail.com"
        const passwordr = "rrrrrrr"
        return new Promise(async(resolve, reject) => {
            const { error } = await supabase?.auth.signInWithPassword({
                email: emailr,
                password: passwordr,
            })
    
            if(error){
                console.log(error)
                reject("error 400, couldn't login")
            }
            console.log("INvalidinting after signin")
            queryClient.invalidateQueries({queryKey: ['user']})
            queryClient.invalidateQueries({queryKey: ['userdata']})
            resolve("accepted 200")
        })
    }

    const signout = async() => {
        console.log("Signing out")
        const { error } = await supabase.auth.signOut()
        if(!error){
            console.log("Invaliding out")
            queryClient.invalidateQueries({queryKey: ['user']})
            queryClient.invalidateQueries({queryKey: ['userdata']})
        }
    }

    async function deleteImage(){
        const {data, error } = await supabase
                .storage
                .from('test')
                .remove([userQuery?.data?.id + '/thumbnail'])
        if(error) console.log(error)
    }
    
    return (
        <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <span><Link href="/test">test</Link><Link href="/test2">test2</Link></span>
            <span>user? {userQuery?.data ? "true" : "false"}</span>
            <span><b>id:  </b>{data?.id}</span>
            <span><b>name:  </b>{data?.name}</span>
            <span><b>desc:  </b>{data?.description}</span>
            <span><b>route:  </b>{data?.route_url}</span>
            <span><b>role:  </b>{data?.role}</span>
            <span><b>membership:  </b>{data?.membership}</span>
            <span><b>url:  </b>{data?.portfolio_url}</span>
            <span><b>can_post:  </b>{data?.can_post?.toString()}</span>
            <span><b>can_comment:  </b>{data?.can_comment?.toString()}</span>
            <span><b>can_like:  </b>{data?.can_like?.toString()}</span>
            <input type="text" placeholder="name" onChange={(e) => setname(e.target.value)}/>
            <span>|</span>
            <button  onClick={handleupdate}>Submit</button>
            <span>|</span>
            <button  onClick={() => mutation.mutate()}>Mutate</button>
            <span>|</span>
            <button onClick={() => signIn().then((res) => console.log("Successful Login", res)).catch((err) => console.log("error logging in", err))}>Sign in</button>
            <span>|</span>
            <button onClick={() => signout()}>Signout</button>
            {mutation.isPending ? "changing name...": ""}
            <button onClick={() => deleteImage()}>Delete image</button>
        </span>
    );

 }