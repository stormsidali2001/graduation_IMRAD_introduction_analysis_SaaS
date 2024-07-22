import React from 'react'
import FormWrapper from './Form'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

const page = async () => {
    const session = await auth() 
    console.log(session)
    if(session){
        redirect("/dashboard")
    }
  return (
    <FormWrapper/>
  )
}

export default page