import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function  Page() {
  const session = await auth()
  if(!session){
    redirect("/login")
  }
  return (
    <div className="flex flex-col w-full min-h-screen bg-background">
      <header className="sticky top-0 z-30 flex items-center h-16 px-4 border-b bg-background sm:px-6">
        <Link href="#" className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4" prefetch={false}>
          <FrameIcon className="w-6 h-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="hidden font-medium sm:flex flex-row items-center gap-5 text-sm lg:gap-6">
          <Link href="#" className="font-bold" prefetch={false}>
            Dashboard
          </Link>
          <Link href="#" className="text-muted-foreground" prefetch={false}>
            Uploads
          </Link>
          <Link href="#" className="text-muted-foreground" prefetch={false}>
            Analytics
          </Link>
          <Link href="#" className="text-muted-foreground" prefetch={false}>
            Settings
          </Link>
        </nav>
        <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <Button variant="ghost" size="icon" className="rounded-full ml-auto">
            <img src="/placeholder.svg" width="32" height="32" className="rounded-full border" alt="Avatar" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 px-4 py-6 md:px-6 md:py-12">
        <div className="max-w-6xl mx-auto grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Add Introduction or Upload Paper</CardTitle>
              <CardDescription>
                Start by providing an introduction or uploading a paper to begin the analysis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="introduction">Introduction</Label>
                  <Textarea id="introduction" placeholder="Enter your introduction here..." className="min-h-[150px]" />
                </div>
                <div>
                  <Label htmlFor="paper">Upload Paper</Label>
                  <Input type="file" id="paper" />
                </div>
                <Button>Analyze</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

function FrameIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" x2="2" y1="6" y2="6" />
      <line x1="22" x2="2" y1="18" y2="18" />
      <line x1="6" x2="6" y1="2" y2="22" />
      <line x1="18" x2="18" y1="2" y2="22" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}