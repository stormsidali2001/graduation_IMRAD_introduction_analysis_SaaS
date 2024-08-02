import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { getIntroductionStatsAction } from '@/server/actions/get-inroductions-stats';

export const IntroductionsStats = async ({undefined}) =>
{


  const {
    averageConfidenceScore,
    averageConfidenceScoreByMove,
    averageSentencePositionScore,
    averageSentencePositionScoreByMove,
    totalIntroductions,
    totalIntroductionsByMove


    
  } = (await getIntroductionStatsAction({}))?.data ?? {}


  return (

  
	  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>IMRAD Introduction Moves</CardTitle>
                <CardDescription>Total: {totalIntroductions??0}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ParenthesesIcon className="w-5 h-5 text-muted-foreground" />
                    <span>Establishing a research territory</span>
                  </div>
                  <div className="text-2xl font-bold">{totalIntroductionsByMove?.find(i=>i.move === 0)?.count ?? 0}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ParenthesesIcon className="w-5 h-5 text-muted-foreground" />
                    <span>Establishing a niche</span>
                  </div>
                  <div className="text-2xl font-bold">{totalIntroductionsByMove?.find(i=>i.move === 1)?.count ?? 0}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ParenthesesIcon className="w-5 h-5 text-muted-foreground" />
                    <span>Occupying the niche</span>
                  </div>
                  <div className="text-2xl font-bold">{totalIntroductionsByMove?.find(i=>i.move === 2)?.count ?? 0}</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Confidence Scores</CardTitle>
                <CardDescription>Average: {((averageConfidenceScore?.avgMoveConfidence  ?? 0)*100).toFixed(0)+'%'}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ParenthesesIcon className="w-5 h-5 text-muted-foreground" />
                    <span>Establishing a research territory</span>
                  </div>
                  <div className="text-2xl font-bold">{((averageConfidenceScoreByMove?.find(m=>m.move === 0)?.avgMoveConfidence ?? 0)*100).toFixed(1)+'%'}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ParenthesesIcon className="w-5 h-5 text-muted-foreground" />
                    <span>Establishing a niche</span>
                  </div>
                  <div className="text-2xl font-bold">{((averageConfidenceScoreByMove?.find(m=>m.move === 1)?.avgMoveConfidence ?? 0)*100).toFixed(1)+'%'}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ParenthesesIcon className="w-5 h-5 text-muted-foreground" />
                    <span>Occupying the niche</span>
                  </div>
                  <div className="text-2xl font-bold">{((averageConfidenceScoreByMove?.find(m=>m.move === 2)?.avgMoveConfidence ?? 0)*100).toFixed(1)+'%'}</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sentence Order</CardTitle>
                <CardDescription>Average: {averageSentencePositionScore?.avgOrder??0}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ParenthesesIcon className="w-5 h-5 text-muted-foreground" />
                    <span>Establishing a research territory</span>
                  </div>
                  <div className="text-2xl font-bold">{((averageSentencePositionScoreByMove?.find(m=>m.move === 0)?.avgOrder ?? 0)).toFixed(1)}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ParenthesesIcon className="w-5 h-5 text-muted-foreground" />
                    <span>Establishing a niche</span>
                  </div>
                  <div className="text-2xl font-bold">{((averageSentencePositionScoreByMove?.find(m=>m.move === 1)?.avgOrder ?? 0)).toFixed(1)}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ParenthesesIcon className="w-5 h-5 text-muted-foreground" />
                    <span>Occupying the niche</span>
                  </div>
                  <div className="text-2xl font-bold">{((averageSentencePositionScoreByMove?.find(m=>m.move === 2)?.avgOrder ?? 0)).toFixed(1)}</div>
                </div>
              </CardContent>
            </Card>
          </div>
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

function ParenthesesIcon(props) {
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
      <path d="M8 21s-4-3-4-9 4-9 4-9" />
      <path d="M16 3s4 3 4 9-4 9-4 9" />
    </svg>
  )

}
