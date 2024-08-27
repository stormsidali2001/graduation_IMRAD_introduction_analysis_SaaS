"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, CheckCircle2 } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";

export default function EmailVerificationGuard() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const session = useSession();
  const { toast } = useToast();

  const handleVerificationRequest = async () => {
    setIsLoading(true);
    // Simulating an API call with a timeout
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
    }, 2000);
    try {
      const res = await signIn("email", {
        email: session.data.user.email,
        redirect: false,
      });
      if (res.error) {
        toast({
          variant: "destructive",
          title: "Error :(",
          description: res.error,
        });
        return;
      }
      toast({
        title: "Success!",
        description: "Verification email sent! Please check your inbox.",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-200 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[400px] overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
            <CardTitle className="text-2xl font-bold">
              Email Verification
            </CardTitle>
            <CardDescription className="text-purple-100">
              Secure your account
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="rounded-full bg-purple-100 p-3">
                <Mail className="h-10 w-10 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold">Verify Your Email</h3>
              <p className="text-gray-500">
                To ensure the security of your account, we need to verify your
                email address.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-4">
            {!isEmailSent ? (
              <Button
                onClick={handleVerificationRequest}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Mail className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <>
                    Verify Email <Mail className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Alert className="bg-green-100 border-green-300 text-green-800">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  <AlertDescription>
                    Verification email sent! Please check your inbox.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
