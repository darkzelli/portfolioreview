"use server"

import { revalidateTag } from "next/cache"

export async function revalidateUserData(){
    revalidateTag('userdata')
}

export async function revalidateUser(){
    revalidateTag('user')
}