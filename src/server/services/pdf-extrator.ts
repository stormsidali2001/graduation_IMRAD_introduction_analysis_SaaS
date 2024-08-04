import { eurekaClient } from "@/lib/eureka-client";
import { balance } from "@/lib/server-utils";
import axios from "axios";

export const extractPdfIntroduction = async (file:File)=>{

    const modelsAiInstances =
      eurekaClient.getInstancesByAppId("PDF_EXTRACTOR");
    console.log("modelsAiInstances", modelsAiInstances);
    const selectedInstance = balance(modelsAiInstances);
    if(!selectedInstance){
        console.error("No Pdf Extraction service is available");
        return null;
    }

    const formData = new FormData()
    formData.append("file",file)
    const url =
      "http://" +
      "localhost" +
      `:${selectedInstance.port["$"]}` +
      "/extract_introduction";
    console.log("url", url);
    const res = await axios.post(
      url,
      formData,

      {
        withCredentials: true,
      }
    );

    return res.data?.introduction ?? null
}
