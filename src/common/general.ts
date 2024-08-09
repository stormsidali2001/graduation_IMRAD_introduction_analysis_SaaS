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
export const PAGE_SIZE = 5;
type PricingListFn = (paymentLink: string) => PricingList;
export const getMonthlyPricingList: PricingListFn = (paymentLink: string) => ({
  title: "Monthly Premium",
  popular: 1,
  price: 10,
  description:
    "Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.",
  buttonText: "Buy Now",
  benefitList: [
    "4 Team member",
    "4 GB Storage",
    "Upto 6 pages",
    "Priority support",
    "lorem ipsum dolor",
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
    "10 Team member",
    "8 GB Storage",
    "Upto 10 pages",
    "Priority support",
    "lorem ipsum dolor",
  ],
  href: "/api/auth/login",
  paymentLink,
  billing: "/year",
});
