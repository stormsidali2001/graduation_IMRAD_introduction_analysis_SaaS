"use server"

import { eurekaClient } from '@/lib/eureka-client'
import { actionClient, ActionError } from '@/lib/safe-action'
import { balance, hashPassword } from '@/lib/server-utils'
import axios from 'axios'
import {z} from 'zod'
import { getMoves } from '../dao/moves'
import { getSubmoves } from '../dao/sub-moves'
import { makePrediction } from '../services/predictions'
import { createIntroduction } from '../services/user-data'
import { auth } from '@/lib/auth'

export const geMoveSubmove = actionClient
  .metadata({ actionName: "geMoveSubmove" })
  .schema(
    z.object({
      sentences: z.array(z.string()),
    })
  )
  .action(async ({ parsedInput: { sentences } }) => {

    const session = await auth()
    if(!session.user.id){
      throw new ActionError("Unauthorized")
    }

    const sha = await hashPassword(sentences.join("."))
    const predictions = await makePrediction(sentences)
        createIntroduction({
        sha,
        userId:session.user.id,
        sentences:predictions.map((p,index)=>({
          move:p.move,
          subMove:p.subMove,
          order:index,
          text:p.sentence,
          moveConfidence:p.moveConfidence,
          subMoveConfidence:p.subMoveConfidence

        }),)
      })
return predictions;
  });