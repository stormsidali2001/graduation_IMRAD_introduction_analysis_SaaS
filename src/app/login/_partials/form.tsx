"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  SignInSchema,
  type SigninSchemaType,
} from "@/schema/validation/sign-in.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as ValidationForm,
} from "@/components/ui/form";
import { signIn, useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { DevTool } from "@hookform/devtools";
import { useRouter } from "next/navigation";
import { getUserRedirectUrl } from "@/lib/utils";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, Mail, Lock, LockIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Form = () => {
  const form = useForm({
    resolver: zodResolver(SignInSchema),
    mode: "all",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const session = useSession();

  const onSubmit = async (data: SigninSchemaType) => {
    setIsLoading(true);
    const res = await signIn("credentials", { ...data, redirect: false });

    if (res.error) {
      toast({
        variant: "destructive",
        title: "Error :(",
        description: "Bad Credentials",
      });

      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    toast({
      variant: "default",
      title: "Success!",
      description: `Signed in successfully`,
    });
  };

  useEffect(() => {
    if (session?.data?.user) {
      const url = getUserRedirectUrl(session.data.user);
      router.push(url);
    }
  }, [session?.data?.user]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/20 to-background px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        className="w-full max-w-md space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="text-center" variants={itemVariants}>
          <motion.div
            className="mx-auto h-12 w-12 rounded-full bg-primary/10 p-2"
            variants={iconVariants}
          >
            <LockIcon className="h-8 w-8 text-primary" />
          </motion.div>
          <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-foreground">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Sign up here
            </Link>
          </p>
        </motion.div>
        <motion.div
          className="mt-8 bg-card shadow-lg rounded-lg p-8"
          variants={itemVariants}
        >
          <ValidationForm {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <AnimatePresence>
                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80">
                          Email address
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              type="email"
                              {...field}
                              required
                              className="pl-10 bg-background/50 border-muted-foreground/20 focus:border-primary"
                              placeholder="name@example.com"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground/80">
                          Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              {...field}
                              type="password"
                              required
                              className="pl-10 bg-background/50 border-muted-foreground/20 focus:border-primary"
                              placeholder="Enter your password"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex justify-end"
                >
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    Forgot your password?
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                    //@ts-ignore
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </Button>
                </motion.div>
              </AnimatePresence>
            </form>
          </ValidationForm>
        </motion.div>
      </motion.div>
    </div>
  );
};
