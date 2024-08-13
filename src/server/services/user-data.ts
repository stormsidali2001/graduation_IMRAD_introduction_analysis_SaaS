import { eurekaClient } from "@/lib/eureka-client";
import {
  IntroductionDto,
  IntroductionDtoType,
} from "../validation/introductionDto";
import { balance } from "@/lib/server-utils";
import axios from "axios";
import { IntroductionStatsDto } from "../validation/introductionStatsDto";
import { RetrieverParamsDtoType } from "../validation/RetrieverParamsDto";
import { getPaginatedResults } from "../validation/paginationMakerDto";
import {
  CreateSentenceFeedbackDto,
  SentenceFeedbackDto,
  SentenceFindParamsDtoType,
} from "../validation/feedbackDto";
import { DashboardStatsDto } from "../validation/DashboardStatsDto";

export const createIntroduction = async (
  introduction: IntroductionDtoType,
  isPremium: boolean = false,
) => {
  const modelsAiInstances =
    eurekaClient.getInstancesByAppId("USER-DATA-SERVICE");
  console.log("modelsAiInstances", modelsAiInstances);
  const selectedInstance = balance(modelsAiInstances);
  if (!selectedInstance) {
    console.error("No user-data instance is available");
    return null;
  }

  const url =
    "http://" +
    "localhost" +
    `:${selectedInstance.port["$"]}` +
    "/introductions";
  console.log("url", url);
  const res = await axios.post(
    url,
    { ...introduction, isPremium },

    {
      withCredentials: true,
    },
  );
};

export const getIntroductionsStats = async (
  userId: string,
  role: "User" | "Admin",
) => {
  const modelsAiInstances =
    eurekaClient.getInstancesByAppId("USER-DATA-SERVICE");
  console.log("modelsAiInstances", modelsAiInstances);
  const selectedInstance = balance(modelsAiInstances);
  if (!selectedInstance) {
    console.error("No user-data instance is available");
    return null;
  }

  const url =
    "http://" +
    "localhost" +
    `:${selectedInstance.port["$"]}` +
    "/introductions/stats";
  console.log("url", url);
  const res = await axios.get(url, {
    withCredentials: true,
    params: {
      ...(role === "User" ? { userId } : {}),
    },
  });

  return IntroductionStatsDto.parseAsync(res?.data);
};

export const getIntroductions = async (
  userId: string,
  params: RetrieverParamsDtoType,
  role: "Admin" | "User" = "User",
) => {
  const modelsAiInstances =
    eurekaClient.getInstancesByAppId("USER-DATA-SERVICE");
  console.log("modelsAiInstances", modelsAiInstances);

  const selectedInstance = balance(modelsAiInstances);
  if (!selectedInstance) {
    console.error("No user-data instance is available");
    return null;
  }

  const url =
    "http://" +
    "localhost" +
    `:${selectedInstance.port["$"]}` +
    "/introductions";
  console.log("url", url);
  const res = await axios.get(url, {
    withCredentials: true,
    params: {
      ...params,
      ...(role === "User" ? { userId } : {}),
    },
  });

  console.log("code451", res.data);
  return getPaginatedResults(
    {
      ...res?.data,
    },
    IntroductionDto,
  );
};
export const getIntroduction = async (
  id: string,
  userId: string,
  role: "Admin" | "User" = "User",
) => {
  const modelsAiInstances =
    eurekaClient.getInstancesByAppId("USER-DATA-SERVICE");
  console.log("modelsAiInstances", modelsAiInstances);

  const selectedInstance = balance(modelsAiInstances);
  if (!selectedInstance) {
    console.error("No user-data instance is available");
    return null;
  }

  const url =
    "http://" +
    "localhost" +
    `:${selectedInstance.port["$"]}` +
    "/introductions/" +
    id;
  console.log("url", url);
  const res = await axios.get(url, {
    withCredentials: true,
    params: {
      ...(role === "User" ? { userId } : {}),
    },
  });
  console.log("code451", res.data);

  return IntroductionDto.parseAsync(res?.data);
};

export const createSentenceFeedback = async (
  { feedback, introductionId, sentenceId }: CreateSentenceFeedbackDto,
  userId: string,
) => {
  const modelsAiInstances =
    eurekaClient.getInstancesByAppId("USER-DATA-SERVICE");
  console.log("modelsAiInstances", modelsAiInstances);

  const selectedInstance = balance(modelsAiInstances);
  if (!selectedInstance) {
    console.error("No user-data instance is available");
    return null;
  }

  const url =
    "http://" +
    "localhost" +
    `:${selectedInstance.port["$"]}` +
    "/introductions/" +
    introductionId +
    "/sentences/" +
    sentenceId +
    "/feedback/users/" +
    userId;
  console.log("url", url);
  const res = await axios.post(
    url,
    { feedback },
    {
      withCredentials: true,
      params: {},
    },
  );
};

export const getAllFeedbacks = async (
  params: RetrieverParamsDtoType,
  userId?: string,
  role: "Admin" | "User" = "User",
) => {
  const modelsAiInstances =
    eurekaClient.getInstancesByAppId("USER-DATA-SERVICE");
  console.log("modelsAiInstances", modelsAiInstances);

  const selectedInstance = balance(modelsAiInstances);
  if (!selectedInstance) {
    console.error("No user-data instance is available");
    return null;
  }

  const url =
    "http://" +
    "localhost" +
    `:${selectedInstance.port["$"]}` +
    "/introductions/feedbacks";
  console.log("url", url);
  const res = await axios.get(url, {
    withCredentials: true,
    params: {
      ...params,
      ...(role === "Admin" ? {} : { userId }),
    },
  });

  console.log("code451", res.data);
  return getPaginatedResults(
    {
      ...res?.data,
    },
    SentenceFeedbackDto,
  );
};

export const deleteFeedback = async ({
  introductionId,
  sentenceId,
}: SentenceFindParamsDtoType) => {
  const modelsAiInstances =
    eurekaClient.getInstancesByAppId("USER-DATA-SERVICE");
  console.log("modelsAiInstances", modelsAiInstances);
  const selectedInstance = balance(modelsAiInstances);
  if (!selectedInstance) {
    console.error("No user-data instance is available");
    return null;
  }

  const url =
    "http://" +
    "localhost" +
    `:${selectedInstance.port["$"]}` +
    "/introductions/" +
    introductionId +
    "/sentences/" +
    sentenceId +
    "/feedbacks";
  console.log("url", url);
  await axios.delete(
    url,

    {
      withCredentials: true,
    },
  );
};

export const getDashboardStats = async () => {
  const modelsAiInstances =
    eurekaClient.getInstancesByAppId("USER-DATA-SERVICE");
  console.log("modelsAiInstances", modelsAiInstances);
  const selectedInstance = balance(modelsAiInstances);
  if (!selectedInstance) {
    console.error("No user-data instance is available");
    return null;
  }

  const url =
    "http://" +
    "localhost" +
    `:${selectedInstance.port["$"]}` +
    "/introductions/dashboard/stats";

  console.log("url", url);

  const res = await axios.get(
    url,

    {
      withCredentials: true,
    },
  );
  return DashboardStatsDto.parseAsync(res?.data);
};
