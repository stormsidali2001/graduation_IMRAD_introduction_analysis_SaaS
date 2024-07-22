import { eurekaClient } from "@/lib/eureka-client";
import { balance } from "@/lib/server-utils";
import axios from "axios";


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
      `:${selectedInstance.port["$"]}` +
      "/predict/batch/";
    console.log("url", url);
    const res = await axios.post(
      url,
      sentences,

      {
        withCredentials: true,
      }
    );
    return res?.data?.predictions ?? []

}

    //replace localhost by instance hostname if you're moving to production