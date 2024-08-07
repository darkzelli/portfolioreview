import { dbConnect } from "@/lib/mongodb"
import { newUserSchema } from "@/lib/schema"
import mongoose from "mongoose"

export async function GET(req){
    const { searchParams } = new URL(req.url)
    const portfolio = searchParams.get('portfolio')
    const User = mongoose.models.User
    const find = {url: portfolio}
    const data = await User.findOne(find)
    if(data) return Response.json({message: data}, {status: 200})
    else return Response.json({message: "Portfolio not found"}, {status: 404})
}