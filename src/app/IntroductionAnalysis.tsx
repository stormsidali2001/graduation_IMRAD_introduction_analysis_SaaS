import React from "react";
import { SentenceRow } from "./_partials/sentenceRow";
import { ArrowDown } from "lucide-react";

export const IntroductionAnalysis = ({ sentences }) => (
  <div className="grid gap-4">
    {sentences.map((sentence, index) => {
      return (
        <>
          <SentenceRow sentenceNumber={index + 1} {...sentence} key={index} />
          {index !== sentences.length - 1 && (
            <div className="w-full items-center flex justify-center">
              <ArrowDown className="w-6 h-6" />
            </div>
          )}
        </>
      );
    })}
  </div>
);
