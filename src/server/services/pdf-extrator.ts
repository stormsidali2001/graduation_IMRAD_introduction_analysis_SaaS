import { callService } from "@/lib/service-client";

export const extractPdfIntroduction = async (file: File) => {
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
