"use client";

import { useToast } from "@/components/ui/use-toast";

type ActionResult = { serverError?: string } | null | undefined;

/**
 * Returns helpers for surfacing server action results as toasts.
 *
 * Usage:
 *   const { handleError, handleSuccess } = useActionToast();
 *   const res = await executeAsync(data);
 *   if (handleError(res)) return; // early-exit on error
 *   handleSuccess("Saved successfully");
 */
export function useActionToast() {
  const { toast } = useToast();

  /**
   * Shows a destructive toast if the result has a serverError.
   * Returns true if an error was found (so the caller can `return` early).
   */
  const handleError = (res: ActionResult): boolean => {
    if (res?.serverError) {
      toast({
        variant: "destructive",
        title: "Error",
        description: res.serverError,
      });
      return true;
    }
    return false;
  };

  const handleSuccess = (description: string) => {
    toast({ title: "Success!", description });
  };

  return { handleError, handleSuccess };
}
