import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = createClient()
  const { data } = await supabase.from('notes').select()

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}