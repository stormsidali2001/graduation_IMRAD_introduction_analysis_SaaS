"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import {
  ResetPasswordSchema,
  ResetPasswordSchemaType,
} from "@/server/validation/ResetPasswordDto";
import { useAction } from "next-safe-action/hooks";
import { ResetPasswordAction } from "@/server/actions/reset-passowrd";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function FormWrapper({ token }: { token: string }) {
  const { executeAsync, isExecuting: isSubmitting } =
    useAction(ResetPasswordAction);

  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
      token,
    },
  });

  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (data: ResetPasswordSchemaType) => {
    try {
      const res = await executeAsync(data);
      if (res.serverError) {
        toast({
          variant: "destructive",
          title: "Error :(",
          description: res.serverError,
        });
        return;
      }

      console.log("Password reset submitted:", data);
      toast({
        title: "Success!",
        description: "Your password has been reset.",
      });
      form.reset();
      router.push("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const getPasswordStrength = (password: string) => {
    const strengthChecks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password),
    ];
    return strengthChecks.filter(Boolean).length;
  };

  const passwordStrength = getPasswordStrength(form.watch("newPassword") || "");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Reset Your Password
          </CardTitle>
          <CardDescription className="text-center">
            Please enter your current password and choose a new password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type={"password"} className="pr-10" {...field} />
                        <Lock
                          size={20}
                          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      <div className="flex space-x-1 mt-1">
                        {[1, 2, 3, 4, 5].map((strength) => (
                          <div
                            key={strength}
                            className={`h-2 w-full rounded ${
                              passwordStrength >= strength
                                ? "bg-green-500"
                                : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type={"password"} className="pr-10" {...field} />
                        <Lock
                          size={20}
                          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full"
                  />
                ) : (
                  "Reset Password"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Remember your password?{" "}
            <a
              href="/login"
              className="text-purple-600 hover:underline font-medium"
            >
              Log in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
