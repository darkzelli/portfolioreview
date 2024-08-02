"use client"
import { createContext, useState } from "react";

export const userContext = createContext("dwd")

const user = null


export default function UserProvider({children, account, accountData}){
    return(
        <userContext.Provider value={{account, accountData}}>
            {children}
        </userContext.Provider>
    )
}


