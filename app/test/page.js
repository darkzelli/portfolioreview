"use client"
import styles from '../../css/notfound..module.css'
import { useContext, useEffect, useState } from 'react';
import { userContext } from '@/components/UseUser';
import { revalidateUserData } from '@/components/revalidateTags'
import { useRouter } from 'next/navigation';

import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { PersistedClient, Persister } from '@tanstack/react-query-persist-client'
  

import Link from 'next/link'

const supabase = createClient()
const getData = async () => {
    const {data, error} = await supabase
        .from('accounts')
        .select();
    if(error) console.log(error)
    return await data[0]
}

export default function Test() {
    const [name, setname] = useState();
    const router = useRouter()

    const queryClient = useQueryClient()

    const { data, isLoading, isError, isFetching} = useQuery({queryKey: ['userdata'], queryFn: () => getData()})
    console.log({isLoading, isFetching})
    if(isLoading) return <div>loading...</div>
    if(isFetching)
    if(isError || !data) return <div>Error</div>



    
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

    
    return (
        <span style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <span><Link href="/test">test</Link><Link href="/test2">test2</Link></span>
            <span><b>id:  </b>{data?.id}</span>
            <span><b>name:  </b>{data?.name}</span>
            <span><b>desc:  </b>{data?.description}</span>
            <span><b>route:  </b>{data?.route_url}</span>
            <span><b>role:  </b>{data?.role}</span>
            <span><b>membership:  </b>{data?.membership}</span>
            <span><b>url:  </b>{data?.portfolio_url}</span>
            <span><b>can_post:  </b>{data?.can_post.toString()}</span>
            <span><b>can_comment:  </b>{data?.can_comment.toString()}</span>
            <span><b>can_like:  </b>{data?.can_like.toString()}</span>
            <input type="text" placeholder="name" onChange={(e) => setname(e.target.value)}/>
            <span>|</span>
            <button  onClick={handleupdate}>Submit</button>
            <span>|</span>
            <button  onClick={() => mutation.mutate()}>Mutate</button>
            {mutation.isPending ? "changing name...": ""}
        </span>
    );

 }