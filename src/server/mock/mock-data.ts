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

const MOCK_SUMMARIES = [
  "This introduction establishes the relevance of machine learning in scientific domains, identifies the gap of limited labeled data for supervised models, and proposes a semi-supervised framework as the occupying contribution.",
  "The authors build context around climate variability research, highlight the insufficient mechanistic understanding of regional precipitation drivers, and position their work as addressing this critical gap.",
  "The introduction contextualizes the rapid adoption of large language models, critiques the prohibitive computational cost of fine-tuning, and presents a parameter-efficient adaptation method as the primary contribution.",
  "A foundation in biomedical imaging is established, followed by a critique of existing segmentation approaches that fail under low-contrast conditions, before the authors introduce their contrastive learning solution.",
  "The introduction grounds the reader in graph neural network literature, exposes the over-smoothing limitation in deep architectures, and occupies the niche with a residual aggregation mechanism.",
  "Autonomous driving safety is positioned as a societal priority, prior sensor-fusion approaches are critiqued for latency issues, and the authors introduce a real-time multi-modal fusion pipeline.",
  "The authors trace federated learning's promise for privacy-preserving AI, surface the non-IID data heterogeneity problem, and propose a personalized aggregation strategy as their solution.",
  "Quantum computing's potential for combinatorial optimization is established, classical heuristic limitations are highlighted, and a variational quantum algorithm is proposed for the NP-hard scheduling problem.",
  "The introduction situates transformer-based protein structure prediction, identifies the challenge of multi-chain complex modeling, and introduces an equivariant attention mechanism for the task.",
  "Causal inference methods in observational studies are reviewed, confounding variable limitations in existing approaches are critiqued, and a propensity-score matching framework augmented with deep representations is contributed.",
];

const MOCK_CLASS_SUMMARIES = [
  "**Move 1 (Establishing Territory):** The research area of supervised deep learning is introduced as highly impactful. **Move 2 (Establishing Niche):** The dependency on large labeled datasets is identified as a critical bottleneck. **Move 3 (Occupying Niche):** A semi-supervised framework leveraging unlabeled data is proposed, validated on three benchmark datasets.",
  "**Move 1:** Climate change and regional hydrology are framed as pressing research domains. **Move 2:** The lack of mechanistic models for precipitation patterns is highlighted as a gap. **Move 3:** A high-resolution dynamical downscaling approach is proposed and evaluated across five climate scenarios.",
  "**Move 1:** The transformative impact of LLMs across NLP tasks is established. **Move 2:** Computational barriers to fine-tuning are identified as limiting accessibility. **Move 3:** A low-rank adaptation (LoRA) variant achieving comparable performance at 3% of trainable parameters is introduced.",
  "**Move 1:** Medical image segmentation's clinical importance is asserted. **Move 2:** Boundary ambiguity in low-contrast MRI scans is identified as unsolved. **Move 3:** A contrastive boundary-aware segmentation network is proposed with state-of-the-art Dice scores.",
  "**Move 1:** GNNs are established as the dominant paradigm for graph-structured data. **Move 2:** Over-smoothing degradation in deep GNNs is surfaced as a fundamental limitation. **Move 3:** A residual graph attention network with adaptive depth selection is introduced.",
  "**Move 1:** The importance of autonomous vehicle perception is framed around safety statistics. **Move 2:** Latency bottlenecks in existing multi-modal fusion are critiqued. **Move 3:** A lightweight asynchronous sensor fusion module is proposed with real-time inference benchmarks.",
  "**Move 1:** Federated learning is positioned as essential for privacy-preserving healthcare AI. **Move 2:** Data heterogeneity across clinical sites is identified as degrading global model performance. **Move 3:** A personalized federated aggregation strategy with client clustering is contributed.",
  "**Move 1:** Quantum advantage for optimization problems is established theoretically. **Move 2:** NISQ-era noise limitations of existing VQE approaches are critiqued. **Move 3:** A noise-resilient variational circuit for job-shop scheduling is proposed and simulated.",
  "**Move 1:** AlphaFold's impact on structural biology is acknowledged as transformative. **Move 2:** Multi-chain protein complex modeling is identified as an open challenge. **Move 3:** An SE(3)-equivariant cross-chain attention module is introduced with improved TM-score on CASP15.",
  "**Move 1:** Observational study methodology in epidemiology is established as essential. **Move 2:** Residual confounding in standard propensity scoring is highlighted as a validity threat. **Move 3:** A deep representation-augmented matching framework is proposed with improved covariate balance.",
];

