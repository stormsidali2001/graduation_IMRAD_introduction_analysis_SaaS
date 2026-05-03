import React from 'react'
import FormWrapper from './Form'
import { getSession } from '@/lib/get-session'
import { isPreviewMode } from '@/lib/preview-mode'
import { PreviewModeNotice } from '@/components/preview-mode-notice'
import { redirect } from 'next/navigation'

const page = async () => {
  if (isPreviewMode()) return <PreviewModeNotice />
  const session = await getSession()
  if (session) {
    redirect("/dashboard")
  }
  return (
    <FormWrapper/>
  )
}

export default page