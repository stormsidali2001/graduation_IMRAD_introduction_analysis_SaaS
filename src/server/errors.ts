export class UserAlreadyRegistered extends Error {
  constructor() {
    super("User already registered");
    this.name = "UserAlreadyRegistered";
  }
}

export { ServiceUnavailableError } from "@/lib/service-client";

/** Throw this from a service/use-case to surface a clean message to the client. */
export class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AppError";
  }
}
 