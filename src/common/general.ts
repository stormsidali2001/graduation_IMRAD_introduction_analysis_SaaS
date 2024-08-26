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
  description:
    "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
  buttonText: "Get Started",
  benefitList: ["Move analysis", "Sub move analysis", "Generation Histroy."],
  href: "/login",
  paymentLink,
  billing: "/month",
});
export const getMonthlyPricingList: PricingListFn = (paymentLink: string) => ({
  title: "Monthly Premium",
  popular: 1,
  price: 10,
  description:
    "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
  buttonText: "Buy Now",
  benefitList: [
    "Move analysis",
    "Sub move analysis",
    "Generation Histroy.",
    "Introduction Summary",
    "Problematic detection",
    "Author thoughts analysis",
  ],
  href: "/api/auth/login",
  paymentLink,
  billing: "/month",
});

export const getYearlyPricingList: PricingListFn = (paymentLink: string) => ({
  title: "Yearly Premium",
  popular: 0,
  price: 99,
  description:
    "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
  buttonText: "Buy Now",
  benefitList: [
    "Move analysis",
    "Sub move analysis",
    "Generation Histroy.",
    "Introduction Summary",
    "Problematic detection",
    "Author thoughts analysis",
  ],
  href: "/api/auth/login",
  paymentLink,
  billing: "/year",
});
