"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, ArrowLeft, CheckCircle, Lock, Mail } from "lucide-react";
import { forgotPasswordAction } from "@/server/actions/forgot-password-action";
import { useToast } from "@/components/ui/use-toast";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";

export default function FormWrapper() {
  const { toast } = useToast();
  const {
    executeAsync,
    hasSucceeded: isSubmitted,
    isExecuting: isSubmitting,
    input,
    reset,
  } = useAction(forgotPasswordAction);

  const form = useForm({
    resolver: zodResolver(
      z.object({
        email: z.string().email(),
      }),
    ),
  });
  const onSubmit = async ({ email }: { email: string }) => {
    const res = await executeAsync({ email });
    if (res.serverError) {
      toast({
        variant: "destructive",
        title: "Error :(",
        description: "Something went wrong. Please try again later.",
      });
      return;
    }
    toast({
      title: "Succeeded!",
      description: "We've sent a password reset link to your email.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Lock className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold text-gray-800">
              Reset Password
            </span>
          </div>
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Login
            </Button>
          </Link>
        </header>

        <Card className="w-full">
          <CardHeader className="">
            <div className="flex items-center justify-center mb-4">
              {isSubmitted ? (
                <CheckCircle className="h-12 w-12 text-white animate-bounce" />
              ) : (
                <Mail className="h-12 w-12 text-white animate-pulse" />
              )}
            </div>
            <CardTitle className="text-2xl text-center">
              {isSubmitted ? "Check Your Email" : "Forgot Password"}
            </CardTitle>
            <CardDescription className="text-center">
              {isSubmitted
                ? `We've sent a password reset link to ${input.email}`
                : "Enter your email and we'll send you a reset link"}
            </CardDescription>
          </CardHeader>
          {!isSubmitted && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent>
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            {...field}
                            placeholder="you@example.com"
                            required
                            className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full transition-all duration-200 hover:bg-primary/90"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Sending Reset Link...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Form>
          )}
          {isSubmitted && (
            <CardFooter className="p-4">
              <Button
                className="w-full transition-all duration-200 hover:bg-primary/90"
                onClick={() => {
                  reset();
                }}
              >
                Reset Another Password
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </div>
  );
}
