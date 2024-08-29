"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
  MenuIcon,
  XIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const slideUp = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm fixed w-full z-50">
        <Link className="flex items-center justify-between gap-4" href="#">
          <BookOpenIcon className="h-6 w-6 text-primary" />
          <span className="font-bold text-gray-900 dark:text-white">
            IMRAD Analyzer
          </span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:text-primary transition-colors text-gray-700 dark:text-gray-300"
            href="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:text-primary transition-colors text-gray-700 dark:text-gray-300"
            href="#works"
          >
            How It Works
          </Link>
          <Link
            className="text-sm font-medium hover:text-primary transition-colors text-gray-700 dark:text-gray-300"
            href="#pricing"
          >
            Pricing
          </Link>
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </Button>
      </header>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden fixed top-16 left-0 right-0 bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-800 z-40"
        >
          <nav className="flex flex-col gap-4">
            <Link
              className="text-sm font-medium hover:text-primary transition-colors text-gray-700 dark:text-gray-300"
              href="#features"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              className="text-sm font-medium hover:text-primary transition-colors text-gray-700 dark:text-gray-300"
              href="#works"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              className="text-sm font-medium hover:text-primary transition-colors text-gray-700 dark:text-gray-300"
              href="#pricing"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
          </nav>
        </motion.div>
      )}
      <main className="flex-1 pt-16">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-100 dark:bg-gray-900"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <motion.div
                variants={slideUp}
                className="flex flex-col justify-center space-y-4"
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
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
                    className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Learn More
                  </Button>
                </div>
              </motion.div>
              <motion.div
                variants={slideUp}
                className="relative overflow-hidden rounded-xl shadow-2xl"
              >
                <Image
                  alt="AI analyzing scientific paper structure"
                  className="object-cover object-center w-full h-full"
                  height={400}
                  width={550}
                  src="/hero.jpeg"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 mix-blend-multiply" />
              </motion.div>
            </div>
          </div>
        </motion.section>
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950"
          id="features"
        >
          <div className="container px-4 md:px-6">
            <motion.h2
              variants={slideUp}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500"
            >
              Key Features
            </motion.h2>
            <div className="grid gap-10 sm:grid-cols-2 md:gap-16">
              <motion.div variants={slideUp}>
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
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
              </motion.div>
              <motion.div variants={slideUp}>
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
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
              </motion.div>
            </div>
          </div>
        </motion.section>
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900"
          id="works"
        >
          <div className="container px-4 md:px-6">
            <motion.h2
              variants={slideUp}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500"
            >
              How It Works
            </motion.h2>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:gap-16">
              <motion.div
                variants={slideUp}
                className="flex flex-col items-center space-y-4 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Upload or Write
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Upload your scientific paper or start writing your IMRAD
                  introduction directly on our platform.
                </p>
              </motion.div>
              <motion.div
                variants={slideUp}
                className="flex flex-col items-center space-y-4 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  AI Analysis
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our AI analyzes each sentence, classifying it into IMRAD moves
                  and submoves.
                </p>
              </motion.div>
              <motion.div
                variants={slideUp}
                className="flex flex-col items-center space-y-4 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Receive Insights
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Get a detailed analysis, including move classification,
                  summary, and thought process explanation.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerChildren}
          className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950"
        >
          <div className="container px-4 md:px-6">
            <motion.h2
              variants={slideUp}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500"
            >
              IMRAD Moves and Submoves
            </motion.h2>
            <div className="grid gap-6 md:grid-cols-3">
              <motion.div variants={slideUp}>
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
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
              </motion.div>
              <motion.div variants={slideUp}>
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
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
              </motion.div>
              <motion.div variants={slideUp}>
                <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
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
              </motion.div>
            </div>
          </div>
        </motion.section>
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-900"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
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
                  className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  View Pricing
                </Button>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          id="pricing"
        >
          <Pricing
            isAuthenticated={false}
            pricingList={[
              getFreePricingList("#"),
              getMonthlyPricingList("/login"),
              getYearlyPricingList("#"),
            ]}
          />
        </motion.section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 dark:border-gray-800">
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
      </footer>
    </div>
  );
}
