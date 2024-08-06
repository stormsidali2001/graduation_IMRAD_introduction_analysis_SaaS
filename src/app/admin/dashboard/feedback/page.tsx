const Page = async () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Feedbacks
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-muted-foreground md:text-xl">
            feedback description here
          </p>
        </div>
        <div className="bg-card rounded-lg p-6 md:p-8 space-y-6">
          <p className="text-muted-foreground">
            This section provides a high-level summary of the introduction,
            including the key points and overall strategy. As a premium user,
            you have access to this exclusive content.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Page;
