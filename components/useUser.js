"use client"
import { createContext, useState } from "react";

export const userContext = createContext()

const user = null


export default function UserProvider({children}){

    const [user, setUser] = useState(null)
    const [userData, setUserData] = useState(null)

    const data = {
        user, setUser, userData, setUserData
    }
    return(
        <userContext.Provider value={data}>
            {children}
        </userContext.Provider>
    )
}