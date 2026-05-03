import { callService } from "@/lib/service-client";
import { isPreviewMode } from "@/lib/preview-mode";

const MOCK_PDF_INTRODUCTION =
  "Machine learning has transformed many domains of computer science and artificial intelligence over the past decade. " +
  "Numerous studies have demonstrated the effectiveness of deep neural networks on tasks such as image classification, " +
  "natural language processing, and speech recognition. " +
  "However, existing models often require large amounts of labeled training data to achieve competitive performance, " +
  "which limits their applicability in domains where annotated data is scarce or expensive to obtain. " +
  "This limitation has motivated growing interest in semi-supervised and self-supervised learning approaches. " +
  "In this paper, we propose a novel semi-supervised learning framework that leverages unlabeled data to improve " +
  "model generalization while requiring significantly fewer labeled examples. " +
  "Our method achieves state-of-the-art results on three standard benchmark datasets with only 10% of the labeled data " +
  "used by fully supervised baselines. " +
  "We further demonstrate that our approach scales effectively to large datasets and integrates naturally with " +
  "existing pre-trained model architectures.";

export const extractPdfIntroduction = async (file: File) => {
  if (isPreviewMode()) return MOCK_PDF_INTRODUCTION;
  const formData = new FormData();
  formData.append("file", file);
  const data = await callService<{ introduction?: string }>(
    "PDF_EXTRACTOR",
    "post",
    "/extract_introduction",
    { data: formData },
  );
  return data?.introduction ?? null;
};
