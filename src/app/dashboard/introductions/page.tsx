import { Badge } from "@/components/ui/badge"
import { RadialStackedChart } from "@/components/ui/charts/RadialStackedChart"
import Link from "next/link"

  const MiniCard = ({title})=>{
    return (


            <div className="flex flex-col justify-between items-center">
              <div className="">{title}</div>
              <div className="">58%</div>

            </div>
    )
  }

export default function Component() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6">

 
   <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-2">Introduction</h2>
                <p className="text-gray-700 mb-4">This is an introduction.</p>
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        <span>Move: 2</span>
                        <span>SubMove: 4</span>
                    </div>
                    <div className="text-sm text-gray-500">
                        <span>Move Confidence: 0.98</span>
                        <span>SubMove Confidence: 0.45</span>
                    </div>
                </div>
            </div>
        </div>


   
    </section>
  )
}

function ArrowRightIcon(props) {
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
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
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