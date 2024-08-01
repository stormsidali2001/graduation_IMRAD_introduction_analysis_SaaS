
import { eurekaClient } from "@/lib/eureka-client";
import { balance } from "@/lib/server-utils";
import axios from "axios";
import { AiModelOutputDto } from "../validation/AiModeOutputDto";

const map = {
    0:"sub_moves_0",
    1:"sub_moves_1",
    2:"sub_moves_2",
}
export type MoveIndex = 0|1|2
export const getSubmoves = async (sentences:string[],moveIndex:MoveIndex)=>{

    const modelsAiInstances =
      eurekaClient.getInstancesByAppId("AI_MODEL_MOVES");
    console.log("modelsAiInstances", modelsAiInstances);
    const selectedInstance = balance(modelsAiInstances);
    if(!selectedInstance){
        console.error("No AI models available");
        return null;
    }

    const url =
      "http://" +
      "localhost" +
      `:${selectedInstance.port["$"]}/models/${map[moveIndex]}` +

      "/predict/batch/";
    console.log("url", url);
    const res = await axios.post(
      url,
      sentences,

      {
        withCredentials: true,
      }
    );
    const parsed = await AiModelOutputDto.parseAsync(res.data)
    return parsed

}

    //replace localhost by instance hostname if you're moving to production