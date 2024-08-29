import { motion } from "framer-motion";
import FeedbackCard from "@/components/ui/feedback-card";
import { getAllFeedbacksAction } from "@/server/actions/get-all-feedbacks";
import { redirect } from "next/navigation";
import { movesDict, subMoveDict } from "@/common/moves";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getNextPage, getPrevPage } from "@/common/getPage";
import { auth } from "@/lib/auth";
import { MasonryGrid } from "../_partials/MasonryGrid";
import { Feedbacks } from "../_partials/Feedbacks";

const Page = async ({ params, searchParams: { search } }) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const { user } = session;

  try {
    const feedbacks = (
      await getAllFeedbacksAction({ page: params.page[0], search })
    )?.data;
    if (!feedbacks) {
      throw new Error("Feedbacks fetching error");
    }

    const next = getNextPage({
      page: feedbacks.page,
      total_pages: feedbacks.total_pages,
    });
    const nextPage = next === feedbacks.page ? null : `/feedbacks/${next}`;
    const prev = getPrevPage({ page: feedbacks.page });
    const previousPage = prev === feedbacks.page ? null : `/feedbacks/${prev}`;

    return (
      <Feedbacks
        user={user}
        feedbacks={feedbacks}
        nextPage={nextPage}
        previousPage={previousPage}
      />
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export default Page;
