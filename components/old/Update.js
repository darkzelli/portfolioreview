"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { getCsrfToken } from "next-auth/react";

const Update = () => {
    const {data: session, update } = useSession();
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [url, setUrl] = useState("");
    const [portfolio, setPortfolio] = useState("");
    const [type, setType] = useState("");
    const [role, setRole] = useState("");
    const [admin, setAdmin] = useState("");
    const [updateData, setUpdateData] = useState({})

    async function handleUpdate(){
        const newSession = {
            ...session,
            user: {
                ...session?.user,
                description: desc
            }
        } 
        await update(newSession)
    }
    async function handleSubmit(){
        const token = await getCsrfToken()
        const body = {
            session: session,
            update: {
                name: name,
                description: desc,
                url: url,
                portfolio: portfolio,
                type: type,
                premium: false,
                admin: false
            }
        }
        fetch(process.env.NEXT_PUBLIC_NEXT_URL + "api/protected/user/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-request-token": token
            },
            body: JSON.stringify(body)
        }).then((res) => {
            if(res.status === 200){
                handleUpdate()
            }
        }).catch((err) => {})
        
        
    }
    return(
        <>
            <input placeholder="name" onChange={(e) => setName(e.target.value)}/>
            <input placeholder="description"  onChange={(e) => setDesc(e.target.value)}/>
            <input placeholder="url" onChange={(e) => setUrl(e.target.value)}/>
            <input placeholder="portfolio" onChange={(e) => setPortfolio(e.target.value)}/>
            <input placeholder="type" onChange={(e) => setType(e.target.value)}/>
            <button onClick={() => handleSubmit()}>submit</button>
        </>
    );
}


export default Update