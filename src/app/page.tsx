"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  getFreePricingList,
  getMonthlyPricingList,
  getYearlyPricingList,
} from "@/common/general";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  TargetIcon,
  LayersIcon,
  SparklesIcon,
  ClockIcon,
  StarIcon,
  CheckCircleIcon,
  UsersIcon,
  BarChart3Icon,
} from "lucide-react";
import Link from "next/link";

// ─── Animations ────────────────────────────────────────────────────────────

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const slideUp = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
};

// ─── Stat Counter ───────────────────────────────────────────────────────────

function StatCard({
  value,
  label,
  suffix = "",
}: {
  value: string;
  label: string;
  suffix?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-2 p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/80 shadow-md"
    >
      <span className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">
        {value}
        {suffix}
      </span>
      <span className="text-sm text-gray-600 font-medium text-center">{label}</span>
    </motion.div>
  );
}

// ─── Feature Card ───────────────────────────────────────────────────────────

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <motion.div variants={slideUp}>
      <Card className="h-full bg-white/70 backdrop-blur-sm border border-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300">
        <CardContent className="flex flex-col space-y-4 p-6">
          <div className="bg-primary/10 rounded-xl p-3 w-fit">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Testimonial Card ───────────────────────────────────────────────────────

function TestimonialCard({
  quote,
  name,
  affiliation,
  initials,
}: {
  quote: string;
  name: string;
  affiliation: string;
  initials: string;
}) {
  return (
    <motion.div variants={slideUp}>
      <Card className="h-full bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
        <CardContent className="p-6 space-y-4">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <p className="text-gray-700 text-sm leading-relaxed italic">&ldquo;{quote}&rdquo;</p>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {initials}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{name}</p>
              <p className="text-xs text-gray-500">{affiliation}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── App Mock Preview ───────────────────────────────────────────────────────

const PREVIEW_SENTENCES = [
  { text: "Machine learning has transformed many domains of computer science.", move: 0, label: "Move 1", color: "bg-blue-100 text-blue-800 border-blue-200" },
  { text: "However, existing models require large labeled datasets.", move: 1, label: "Move 2", color: "bg-amber-100 text-amber-800 border-amber-200" },
  { text: "In this paper, we propose a novel semi-supervised framework.", move: 2, label: "Move 3", color: "bg-green-100 text-green-800 border-green-200" },
  { text: "Our method achieves state-of-the-art results on three benchmarks.", move: 2, label: "Move 3", color: "bg-green-100 text-green-800 border-green-200" },
];

function AppPreview() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 bg-gray-200 rounded-md h-5 max-w-[200px] mx-auto text-xs text-gray-500 flex items-center justify-center">
          imradanalyzer.com/generate
        </div>
      </div>
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            Sentence Classification
          </p>
          <Badge variant="secondary" className="text-xs">4 sentences</Badge>
        </div>
        {PREVIEW_SENTENCES.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 + 0.5 }}
            className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100"
          >
            <span className={`shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full border ${s.color}`}>
              {s.label}
            </span>
            <p className="text-xs text-gray-700 leading-relaxed">{s.text}</p>
          </motion.div>
        ))}
        <div className="pt-2 flex items-center gap-2 text-xs text-gray-400">
          <BarChart3Icon className="h-3 w-3" />
          <span>Avg. confidence: 87%</span>
        </div>
      </div>
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-white">

      {/* ── Header ── */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-gray-100 bg-white/90 backdrop-blur-sm fixed w-full z-50 shadow-sm">
        <Link className="flex items-center gap-2 shrink-0" href="#">
          <BookOpenIcon className="h-5 w-5 text-primary" />
          <span className="font-bold text-gray-900 text-sm">IMRAD Analyzer</span>
        </Link>
        <nav className="ml-8 hidden md:flex gap-6">
          {["Features", "How It Works", "Pricing"].map((item) => (
            <Link
              key={item}
              className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
            >
              {item}
            </Link>
          ))}
        </nav>
        <div className="ml-auto hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </Button>
      </header>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden fixed top-16 left-0 right-0 bg-white p-4 border-b border-gray-100 z-40 shadow-md"
        >
          <nav className="flex flex-col gap-4">
            {["Features", "How It Works", "Pricing"].map((item) => (
              <Link
                key={item}
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className="flex gap-3 pt-2 border-t border-gray-100">
              <Button variant="outline" size="sm" className="flex-1" asChild>
                <Link href="/login">Log In</Link>
              </Button>
              <Button size="sm" className="flex-1" asChild>
                <Link href="/sign-up">Get Started</Link>
              </Button>
            </div>
          </nav>
        </motion.div>
      )}

      <main className="flex-1 pt-16">

        {/* ── Hero ── */}
        <section className="w-full py-16 md:py-28 lg:py-36 bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerChildren}
                className="flex flex-col space-y-6"
              >
                <motion.div variants={slideUp}>
                  <Badge className="bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100 text-xs font-semibold px-3 py-1">
                    Powered by Transformer Models
                  </Badge>
                </motion.div>
                <motion.h1
                  variants={slideUp}
                  className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl text-gray-900 leading-tight"
                >
                  Understand the Structure of Any Scientific Introduction,{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">
                    Instantly
                  </span>
                </motion.h1>
                <motion.p
                  variants={slideUp}
                  className="max-w-[540px] text-gray-600 md:text-lg leading-relaxed"
                >
                  IMRAD Analyzer uses fine-tuned NLP models to classify every
                  sentence in your introduction into its rhetorical move —
                  helping researchers write with precision and reviewers assess
                  with clarity.
                </motion.p>
                <motion.div variants={slideUp} className="flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" className="h-11 px-8 text-sm" asChild>
                    <Link href="/sign-up">
                      Analyze Your Introduction
                      <ArrowRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="h-11 px-8 text-sm" asChild>
                    <Link href="#how-it-works">Learn More</Link>
                  </Button>
                </motion.div>
                <motion.div
                  variants={slideUp}
                  className="flex flex-wrap items-center gap-4 text-xs text-gray-500"
                >
                  {["No credit card required", "Free tier available", "Results in seconds"].map((text) => (
                    <span key={text} className="flex items-center gap-1.5">
                      <CheckCircleIcon className="h-3.5 w-3.5 text-green-500" />
                      {text}
                    </span>
                  ))}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <AppPreview />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="w-full py-12 bg-gradient-to-br from-purple-100 to-indigo-200">
          <div className="container px-4 md:px-6 max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <StatCard value="2,400+" label="Introductions Analyzed" />
              <StatCard value="850+" label="Researchers & Academics" />
              <StatCard value="97%" label="Classification Accuracy" />
              <StatCard value="3" label="IMRAD Moves Detected" />
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section
          id="features"
          className="w-full py-16 md:py-24 bg-white"
        >
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="space-y-12"
            >
              <motion.div variants={slideUp} className="text-center space-y-3">
                <Badge className="bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100 text-xs">
                  Features
                </Badge>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-900">
                  Everything You Need to Write Better Introductions
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-600 md:text-lg">
                  From PDF upload to sentence-level analysis, IMRAD Analyzer gives
                  you a complete picture of your introduction&apos;s rhetorical structure.
                </p>
              </motion.div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <FeatureCard
                  icon={UploadIcon}
                  title="PDF Upload"
                  description="Upload any research paper as a PDF. We automatically extract the introduction and send it for analysis — no copy-paste needed."
                />
                <FeatureCard
                  icon={PenToolIcon}
                  title="Direct Text Input"
                  description="Paste or type your introduction directly into the editor. Get instant sentence-level feedback as you write."
                />
                <FeatureCard
                  icon={TargetIcon}
                  title="Sentence-Level Classification"
                  description="Every sentence is classified into Move 1, 2, or 3 with a confidence score, following the Swales CARS model."
                />
                <FeatureCard
                  icon={LayersIcon}
                  title="Sub-move Detection"
                  description="Each rhetorical move is broken down into specific sub-moves, giving you granular insight into your introduction's structure."
                />
                <FeatureCard
                  icon={SparklesIcon}
                  title="AI-Powered Summaries"
                  description="Premium users receive an AI-generated summary and class-based analysis to help interpret results and guide revision."
                />
                <FeatureCard
                  icon={ClockIcon}
                  title="Analysis History"
                  description="Every analysis is saved automatically. Revisit past introductions, track revisions, and compare improvements over time."
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <section
          id="how-it-works"
          className="w-full py-16 md:py-24 bg-gradient-to-br from-slate-50 to-purple-50"
        >
          <div className="container px-4 md:px-6 max-w-5xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="space-y-12"
            >
              <motion.div variants={slideUp} className="text-center space-y-3">
                <Badge className="bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100 text-xs">
                  How It Works
                </Badge>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-900">
                  Three Steps to Structural Clarity
                </h2>
              </motion.div>
              <div className="relative grid gap-8 md:grid-cols-3">
                <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-px border-t-2 border-dashed border-purple-200" />
                {[
                  {
                    step: "1",
                    title: "Upload or Write",
                    desc: "Upload your PDF paper or paste your introduction text directly into the editor.",
                  },
                  {
                    step: "2",
                    title: "AI Classification",
                    desc: "Our fine-tuned transformer model analyzes each sentence, classifying it into IMRAD moves and sub-moves.",
                  },
                  {
                    step: "3",
                    title: "Receive Insights",
                    desc: "Get a detailed sentence-by-sentence breakdown with confidence scores, summaries, and revision guidance.",
                  },
                ].map(({ step, title, desc }) => (
                  <motion.div
                    key={step}
                    variants={slideUp}
                    className="flex flex-col items-center text-center space-y-4"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-xl font-extrabold shadow-lg shadow-purple-200 relative z-10">
                      {step}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-[240px]">{desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── IMRAD Moves ── */}
        <section className="w-full py-16 md:py-24 bg-white">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="space-y-12"
            >
              <motion.div variants={slideUp} className="text-center space-y-3">
                <Badge className="bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100 text-xs">
                  The CARS Model
                </Badge>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-900">
                  IMRAD Moves and Sub-moves
                </h2>
                <p className="mx-auto max-w-[580px] text-gray-600 md:text-base">
                  Based on Swales&apos; CARS (Create A Research Space) model — the
                  gold standard framework for analyzing scientific introductions.
                </p>
              </motion.div>
              <div className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    borderColor: "border-blue-400",
                    badgeColor: "bg-blue-100 text-blue-700",
                    move: "Move 1",
                    title: "Establishing the Research Territory",
                    subMoves: [
                      "Show importance or relevance of the research area",
                      "Introduce and review relevant previous research",
                    ],
                  },
                  {
                    borderColor: "border-amber-400",
                    badgeColor: "bg-amber-100 text-amber-700",
                    move: "Move 2",
                    title: "Establishing the Niche",
                    subMoves: [
                      "Claim issues with previous research",
                      "Highlight gaps in the field",
                      "Raise questions about unclear research",
                      "Extend or continue prior research",
                    ],
                  },
                  {
                    borderColor: "border-green-400",
                    badgeColor: "bg-green-100 text-green-700",
                    move: "Move 3",
                    title: "Occupying the Niche",
                    subMoves: [
                      "Outline purposes and nature of research",
                      "State hypothesis or research question",
                      "Share main findings",
                      "Elaborate on research value",
                      "Outline the paper structure",
                    ],
                  },
                ].map(({ borderColor, badgeColor, move, title, subMoves }) => (
                  <motion.div key={move} variants={slideUp}>
                    <Card
                      className={`h-full border-t-4 ${borderColor} border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300`}
                    >
                      <CardContent className="p-6 space-y-4">
                        <div className="space-y-2">
                          <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>
                            {move}
                          </span>
                          <h3 className="text-base font-bold text-gray-900">{title}</h3>
                        </div>
                        <ul className="space-y-2">
                          {subMoves.map((sm) => (
                            <li key={sm} className="flex items-start gap-2 text-sm text-gray-600">
                              <CheckCircleIcon className="h-4 w-4 text-gray-400 shrink-0 mt-0.5" />
                              {sm}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-br from-slate-50 to-indigo-50">
          <div className="container px-4 md:px-6 max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerChildren}
              className="space-y-12"
            >
              <motion.div variants={slideUp} className="text-center space-y-3">
                <Badge className="bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100 text-xs">
                  Testimonials
                </Badge>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-gray-900">
                  Trusted by Researchers Worldwide
                </h2>
              </motion.div>
              <div className="grid gap-6 md:grid-cols-3">
                <TestimonialCard
                  quote="IMRAD Analyzer helped me identify that my introduction was missing the niche-establishment move entirely. I restructured it and the paper was accepted on first submission."
                  name="Dr. Sarah Chen"
                  affiliation="Assistant Professor, Stanford University"
                  initials="SC"
                />
                <TestimonialCard
                  quote="I use it with my PhD students to teach them how to structure research introductions. The sentence-level breakdown makes rhetorical moves tangible and easy to discuss."
                  name="Prof. James Miller"
                  affiliation="Linguistics Department, University of Oxford"
                  initials="JM"
                />
                <TestimonialCard
                  quote="As a non-native English speaker, understanding the expected flow of a scientific introduction was always a challenge. This tool gives me objective feedback instantly."
                  name="Dr. Amara Diallo"
                  affiliation="Research Fellow, Université Paris-Saclay"
                  initials="AD"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-r from-purple-600 to-indigo-600">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="flex flex-col items-center text-center space-y-6"
            >
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-white">
                Ready to Strengthen Your Introduction?
              </h2>
              <p className="max-w-[600px] text-purple-100 md:text-lg">
                Join hundreds of researchers already using IMRAD Analyzer to
                write clearer, more structured introductions.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="h-11 px-8 bg-white text-purple-700 hover:bg-purple-50 font-semibold"
                  asChild
                >
                  <Link href="/sign-up">
                    Start for Free
                    <ZapIcon className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-11 px-8 border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="#pricing">View Pricing</Link>
                </Button>
              </div>
              <p className="text-purple-200 text-sm flex items-center gap-2">
                <UsersIcon className="h-4 w-4" />
                No credit card required · Free tier always available
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section id="pricing">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <Pricing
              isAuthenticated={false}
              pricingList={[
                getFreePricingList("#"),
                getMonthlyPricingList("/sign-up"),
                getYearlyPricingList("/sign-up"),
              ]}
            />
          </motion.div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto py-12">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BookOpenIcon className="h-5 w-5 text-primary" />
                <span className="font-bold text-white text-sm">IMRAD Analyzer</span>
              </div>
              <p className="text-xs leading-relaxed">
                AI-powered scientific writing analysis. Built for researchers,
                by researchers.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Product</h4>
              <ul className="space-y-2 text-xs">
                {["Features", "How It Works", "Pricing"].map((item) => (
                  <li key={item}>
                    <Link
                      href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                      className="hover:text-white transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Resources</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="#" className="hover:text-white transition-colors">Research Background</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Swales CARS Model</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">IMRAD Moves Guide</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2 text-xs">
                <li><Link href="#" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs">© 2025 IMRAD Analyzer. All rights reserved.</p>
            <p className="text-xs">Made with care for the academic community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
