import Eureka from "eureka-js-client";
import { isPreviewMode } from "./preview-mode";

function getEureka(): Eureka {
  if (isPreviewMode()) {
    return new Proxy({} as Eureka, {
      get(_, prop) {
        if (prop === "getInstancesByAppId") return () => [];
        return () => {};
      },
    });
  }

  const client = new Eureka({
    // application instance information
    instance: {
      app: "next-js-backend",
      hostName: "localhost",
      statusPageUrl: "http://localhost:3000/",
      port: {
        $: 3000,
        "@enabled": "true",
      },
      ipAddr: "127.0.0.1",
      vipAddress: "jq.test.something.com",
      dataCenterInfo: {
        "@class": "com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo",
        name: "MyOwn",
      },
    },
    eureka: {
      // eureka server host / port
      host: "0.0.0.0",
      port: 8761,
      servicePath: "/eureka/apps/",
    },
  });
  console.log("starting client  .....");
  client.start();

  console.log(" client  started.....");
  return client;
}

export const eurekaClient: Eureka = global.eurekaClient ?? getEureka();
global.eurekaClient = eurekaClient;
