import { IntroductionAnalysis } from "@/app/IntroductionAnalysis";
import { Button } from "@/components/ui/button";
import { getIntroductionAction } from "@/server/actions/get-introduction";

const Page = async ({ params: { id } }) => {
  const res = await getIntroductionAction({ id });
  const introduction = res.data;

  console.log(introduction);
  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Introduction Details
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            Explore the details of the introduction and provide feedback on the
            predicted moves and submoves.
          </p>
        </div>
        <div className="bg-card rounded-lg p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Summary</h2>
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-md text-sm font-medium">
              Premium
            </div>
          </div>
          <p className="text-muted-foreground">
            This section provides a high-level summary of the introduction,
            including the key points and overall strategy. As a premium user,
            you have access to this exclusive content.
          </p>
        </div>

        <IntroductionAnalysis
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
