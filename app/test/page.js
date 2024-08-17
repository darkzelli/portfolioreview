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


export default function Test() {
    const [name, setname] = useState();
    const router = useRouter()

    const queryClient = useQueryClient()

    const userQuery = useQuery({queryKey: ['user'], queryFn: () => getUser()})
    const userDataQuery = useQuery({queryKey: ['userdata'], queryFn: () => getUserData()})
    const mutation = useMutation({
        mutationFn: () => getData(),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['userdata']})
        }

    })



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

    async function listofAll(){
        const bucket = await supabase
            .storage
            .from('test')
            .list(`${userDataQuery?.data?.id?.toString()}`, {
              limit: 100,
              offset: 0,
              sortBy: { column: 'name', order: 'asc' },
            })
            console.log(userDataQuery?.data?.id?.toString())
        console.log(bucket?.data)
        console.log(bucket?.error)
    }
    
    return (
        <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <span><Link href="/test">test</Link><Link href="/test2">test2</Link></span>
            <span>user? {userQuery?.data ? "true" : "false"}</span>
            <span><b>id:  </b>{userDataQuery?.data?.id}</span>
            <span><b>name:  </b>{userDataQuery?.data?.name}</span>
            <span><b>desc:  </b>{userDataQuery?.data?.description}</span>
            <span><b>route:  </b>{userDataQuery?.data?.route_url}</span>
            <span><b>role:  </b>{userDataQuery?.data?.role}</span>
            <span><b>membership:  </b>{userDataQuery?.data?.membership}</span>
            <span><b>url:  </b>{userDataQuery?.data?.portfolio_url}</span>
            <span><b>can_post:  </b>{userDataQuery?.data?.can_post?.toString()}</span>
            <span><b>can_comment:  </b>{userDataQuery?.data?.can_comment?.toString()}</span>
            <span><b>can_like:  </b>{userDataQuery?.data?.can_like?.toString()}</span>
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
            <butto onClick={() => listofAll()}>list of all</butto>
        </span>
    );

 }