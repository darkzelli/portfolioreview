import { createClient } from '@/utils/supabase/server'
import { revalidateTag, unstable_cache } from 'next/cache';
import { Suspense } from 'react'

export default function Page() {
  
  const supabase = createClient()

  const getNotes = unstable_cache(
    async () => {
      return await supabase?.from('notes').select()
    }, 
    ['notes'],
    {
      tags: ['notes']
    }
  )

  const validate = async () => {
    "use server"
    revalidateTag('notes')
  }

  async function AllNotes(){
    const data = await getNotes(); 
    return <div>{JSON.stringify(data)}</div>
  }

  return (
    <div>
      <Suspense fallback={<p>loading notes...</p>}>
        <AllNotes/>
        <form action={validate}>
          <button type='submit'>Revalidate</button>
        </form>
      </Suspense>
    </div>
)



}