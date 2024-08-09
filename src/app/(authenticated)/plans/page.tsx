import { getMonthlyPricingList, getYearlyPricingList } from "@/common/general";
import { Pricing } from "@/components/ui/pricingCard";
import { getSubscriptionLinksAction } from "@/server/actions/get-subscription-links";

const Page = async () => {
  const { monthlyPlanLink, yearlyPlanLink } =
    (await getSubscriptionLinksAction({}))?.data || {};
  return (
    <>
      <Pricing
        pricingList={[
          getMonthlyPricingList(monthlyPlanLink),
          getYearlyPricingList(yearlyPlanLink),
        ]}
        isAuthenticated={true}
      />
    </>
  );
};
export default Page;
