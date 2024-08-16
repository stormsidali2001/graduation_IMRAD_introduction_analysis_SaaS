import {
  getFreePricingList,
  getMonthlyPricingList,
  getYearlyPricingList,
} from "@/common/general";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pricing } from "@/components/ui/pricingCard";
import {
  ArrowRightIcon,
  UploadIcon,
  PenToolIcon,
  ZapIcon,
  BookOpenIcon,
} from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-950">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-200 dark:border-gray-800">
        <Link className="flex items-center justify-between gap-4" href="#">
          <BookOpenIcon className="h-6 w-6 text-primary" />
          <span className="font-bold">IMRAD Analyzer</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-300"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-300"
            href="#works"
          >
            How It Works
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4 text-gray-700 dark:text-gray-300"
            href="#pricing"
          >
            Pricing
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="relative">
                <div className="w-full h-full bg-primary/20 absolute"></div>
                <img
                  alt="AI analyzing scientific paper structure"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                  height="310"
                  src="/hero.jpeg"
                  width="550"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-gray-900 dark:text-white">
                    Revolutionize Your Scientific Writing with AI
                  </h1>
                  <p className="max-w-[600px] text-gray-700 md:text-xl dark:text-gray-300">
                    Analyze and enhance your IMRAD introductions using
                    cutting-edge AI technology. Upload your paper or start
                    writing directly on our platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                    <Link href="/sign-up">Get Started</Link>
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950"
          id="features"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-gray-900 dark:text-white">
              Key Features
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:gap-16">
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <UploadIcon className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Upload Feature
                  </h3>
                  <p className="text-center text-gray-700 dark:text-gray-300">
                    Upload your scientific paper and let our AI extract and
                    analyze the IMRAD introduction, predicting moves and
                    submoves for each sentence.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="flex flex-col items-center space-y-4 p-6">
                  <PenToolIcon className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Direct Input
                  </h3>
                  <p className="text-center text-gray-700 dark:text-gray-300">
                    Write your IMRAD introduction directly on our platform and
                    receive instant AI-powered analysis and classification of
                    each sentence.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-gray-900 dark:text-white">
              How It Works
            </h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:gap-16">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Upload or Write
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Upload your scientific paper or start writing your IMRAD
                  introduction directly on our platform.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  AI Analysis
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our AI analyzes each sentence, classifying it into IMRAD moves
                  and submoves.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Receive Insights
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Get a detailed analysis, including move classification,
                  summary, and thought process explanation.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 text-gray-900 dark:text-white">
              IMRAD Moves and Submoves
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    Establishing the Research Territory
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Show importance or relevance of research area</li>
                    <li>Introduce and review previous research</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    Establishing the Niche
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Claim issues with previous research</li>
                    <li>Highlight gaps in the field</li>
                    <li>Raise questions about unclear research</li>
                    <li>Extend prior research</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    Occupying the Niche
                  </h3>
                  <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                    <li>Outline purposes and nature of research</li>
                    <li>State hypothesis or research question</li>
                    <li>Share findings</li>
                    <li>Elaborate on research value</li>
                    <li>Outline paper structure</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900"
          id="#works"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
                  Ready to Enhance Your Scientific Writing?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl dark:text-gray-300">
                  Start analyzing your IMRAD introductions today and take your
                  research papers to the next level.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  Get Started Now
                  <ZapIcon className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                >
                  View Pricing
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Pricing
          isAuthenticated={false}
          pricingList={[
            getFreePricingList("#"),
            getMonthlyPricingList("/login"),
            getYearlyPricingList("#"),
          ]}
        />
      </main>
      <main className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 dark:border-gray-800">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 IMRAD Analyzer. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
            href="#"
          >
            Terms of Service
          </Link>
          <Link
            className="text-xs hover:underline underline-offset-4 text-gray-500 dark:text-gray-400"
            href="#"
          >
            Privacy
          </Link>
        </nav>
      </main>
    </div>
  );
}
