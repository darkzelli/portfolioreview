import { unstable_cache } from "next/cache";
import { createClient } from "@/utils/supabase/server";


export async function GET(){
    const supabase = createClient()
    const userdata = await getUserData(supabase)
    return Response.json({data: userdata})
}


const getUserData = unstable_cache(
    async (supabase) => {
        return await supabase.from('accounts').upsert({id: user?.auth?.id}, {ignoreDuplicates: true, onConflict: 'id'}).select()
    }, 
    ['userdata'],
    {
      tags: ['userdata']
    }
  )