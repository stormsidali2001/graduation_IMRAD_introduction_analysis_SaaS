import { eurekaClient } from "@/lib/eureka-client";
import { balance } from "@/lib/server-utils";
import axios from "axios";
import { AiModelOutputDto } from "../validation/AiModeOutputDto";


export const getMoves = async (sentences)=>{

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
      `:${selectedInstance.port["$"]}/models/moves` +
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