"use server"

import { eurekaClient } from '@/lib/eureka-client'
import { actionClient, ActionError } from '@/lib/safe-action'
import { balance } from '@/lib/server-utils'
import axios from 'axios'
import {z} from 'zod'
import { getMoves } from '../dao/moves'
import { getSubmoves } from '../dao/sub-moves'

export const geMoveSubmove = actionClient
  .metadata({ actionName: "geMoveSubmove" })
  .schema(
    z.object({
      sentences: z.array(z.string()),
    })
  )
  .action(async ({ parsedInput: { sentences } }) => {

    // submoves instances

    const movesPredictions = (await getMoves(sentences)).map((move,index)=>{

      return {
        move,
        sentence:sentences[index],
        subMove:null
      }
    });
    console.log("movesPredictions",movesPredictions)
    // move 0 submoves
    let move0 = movesPredictions.filter(m=>m.move===0)
    let move1 = movesPredictions.filter(m=>m.move===1)
    let move2 = movesPredictions.filter(m=>m.move===2);
    const res0 =move0.length > 0 ? await getSubmoves(move0.map(m=>m.sentence),0):null;
    console.log(res0)
    const res1 = move1.length > 0 ? await getSubmoves(move1.map(m=>m.sentence),1) :null;

    console.log(res1)
    const res2 = move2.length > 0 ?await getSubmoves(move2.map(m=>m.sentence),2):null;
    console.log(res2)
     move0  = move0.map((m,index)=>{
      return {
        ...m,
        subMove:res0?.[index]
      }
     })
      move1 = move1.map((m,index)=>{
      return {
        ...m,
        subMove:res1?.[index]
      }
     })

     move2 = move2.map((m,index)=>{
      return {
        ...m,
        subMove:res2?.[index]
      }
     })


    const predictions = movesPredictions.map((m,index)=>{
      if(m.move===0){
        return {
          ...m,
          subMove:move0.find(m0=>m0.sentence === m.sentence ).subMove
        }
      }
      if(m.move===1){
        return {
          ...m,
          subMove:move1.find(m1=>m1.sentence === m.sentence ).subMove
        }
      }
      if(m.move===2){
        return {
          ...m,
          subMove:move2.find(m2=>m2.sentence === m.sentence ).subMove
        }
      }

    })



    



    // submove calculation

    // predict move 0  submoves
    console.log('predictions',predictions)

    return {
      predictions,
    };
  });
