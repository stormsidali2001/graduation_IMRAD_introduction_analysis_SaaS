import { IntroductionsStats } from "./IntroductionsStats";
import { IntroductionsTable } from "./IntroductionsTable";
import { getIntroductionsAction } from "@/server/actions/get-introductions";
import { getNextPage, getPrevPage } from "@/common/getPage";
import { getIntroductionStatsAction } from "@/server/actions/get-inroductions-stats";
import { SectionBadge } from "@/components/ui/section-badge";
import { GradientHeading } from "@/components/ui/gradient-heading";

export default async function Page({
  searchParams: { search },
  params: { page: p },
}) {
  const res = await getIntroductionsAction({
    search,
    page: p[0],
  });
  const introductions = res?.data;
  if (!introductions) {
    throw new Error("Failed to fetch the introductions");
  }

  const stats = (await getIntroductionStatsAction({}))?.data ?? {};

  const next = getNextPage({
    page: introductions.page,
    total_pages: introductions.total_pages,
  });
  const nextPage =
    next === introductions.page ? null : `/introductions/all/${next}`;
  const prev = getPrevPage({ page: introductions.page });
  const previousPage =
    prev === introductions.page ? null : `/introductions/all/${prev}`;

  return (
    <div className="flex flex-col h-full">
      <main className="flex-1 overflow-auto">
        <div className="grid gap-4 p-4 sm:p-6">
          <div className="space-y-2">
            <SectionBadge>History</SectionBadge>
            <GradientHeading className="text-3xl">Introduction History</GradientHeading>
            <p className="text-gray-500 text-sm">Browse and review all your analyzed introductions.</p>
          </div>
          <IntroductionsStats {...stats} />
          <IntroductionsTable
            {...introductions}
            nextPage={nextPage}
            previousPage={previousPage}
          />
        </div>
      </main>
    </div>
  );
}