const MOCK_THOUGHT_PROCESSES = [
  "The author likely began by asking: *'Why should the reader care about this problem?'* Starting from the broad impact of AI on science, they then narrowed to the specific bottleneck — labeled data scarcity — reasoning that this constraint prevents practitioners from applying powerful models to domains where annotation is expensive. The pivot to semi-supervised learning was motivated by the intuition that unlabeled data, abundant and free, could substitute for missing labels if the right inductive bias was applied.",
  "The author's reasoning appears to follow a funnel: *global concern → regional gap → specific contribution*. Beginning with the well-established consensus on anthropogenic climate change, the author likely identified precipitation modeling as an underserved sub-domain — perhaps drawing from reviewer feedback or field surveys showing practitioners lacking reliable downscaling tools. The niche was occupied by emphasizing mechanistic interpretability over black-box approaches.",
  "The author seems to have started from a practitioner pain point: *'We have these powerful models but cannot afford to use them.'* The establishment of LLM capabilities is brief and confident — suggesting the author assumes reader familiarity — before pivoting immediately to the cost problem. The thought process culminates in a contribution framed not as a new model but as a new way to adapt existing ones, which strategically positions the work as broadly applicable.",
  "Medical imaging literature often opens with mortality statistics to justify urgency — this author follows that convention before quickly grounding in the specific technical failure mode. The hypothetical thought process is: *'What is the one thing that existing segmentation methods cannot handle?'* The answer — low-contrast boundaries — becomes the organizing argument for every subsequent design choice in the proposed method.",
  "The author appears to have structured their thinking around a known theoretical limitation in the GNN literature. The thought process seems to be: *'Over-smoothing is accepted as a limitation; why has no one solved it with residual connections borrowed from CNNs?'* This cross-domain analogy drives both the problem framing and the solution, making the contribution feel both novel and intuitive to a deep learning audience.",
  "Safety statistics are a rhetorical anchor — the author likely chose them deliberately to align the work with high-stakes societal value before the technical content begins. The internal question driving the introduction is: *'What is the one practical barrier between current systems and deployment?'* Latency emerges as the answer, and the contribution is specifically scoped to address it without sacrificing accuracy.",
  "The author's thought process appears shaped by a real-world deployment challenge in healthcare AI: federated training works in theory but degrades in practice when hospital data distributions diverge. The hypothetical reasoning is: *'If I were a hospital administrator, what would stop me from adopting federated learning?'* Data heterogeneity is the answer, and the contribution directly addresses the administrator's concern through personalization.",
  "Quantum computing introductions face the challenge of building credibility before proposing applications. This author's thought process seems to be: *'How do I convince a classical CS audience that this is worth reading?'* The strategy — grounding in NP-hardness before introducing quantum — is a deliberate bridge. The contribution is carefully scoped to NISQ-era hardware to avoid over-promising.",
  "The author leverages AlphaFold's celebrity status as an establishment move, then immediately acknowledges its blind spot — multi-chain complexes — as the niche. The hypothetical reasoning is: *'What would AlphaFold's creators have done next if they focused on complexes?'* This framing positions the contribution as a natural successor rather than a competing system, likely a deliberate choice to appeal to a broad structural biology audience.",
  "The author's thought process appears grounded in methodological concern: *'When we publish observational study results, can we trust them?'* Starting from this epistemological question, the introduction builds the case that standard propensity scoring leaves residual confounding — a subtle but important validity gap. The deep learning augmentation is positioned as a precision instrument, not a replacement of existing methodology.",
];

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
      summary: MOCK_SUMMARIES[i],
      classBasedSummary: MOCK_CLASS_SUMMARIES[i],
      authorHypotheticalThoughtProcess: MOCK_THOUGHT_PROCESSES[i],
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
