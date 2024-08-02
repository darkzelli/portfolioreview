import { revalidateTag } from "next/cache"
import { headers } from "next/headers"
export async function GET(req){
    const headersList = headers()
    const has = headersList.has('x-revalidation-tag')
    if(has){
        const tag = headersList.get('x-revalidation-tag')
        const tags =  tag.split(',')
        tags.forEach((theTag) => revalidateTag(theTag))
        return Response.json({message: "success"}, {status: 200}) 
    }else return Response.json({message: "error"}, {status: 400})
}