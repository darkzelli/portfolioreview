"use client"
import Link from 'next/link'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Test2() {
    const notify = () => toast("Wow so easy!", {type: 'error', theme: 'dark', hideProgressBar: true});
    return (
        <span style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <button onClick={notify}>Notify!</button>
            <ToastContainer/>
        </span>
    );

 }