import { callService } from "@/lib/service-client";
import {
  IntroductionDto,
  IntroductionDtoType,
} from "../validation/introductionDto";
import { IntroductionStatsDto } from "../validation/introductionStatsDto";
import { RetrieverParamsDtoType } from "../validation/RetrieverParamsDto";
import { getPaginatedResults } from "../validation/paginationMakerDto";
import {
  CreateSentenceFeedbackDto,
  SentenceFeedbackDto,
  SentenceFeedbacksDto,
  SentenceFindParamsDtoType,
} from "../validation/feedbackDto";
import { DashboardStatsDto } from "../validation/DashboardStatsDto";

const SERVICE = "USER-DATA-SERVICE";

type PaginatedResponse = {
  data: object[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
};

export const createIntroduction = async (
  introduction: IntroductionDtoType,
  isPremium: boolean = false,
) => {
  await callService(SERVICE, "post", "/introductions", {
    data: { ...introduction, isPremium },
  });
};

export const getIntroductionsStats = async (
  userId: string,
  role: "User" | "Admin",
) => {
  const data = await callService(SERVICE, "get", "/introductions/stats", {
    params: { ...(role === "User" ? { userId } : {}) },
  });
  return IntroductionStatsDto.parseAsync(data);
};

export const getIntroductions = async (
  userId: string,
  params: RetrieverParamsDtoType,
  role: "Admin" | "User" = "User",
) => {
  const data = await callService<PaginatedResponse>(SERVICE, "get", "/introductions", {
    params: { ...params, ...(role === "User" ? { userId } : {}) },
  });
  return getPaginatedResults(data, IntroductionDto);
};

export const getIntroduction = async (
  id: string,
  userId: string,
  role: "Admin" | "User" = "User",
) => {
  const data = await callService(SERVICE, "get", `/introductions/${id}`, {
    params: { ...(role === "User" ? { userId } : {}) },
  });
  return IntroductionDto.parseAsync(data);
};

export const createSentenceFeedback = async (
  { feedback, introductionId, sentenceId }: CreateSentenceFeedbackDto,
  userId: string,
) => {
  await callService(
    SERVICE,
    "post",
    `/introductions/${introductionId}/sentences/${sentenceId}/feedback/users/${userId}`,
    { data: { feedback } },
  );
};

export const getAllAFeedbacks = async () => {
  const data = await callService(SERVICE, "get", "/introductions/feedbacks/all");
  return SentenceFeedbacksDto.parse(data);
};

export const getFeedbacks = async (
  params: RetrieverParamsDtoType,
  userId?: string,
  role: "Admin" | "User" = "User",
) => {
  const data = await callService<PaginatedResponse>(SERVICE, "get", "/introductions/feedbacks", {
    params: { ...params, ...(role === "Admin" ? {} : { userId }) },
  });
  return getPaginatedResults(data, SentenceFeedbackDto);
};

export const deleteFeedback = async ({
  introductionId,
  sentenceId,
}: SentenceFindParamsDtoType) => {
  await callService(
    SERVICE,
    "delete",
    `/introductions/${introductionId}/sentences/${sentenceId}/feedbacks`,
  );
};

export const getDashboardStats = async () => {
  const data = await callService(
    SERVICE,
    "get",
    "/introductions/dashboard/stats",
  );
  return DashboardStatsDto.parseAsync(data);
};
