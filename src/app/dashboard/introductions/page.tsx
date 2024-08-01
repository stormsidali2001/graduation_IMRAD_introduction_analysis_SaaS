import { IntroductionsTable } from './IntroductionsTable'
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem, DropdownMenuRange, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function Component() {
  return (
    <div className="flex flex-col h-full">
      <header className="sticky top-0 z-20 bg-background border-b px-4 py-3 flex items-center gap-4 sm:px-6">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search introductions..."
            className="w-full rounded-lg bg-muted pl-10 pr-4 py-2 text-sm"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <FilterIcon className="w-4 h-4" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Filter by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>Introduction</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Methods</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Results</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Discussion</DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <div />
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <ListOrderedIcon className="w-4 h-4" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Sort</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup value="text-length">
              <DropdownMenuRadioItem value="text-length">Text Length</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="confidence">Confidence Score</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="sentence-order">Sentence Order</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="flex-1 overflow-auto">
        <div className="grid gap-4 p-4 sm:p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>IMRAD Introduction Moves</CardTitle>
                <CardDescription>Total: 1,234</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ParenthesesIcon className="w-5 h-5 text-muted-foreground" />
                    <span>Establishing a research territory</span>
                  </div>
                  <div className="text-2xl font-bold">654</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ParenthesesIcon className="w-5 h-5 text-muted-foreground" />
                    <span>Establishing a niche</span>
                  </div>
                  <div className="text-2xl font-bold">234</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ParenthesesIcon className="w-5 h-5 text-muted-foreground" />
                    <span>Occupying the niche</span>
                  </div>
                  <div className="text-2xl font-bold">234</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Confidence Scores</CardTitle>
                <CardDescription>Average: 82%</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ParenthesesIcon className="w-5 h-5 text-muted-foreground" />
                    <span>Establishing a research territory</span>
                  </div>
                  <div className="text-2xl font-bold">88%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ParenthesesIcon className="w-5 h-5 text-muted-foreground" />
                    <span>Establishing a niche</span>
                  </div>
                  <div className="text-2xl font-bold">84%</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ParenthesesIcon className="w-5 h-5 text-muted-foreground" />
                    <span>Occupying the niche</span>
                  </div>
                  <div className="text-2xl font-bold">81%</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sentence Order</CardTitle>
                <CardDescription>Average: 3.2</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ParenthesesIcon className="w-5 h-5 text-muted-foreground" />
                    <span>Establishing a research territory</span>
                  </div>
                  <div className="text-2xl font-bold">2.1</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ParenthesesIcon className="w-5 h-5 text-muted-foreground" />
                    <span>Establishing a niche</span>
                  </div>
                  <div className="text-2xl font-bold">3.4</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ParenthesesIcon className="w-5 h-5 text-muted-foreground" />
                    <span>Occupying the niche</span>
                  </div>
                  <div className="text-2xl font-bold">3.8</div>
                </div>
              </CardContent>
            </Card>
          </div>
        <IntroductionsTable undefined/>
        </div>
      </main>
    </div>
  )
}

function FilterIcon(props) {
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
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}


function ListOrderedIcon(props) {
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
      <line x1="10" x2="21" y1="6" y2="6" />
      <line x1="10" x2="21" y1="12" y2="12" />
      <line x1="10" x2="21" y1="18" y2="18" />
      <path d="M4 6h1v4" />
      <path d="M4 10h2" />
      <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
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


function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
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