"use client";
import { movesDict, subMoveDict } from "@/common/moves";
import FeedbackCard from "@/components/ui/feedback-card";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export const MasonryGrid = ({ feedbacks }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const grid = gridRef.current;
      if (grid) {
        const rowHeight = parseInt(
          getComputedStyle(grid).getPropertyValue("grid-auto-rows"),
        );
        const rowGap = parseInt(
          getComputedStyle(grid).getPropertyValue("grid-row-gap"),
        );

        grid.querySelectorAll(".masonry-item").forEach((item) => {
          const rowSpan = Math.ceil(
            (item.querySelector(".masonry-content").getBoundingClientRect()
              .height +
              rowGap) /
              (rowHeight + rowGap),
          );
          item.style.gridRowEnd = `span ${rowSpan}`;
        });
      }
    });

    if (gridRef.current) {
      resizeObserver.observe(gridRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[20px]"
    >
      {feedbacks
        ?.filter((f) => f && f.feedback)
        .map((f, index) => (
          <motion.div
            key={f.sentenceId}
            className="masonry-item"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="masonry-content">
              <FeedbackCard
                introductionId={f.introductionId}
                sentenceId={f.sentenceId}
                sentenceText={f.sentenceText}
                isLiked={f.feedback.liked}
                predictedMove={movesDict[f.move]}
                correctMove={movesDict[f.feedback.correctMove]}
                username={f.feedback.username}
                image={f.feedback.image}
                reason={f.feedback.reason}
                userHandle={f.feedback.username}
                correctSubMove={
                  !f?.feedback?.liked
                    ? subMoveDict[f.feedback.correctMove][
                        f.feedback.correctSubMove
                      ]
                    : null
                }
                predictedSubMove={subMoveDict[f.move][f.subMove]}
              />
            </div>
          </motion.div>
        ))}
    </div>
  );
};
