"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const Dashboard = () => {
    const {data: session } = useSession();
    
    return(
        <>
            {session ? (
                <>
                    {session.user?.name}
                    {session.user?.email}
                    {session.user?.description}
                    There is a Session
                    <button onClick={() => signOut()}>sign out</button>
                </>
      ) : (
            <>
                there is not a session
                <button onClick={() => signIn("google")}> sign in with google</button>
            </>
      )}
        </>
    );
}

export default Dashboard