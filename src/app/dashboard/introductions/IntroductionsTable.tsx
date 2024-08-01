import React from 'react'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

const Introduction = ()=>{
  return (
      <TableRow>
                    <TableCell className="max-[400px]">
                      <div className="font-medium line-clamp-2">
                        The current study examines the effectiveness of a new educational intervention designed to
                        improve critical thinking skills in high school students. The intervention was implemented in 10
                        schools over the course of one academic year, and student performance was assessed using
                        standardized tests.
                      </div>
                    </TableCell>
                    <TableCell className='w-14'>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-full bg-muted rounded-full">
                          <div className="h-2 bg-primary rounded-full" style={{ width: "85%" }} />
                        </div>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </TableCell>

                    <TableCell className='w-14'>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-full bg-muted rounded-full">
                          <div className="h-2 bg-primary rounded-full" style={{ width: "85%" }} />
                        </div>
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoveVerticalIcon className="h-4 w-4" />
                            <span className="sr-only">More</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>

  )

}
export const IntroductionsTable = ({undefined}) => (
	  <Card>
            <CardHeader>
              <CardTitle>Introductions</CardTitle>
              <CardDescription>Showing 1-20 of 1,234 introductions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Introduction</TableHead>
                    <TableHead>Move Confidence</TableHead>
                    <TableHead>Sub Move Confidence</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <Introduction/>
                  <Introduction/>
               
                </TableBody>
              </Table>
            </CardContent>
          </Card>
)

function MoveVerticalIcon(props) {
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
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>
  )
}

