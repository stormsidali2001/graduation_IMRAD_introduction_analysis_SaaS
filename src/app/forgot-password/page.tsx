"use client";

import { useState } from "react";
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

export default function Component() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    // Simulating an API call
    setTimeout(() => {
      console.log("Password reset requested for:", email);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Lock className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold text-primary">
              Reset Password
            </span>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Button>
        </header>

        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              {isSubmitted ? (
                <CheckCircle className="h-12 w-12 text-green-500 animate-bounce" />
              ) : (
                <Mail className="h-12 w-12 text-primary animate-pulse" />
              )}
            </div>
            <CardTitle className="text-2xl text-center">
              {isSubmitted ? "Check Your Email" : "Forgot Password"}
            </CardTitle>
            <CardDescription className="text-center">
              {isSubmitted
                ? `We've sent a password reset link to ${email}`
                : "Enter your email and we'll send you a reset link"}
            </CardDescription>
          </CardHeader>
          {!isSubmitted && (
            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  {error && (
                    <div className="text-destructive text-sm flex items-center gap-2 bg-destructive/10 p-2 rounded animate-shake">
                      <AlertCircle className="h-4 w-4" />
                      {error}
                    </div>
                  )}
                </div>
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
          )}
          {isSubmitted && (
            <CardFooter>
              <Button
                className="w-full transition-all duration-200 hover:bg-primary/90"
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
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
