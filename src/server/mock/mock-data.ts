import fs from "fs/promises";
import path from "path";
import { split } from "sentence-splitter";
import { makeMockPredictions } from "./mock-predictions";
import type { IntroductionDtoType } from "@/server/validation/introductionDto";
import type { IntroductionStatsDto } from "@/server/validation/introductionStatsDto";
import type { DashboardStatsDtoType } from "@/server/validation/DashboardStatsDto";
import type { SentenceFeedbackDtoType } from "@/server/validation/feedbackDto";
import type { UserDtoType } from "@/server/validation/UserDto";

type PaginatedResult<T> = {
  data: T[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
};

// ─── Introductions — loaded from test_intros.json (same logic as the seeder) ─

let _introductionsCache: IntroductionDtoType[] | null = null;

async function loadIntroductionsFromJson(): Promise<IntroductionDtoType[]> {
  if (_introductionsCache) return _introductionsCache;

  const jsonPath = path.join(process.cwd(), "public/test_intros.json");
  const raw = await fs.readFile(jsonPath, "utf8");
  const parsed = JSON.parse(raw);
  const texts: string[] = (Object.values(parsed["text"]) as string[]).slice(0, 10);

  _introductionsCache = texts.map((text, i) => {
    const sentences = split(text)
      .map((o) => o.raw)
      .filter((s) => s.length > 5);
    const predictions = makeMockPredictions(sentences);
    return {
      id: `mock-intro-${i + 1}`,
      sha: `mock-sha-${i + 1}`,
      userId: "preview-user-id",
      sentences: predictions.map((p, order) => ({
        id: `s-${i + 1}-${order}`,
        text: p.sentence,
        move: p.move,
        subMove: p.subMove,
        order,
        moveConfidence: p.moveConfidence,
        subMoveConfidence: p.subMoveConfidence,
      })),
    };
  });

  return _introductionsCache;
}

export const getMockIntroductions = async (params: {
  page?: number;
  search?: string;
}): Promise<PaginatedResult<IntroductionDtoType>> => {
  const all = await loadIntroductionsFromJson();
  const page = params.page ?? 1;
  const perPage = 6;
  const start = (page - 1) * perPage;
  const data = all.slice(start, start + perPage);
  return {
    data,
    page,
    per_page: perPage,
    total: all.length,
    total_pages: Math.ceil(all.length / perPage),
  };
};

export const getMockIntroductionById = async (
  id: string,
): Promise<IntroductionDtoType> => {
  const all = await loadIntroductionsFromJson();
  return all.find((i) => i.id === id) ?? all[0];
};

export const getMockIntroductionStats = async (): Promise<IntroductionStatsDto> => {
  const all = await loadIntroductionsFromJson();
  const totalSentences = all.flatMap((i) => i.sentences);
  const byMove = [0, 1, 2].map((move) => ({
    move,
    count: totalSentences.filter((s) => s.move === move).length,
  }));
  return {
    totalIntroductions: all.length,
    totalIntroductionsByMove: byMove,
    averageConfidenceScore: {
      avgMoveConfidence: 0.87,
      avgSubMoveConfidence: 0.81,
    },
    averageConfidenceScoreByMove: [
      { move: 0, avgMoveConfidence: 0.89, avgSubMoveConfidence: 0.83 },
      { move: 1, avgMoveConfidence: 0.84, avgSubMoveConfidence: 0.77 },
      { move: 2, avgMoveConfidence: 0.91, avgSubMoveConfidence: 0.86 },
    ],
    averageSentencePositionScore: { avgOrder: 2.4 },
    averageSentencePositionScoreByMove: [
      { move: 0, avgOrder: 1.2 },
      { move: 1, avgOrder: 2.5 },
      { move: 2, avgOrder: 3.8 },
    ],
  };
};

// ─── Dashboard Stats ────────────────────────────────────────────────────────

export const getMockDashboardStats = async (): Promise<DashboardStatsDtoType> => {
  const all = await loadIntroductionsFromJson();
  return {
    total: all.flatMap((i) => i.sentences).length,
    avgMoveConfidence: 0.87,
    avgSubMoveConfidence: 0.81,
    totalFeedbacks: 18,
  };
};

// ─── Feedbacks ───────────────────────────────────────────────────────────────

const MOCK_FEEDBACKS: SentenceFeedbackDtoType[] = [
  {
    sentenceId: "s-1-2",
    introductionId: "mock-intro-1",
    sentenceText: "However, existing models often require large amounts of labeled data to achieve good performance.",
    move: 1,
    subMove: 0,
    feedback: { liked: true, username: "Demo User", image: null },
  },
  {
    sentenceId: "s-2-2",
    introductionId: "mock-intro-2",
    sentenceText: "Despite these findings, the mechanisms driving regional precipitation changes remain poorly understood.",
    move: 1,
    subMove: 2,
    feedback: { liked: false, correctMove: 1, correctSubMove: 1, reason: "Should be sub-move 1, not 2", username: "Demo User", image: null },
  },
  {
    sentenceId: "s-3-2",
    introductionId: "mock-intro-3",
    sentenceText: "However, these models are computationally expensive and require significant hardware resources for fine-tuning.",
    move: 1,
    subMove: 0,
    feedback: { liked: true, username: "Demo User", image: null },
  },
];

export const getMockFeedbacks = (): PaginatedResult<SentenceFeedbackDtoType> => ({
  data: MOCK_FEEDBACKS,
  page: 1,
  per_page: 6,
  total: MOCK_FEEDBACKS.length,
  total_pages: 1,
});

export const getMockFeedbacksArray = (): SentenceFeedbackDtoType[] => MOCK_FEEDBACKS;

// ─── Users ───────────────────────────────────────────────────────────────────

const MOCK_USERS: UserDtoType[] = [
  {
    id: "preview-user-id",
    name: "Demo User",
    email: "demo@preview.com",
    image: null,
    createdAt: new Date("2024-01-01"),
    customerId: "preview-customer-id",
    isBanned: false,
    role: "User",
    plan: "premium",
    emailVerified: new Date("2024-01-01"),
  },
  {
    id: "user-2",
    name: "Dr. Sarah Chen",
    email: "sarah.chen@stanford.edu",
    image: null,
    createdAt: new Date("2024-02-15"),
    customerId: "cus_preview_2",
    isBanned: false,
    role: "User",
    plan: "premium",
    emailVerified: new Date("2024-02-15"),
  },
  {
    id: "user-3",
    name: "Prof. James Miller",
    email: "j.miller@oxford.ac.uk",
    image: null,
    createdAt: new Date("2024-03-10"),
    customerId: "cus_preview_3",
    isBanned: false,
    role: "User",
    plan: "free",
    emailVerified: new Date("2024-03-10"),
  },
  {
    id: "user-4",
    name: "Dr. Amara Diallo",
    email: "a.diallo@univ-paris.fr",
    image: null,
    createdAt: new Date("2024-03-22"),
    customerId: "cus_preview_4",
    isBanned: false,
    role: "User",
    plan: "free",
    emailVerified: new Date("2024-03-22"),
  },
  {
    id: "preview-admin-id",
    name: "Admin",
    email: "admin@preview.com",
    image: null,
    createdAt: new Date("2024-01-01"),
    customerId: "cus_preview_admin",
    isBanned: false,
    role: "Admin",
    plan: "premium",
    emailVerified: new Date("2024-01-01"),
  },
];

export const getMockUsers = (): PaginatedResult<UserDtoType> => ({
  data: MOCK_USERS,
  page: 1,
  per_page: 6,
  total: MOCK_USERS.length,
  total_pages: 1,
});

export const getMockSubscriptions = () => {
  const premiumUsers = MOCK_USERS.filter((u) => u.plan === "premium");
  return {
    data: premiumUsers.map((u) => ({
      id: `sub_${u.id}`,
      userId: u.id,
      plan: "premium",
      period: "monthly",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2025-01-01"),
      User: u,
    })),
    page: 1,
    per_page: 6,
    total: premiumUsers.length,
    total_pages: 1,
  };
};
