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
    console.log("--------------");
    console.log("feedback", feedbacks.total);
    const next = getNextPage({
      page: feedbacks.page,
      total_pages: feedbacks.total_pages,
    });
    const nextPage = next === feedbacks.page ? null : `/feedbacks/${next}`;
    const prev = getPrevPage({ page: feedbacks.page });
    const previousPage = prev === feedbacks.page ? null : `/feedbacks/${prev}`;

    return (
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <div className="space-y-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Feedbacks
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
              {user.role !== "Admin" && feedbacks.total > 0 ? (
                <>
                  Thanks for Your contribution! You've submitted a total of{" "}
                  {feedbacks.total} feedbacks.
                </>
              ) : null}
              .Explore and learn from your submitted feedbacks.
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {feedbacks?.data
                ?.filter((f) => f && f.feedback)
                .map((f) => (
                  <FeedbackCard
                    key={f.sentenceId}
                    introductionId={f.introductionId}
                    sentenceId={f.sentenceId}
                    sentenceText={f.sentenceText}
                    predictedMove={movesDict[f.move]}
                    correctMove={movesDict[f.feedback.correctMove]}
                    username={f.feedback.username}
                    image={f.feedback.image}
                    reason={f.feedback.reason}
                    userHandle={f.feedback.username}
                    correctSubMove={
                      !f?.feedback?.liked
                        ? subMoveDict[f.feedback.correctMove][
                            f.feedback.correctSubMove
                          ]
                        : null
                    }
                    predictedSubMove={subMoveDict[f.move][f.subMove]}
                  />
                ))}
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  {previousPage ? (
                    <PaginationPrevious href={previousPage} />
                  ) : null}
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  {nextPage ? <PaginationNext href={nextPage} /> : null}
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export default Page;
