"use client";

import { PopularPlanType, PricingList } from "@/common/general";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

type PaymentLinkProps = {
  paymentLink?: string;
  text: string;
  isAuthenticated: boolean;
};

const PaymentLink = ({
  paymentLink,
  text,
  isAuthenticated,
}: PaymentLinkProps) => {
  return (
    <Link
      href={isAuthenticated ? paymentLink : "/login"}
      className={buttonVariants({
        variant: "default",
        size: "lg",
        className: "w-full",
      })}
      onClick={() => {
        if (paymentLink && !isAuthenticated) {
          localStorage.setItem("stripePaymentLink", paymentLink);
        }
      }}
    >
      {text}
    </Link>
  );
};

const MotionCard = motion(Card);
const MotionBadge = motion(Badge);

export function Pricing({
  pricingList,
  isAuthenticated,
}: {
  pricingList: PricingList[];
  isAuthenticated: boolean;
}) {
  return (
    <section id="pricing" className="container py-24 sm:py-32">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Get Unlimited Access
      </motion.h2>
      <motion.p
        className="text-xl text-center text-muted-foreground max-w-2xl mx-auto mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Choose the perfect plan to unlock all features and take your experience
        to the next level.
      </motion.p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingList.map((pricing: PricingList, index: number) => (
          <MotionCard
            key={pricing.title}
            className={`relative overflow-hidden ${
              pricing.popular === PopularPlanType.YES
                ? "border-primary shadow-lg"
                : "hover:border-primary transition-colors duration-300"
            }`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          >
            <CardHeader className="text-center p-6">
              <CardTitle className="text-2xl font-bold mb-2">
                {pricing.title}
              </CardTitle>
              <div className="mb-4">
                <span className="text-5xl font-extrabold">
                  ${pricing.price}
                </span>
                <span className="text-gray-100 ml-2">{pricing.billing}</span>
              </div>
              <CardDescription className="text-md">
                {pricing.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <h4 className="font-semibold mb-4 flex items-center text-lg">
                <Zap className="mr-2 h-5 w-5 text-primary" />
                Plan Features
              </h4>
              <ul className="space-y-3 text-sm">
                {pricing.benefitList.map(
                  (benefit: string, benefitIndex: number) => (
                    <motion.li
                      key={benefit}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.1 + benefitIndex * 0.1,
                      }}
                    >
                      <Check className="text-primary mr-2 flex-shrink-0 h-5 w-5" />
                      <span>{benefit}</span>
                    </motion.li>
                  ),
                )}
              </ul>
            </CardContent>
            <CardFooter className="p-6">
              <PaymentLink
                isAuthenticated={isAuthenticated}
                text={pricing.buttonText}
                paymentLink={pricing.paymentLink}
              />
            </CardFooter>
          </MotionCard>
        ))}
      </div>
    </section>
  );
}
