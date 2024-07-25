"use client"
import { createContext, useState } from "react";

export const userContext = createContext()

const user = null


export default function UserProvider({children}){

    const [user, setUser] = useState()

    return(
        <userContext.Provider value={[user, setUser]}>
            {children}
        </userContext.Provider>
    )
}