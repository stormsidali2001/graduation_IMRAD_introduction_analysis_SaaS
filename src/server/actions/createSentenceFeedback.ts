import { authActionClient } from "@/lib/safe-action";
import { CreateSentenceFeedbackDto } from "../validation/feedbackDto";
import { createSentenceFeedback } from "../services/user-data";

export const createSentenceFeedbackAction = authActionClient
.schema(CreateSentenceFeedbackDto)
.action(async ({parsedInput,ctx})=>{

    try{

    await createSentenceFeedback({...parsedInput,userId:ctx.userId})
    }catch(err){
        console.error(err)
        throw new Error("Failed to create sentence feedback")   
    }

})