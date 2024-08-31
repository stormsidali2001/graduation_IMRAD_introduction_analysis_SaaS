import { getAllAFeedbacks } from "../services/user-data";

export const downloadFeedbackUseCase = async () => {
  try {
    const feedbacks = await getAllAFeedbacks();
    console.log("feedbacks---->", feedbacks);
    if (!feedbacks) {
      throw new Error("Could not find any feedbacks");
    }

    return JSON.stringify(feedbacks, null, 2);
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
