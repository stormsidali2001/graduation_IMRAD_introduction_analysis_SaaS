import { IntroductionAnalysis } from "@/app/IntroductionAnalysis";
import { Badge } from "@/components/ui/badge";
import { getSession } from "@/lib/get-session";
import { getIntroductionAction } from "@/server/actions/get-introduction";
import { redirect } from "next/navigation";
import Markdown from "react-markdown";

const Page = async ({ params: { id } }) => {
  const session = await getSession();
  if (!session) redirect("/login");
  const { user } = session;

  const res = await getIntroductionAction({ id });
  const introduction = res.data;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="space-y-8">
        <div className="text-center space-y-3">
          <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200 text-xs font-semibold rounded-full">
            Analysis
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-500">
            Introduction Details
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-gray-500 md:text-xl">
            Explore the details of the introduction and provide feedback on the
            predicted moves and submoves.
          </p>
        </div>
        {(user.role === "Admin" || user.plan === "premium") &&
        introduction.summary ? (
          <div className="bg-white/70 backdrop-blur-sm border border-gray-100 shadow-md rounded-xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">Summary</h2>
              <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200 font-semibold">
                Premium
              </Badge>
            </div>
            <Markdown className="text-gray-600 prose prose-sm max-w-none">
              {introduction.summary}
            </Markdown>
          </div>
        ) : null}

        {(user.role === "Admin" || user.plan === "premium") &&
        introduction.classBasedSummary ? (
          <div className="bg-white/70 backdrop-blur-sm border border-gray-100 shadow-md rounded-xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">Class Based Summary</h2>
              <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200 font-semibold">
                Premium
              </Badge>
            </div>
            <Markdown className="text-gray-600 prose prose-sm max-w-none">
              {introduction.classBasedSummary}
            </Markdown>
          </div>
        ) : null}

        <IntroductionAnalysis
          hideFeedbacks={user.role === "Admin"}
          sentences={introduction.sentences.map((s) => ({
            sentence: s.text,
            id: s.id,
            introductionId: introduction.id,
            move: s.move,
            subMove: s.subMove,
            moveConfidence: s.moveConfidence,
            subMoveConfidence: s.subMoveConfidence,
            feedback: s.feedback,
          }))}
        />
      </div>
    </div>
  );
};
export default Page;
