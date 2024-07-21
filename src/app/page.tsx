/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Q9AtLr8s5nB
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Converter } from "./converter"

export default function Component() {
  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50">
      <header className="py-8 px-4 md:px-6 lg:px-8 bg-white dark:bg-gray-900 shadow">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpenIcon className="w-6 h-6" />
            <h1 className="text-2xl font-bold">Introduction Assist</h1>
          </div>
          <nav className="hidden md:flex items-center gap-4">
            <Link
              href="#"
              className="text-sm font-medium hover:text-gray-700 dark:hover:text-gray-300"
              prefetch={false}
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-gray-700 dark:hover:text-gray-300"
              prefetch={false}
            >
              About
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:text-gray-700 dark:hover:text-gray-300"
              prefetch={false}
            >
              Contact
            </Link>
          </nav>
          <Button>Get Started</Button>
        </div>
      </header>
      <main className="py-12 px-4 md:px-6 lg:px-8">
        <section className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Improve Your Paper Introductions</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Our AI-powered tool analyzes your introduction text and provides real-time feedback on the IMRAD
              structure, helping you write more effective scientific papers.
            </p>
            <div className="flex items-center gap-4">
              <Button>Try It Now</Button>
              <Link
                href="#"
                className="text-sm font-medium hover:text-gray-700 dark:hover:text-gray-300"
                prefetch={false}
              >
                Learn More
              </Link>
            </div>
          </div>
          <div>
            <img src="/placeholder.svg" alt="Introduction Assist" width={600} height={400} className="rounded-xl" />
          </div>
        </section>
        <section className="container mx-auto mt-16">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col gap-4">
              <DeleteIcon className="w-8 h-8" />
              <h3 className="text-xl font-bold">Paste Your Introduction</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Copy and paste your scientific paper introduction into the text area, and our tool will get to work.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col gap-4">
              <CpuIcon className="w-8 h-8" />
              <h3 className="text-xl font-bold">AI-Powered Analysis</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our machine learning model will analyze your introduction and identify the IMRAD moves and submoves in
                each sentence.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-6 flex flex-col gap-4">
              <ClipboardCheckIcon className="w-8 h-8" />
              <h3 className="text-xl font-bold">Actionable Feedback</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Receive clear and concise feedback on the structure of your introduction, with explanations of each
                IMRAD move and submove.
              </p>
            </div>
          </div>
        </section>

<Converter/>
     
      </main>
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpenIcon className="w-6 h-6" />
            <span className="text-sm">Introduction Assist</span>
          </div>
          <nav className="hidden md:flex items-center gap-4">
            <Link href="#" className="text-sm hover:text-gray-300" prefetch={false}>
              Features
            </Link>
            <Link href="#" className="text-sm hover:text-gray-300" prefetch={false}>
              About
            </Link>
            <Link href="#" className="text-sm hover:text-gray-300" prefetch={false}>
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

function BookOpenIcon(props) {
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
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}


function ClipboardCheckIcon(props) {
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
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="m9 14 2 2 4-4" />
    </svg>
  )
}


function CpuIcon(props) {
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
      <rect width="16" height="16" x="4" y="4" rx="2" />
      <rect width="6" height="6" x="9" y="9" rx="1" />
      <path d="M15 2v2" />
      <path d="M15 20v2" />
      <path d="M2 15h2" />
      <path d="M2 9h2" />
      <path d="M20 15h2" />
      <path d="M20 9h2" />
      <path d="M9 2v2" />
      <path d="M9 20v2" />
    </svg>
  )
}


function DeleteIcon(props) {
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
      <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
      <line x1="18" x2="12" y1="9" y2="15" />
      <line x1="12" x2="18" y1="9" y2="15" />
    </svg>
  )
}