import { GeistSans } from "geist/font/sans";
import "./globals.css";
import UserProvider from "@/components/UseUser"
import { unstable_cache } from "next/cache";
import { data } from "autoprefixer";
import { Toaster } from "@/components/ui/toaster";

import Providers from "@/utils/react-query/ReactQueryProvider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/*const supabase = createClient()

async function InitializeUser(){
  const user = await getUser(supabase)
  return await user
}

async function InitializeUserData(){
  const data = await getUserData(supabase)
  return await data
}


const getUserData =  unstable_cache(
  async (supabase) => {
    const { data, error } = await supabase.from('accounts').select()
    return await data
  }, 
  ['userdata'],
  {
    tags: ['userdata']
  }
)

const getUser = unstable_cache(
  async (supabase) => {
    const { data: { user } } = await supabase.auth.getUser()
    return await user
  }, 
  ['user'],
  {
    tags: ['user']
  }
)*/

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Portfolio Review - Make Your Portfolio Better",
  description: "Get advice and constructive criticism on your portfolio or provide feedback on others.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <Providers>
            {children}
            <Toaster/>
            <ReactQueryDevtools/>
          </Providers>
        </main>
      </body>
    </html>
  );
}