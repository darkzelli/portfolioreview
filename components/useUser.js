"use client"
import { createContext, useState } from "react";

export const userContext = createContext()

const user = null


export default function UserProvider({children}){

    const [user, setUser] = useState()
    const [userData, setUserData] = useState()

    return(
        <userContext.Provider value={[user, setUser, userData, setUserData]}>
            {children}
        </userContext.Provider>
    )
}