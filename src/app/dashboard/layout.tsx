import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react'

const Layout = async ({children}:{children:React.ReactNode}) => {
 const session = await auth()
 if(!session){
    redirect("/login")
 }
  return <>{children}</>;
}

export default Layout