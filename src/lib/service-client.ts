import { eurekaClient } from "@/lib/eureka-client";
import { balance } from "@/lib/server-utils";
import axios from "axios";

export class ServiceUnavailableError extends Error {
  constructor(appId: string) {
    super(`Service "${appId}" is currently unavailable. Please try again later.`);
    this.name = "ServiceUnavailableError";
  }
}

/**
 * Resolves a service instance via Eureka, builds the URL, and makes the HTTP call.
 * Throws ServiceUnavailableError if no instance is found.
 */
export async function callService<T = unknown>(
  appId: string,
  method: "get" | "post" | "delete",
  path: string,
  options?: { data?: unknown; params?: Record<string, unknown> },
): Promise<T> {
  const instances = eurekaClient.getInstancesByAppId(appId);
  const instance = balance(instances);
  if (!instance) throw new ServiceUnavailableError(appId);

  const url = `http://localhost:${instance.port["$"]}${path}`;
  const config = { withCredentials: true, params: options?.params };

  let res;
  if (method === "post") {
    res = await axios.post(url, options?.data, config);
  } else if (method === "delete") {
    res = await axios.delete(url, config);
  } else {
    res = await axios.get(url, config);
  }

  return res.data as T;
}
