"use server"

import { actionClient } from "@/lib/safe-action"
import { PdfExtractorSchema } from "@/schema/validation/pdf-extractor.schema"
import { extractPdfIntroduction } from "../services/pdf-extrator"

export const pdfExtractorAction = actionClient
.schema(PdfExtractorSchema)
.metadata({
    actionName:"pdfExtractor"
})
.action(async ({parsedInput:{file}})=>{

    
    return extractPdfIntroduction(file)

})