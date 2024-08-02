import { unstable_cache } from "next/cache";
import { createClient } from "@/utils/supabase/server";


export async function GET(){
    const supabase = createClient()
    const {data, error} = await supabase.from('accounts').select()
    if(error) return null
    return Response.json(data[0])
}


const getUserData = unstable_cache(
  async (supabase) => {
    const { data, error } = await supabase.from('accounts').select()
    return await data
  }, 
  ['userdata'],
  {
    tags: ['userdata']
  }
)