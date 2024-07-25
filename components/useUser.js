import { createContext } from "react";

const userContext = createContext();

const user = null


export default function userProvider({children}){
    return(
        <userContext.Provider value={user}>
            {children}
        </userContext.Provider>
    )
}