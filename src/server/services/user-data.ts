import { eurekaClient } from "@/lib/eureka-client";
import { IntroductionDtoType } from "../validation/introductionDto";
import { balance } from "@/lib/server-utils";
import axios from "axios";

export const createIntroduction = async (introduction:IntroductionDtoType)=>{
    


    const modelsAiInstances =
      eurekaClient.getInstancesByAppId("USER-DATA-SERVICE");
    console.log("modelsAiInstances", modelsAiInstances);
    const selectedInstance = balance(modelsAiInstances);
    if(!selectedInstance){
        console.error("No user-data instance is available");
        return null;
    }

    const url =
      "http://" +
      "localhost" +
      `:${selectedInstance.port["$"]}` +
      "/introductions";
    console.log("url", url);
    const res = await axios.post(
      url,
      introduction,

      {
        withCredentials: true,
      }
    );



}