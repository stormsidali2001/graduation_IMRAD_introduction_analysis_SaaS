import { zfd } from "zod-form-data";

export const PdfExtractorSchema = zfd.formData({
    file: zfd.file(),
});