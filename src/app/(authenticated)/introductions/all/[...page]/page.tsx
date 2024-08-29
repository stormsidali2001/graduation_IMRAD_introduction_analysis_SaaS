import { IntroductionsStats } from "./IntroductionsStats";
import { IntroductionsTable } from "./IntroductionsTable";
import { getIntroductionsAction } from "@/server/actions/get-introductions";
import { getNextPage, getPrevPage } from "@/common/getPage";
import { getIntroductionStatsAction } from "@/server/actions/get-inroductions-stats";

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

  console.log("introductions", introductions);

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
  );
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
  );
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
  );
}
