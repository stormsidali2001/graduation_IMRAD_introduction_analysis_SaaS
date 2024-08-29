import { getAllFeedbacksAction } from "@/server/actions/get-all-feedbacks";
import RecentFeedbacksContainer from "./RecentFeedbacksContainer";
export const RecentFeedbacksTable = async () => {
  try {
    const feedbacks = (await getAllFeedbacksAction({ page: 1 }))?.data;
    return <RecentFeedbacksContainer feedbacks={feedbacks} />;
  } catch (err) {
    console.error(err);
  }
};
