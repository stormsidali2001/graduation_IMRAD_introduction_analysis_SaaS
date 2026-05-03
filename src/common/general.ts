export const RESET_REQUEST_EXPIRATION_DELAY = 15 * 60 * 1000;
export enum PopularPlanType {
  NO = 0,
  YES = 1,
}
export interface PricingList {
  title: string;
  popular: PopularPlanType;
  price: number;
  description: string;
  buttonText: string;
  benefitList: string[];
  href: string;
  billing: string;
  paymentLink?: string;
}
export const PAGE_SIZE = 6;
type PricingListFn = (paymentLink: string) => PricingList;

export const getFreePricingList: PricingListFn = (paymentLink: string) => ({
  title: "Free Plan",
  popular: 0,
  price: 0,
  description: "Perfect for individual researchers exploring AI-assisted writing analysis.",
  buttonText: "Get Started",
  benefitList: ["Move analysis", "Sub-move analysis", "Analysis history"],
  href: "/login",
  paymentLink,
  billing: "/month",
});
export const getMonthlyPricingList: PricingListFn = (paymentLink: string) => ({
  title: "Monthly Premium",
  popular: 1,
  price: 10,
  description: "For active researchers needing full analytical depth and history.",
  buttonText: "Buy Now",
  benefitList: [
    "Move analysis",
    "Sub-move analysis",
    "Analysis history",
    "Introduction summary",
    "Problematic sentence detection",
    "Author intent analysis",
  ],
  href: "/api/auth/login",
  paymentLink,
  billing: "/month",
});

export const getYearlyPricingList: PricingListFn = (paymentLink: string) => ({
  title: "Yearly Premium",
  popular: 0,
  price: 99,
  description: "Best value for sustained research programs. Save 17% vs monthly.",
  buttonText: "Buy Now",
  benefitList: [
    "Move analysis",
    "Sub-move analysis",
    "Analysis history",
    "Introduction summary",
    "Problematic sentence detection",
    "Author intent analysis",
  ],
  href: "/api/auth/login",
  paymentLink,
  billing: "/year",
});
