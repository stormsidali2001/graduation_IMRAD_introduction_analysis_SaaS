"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  RegisterUserSchema,
  type RegisterUserInput,
} from "@/schema/validation/register-user.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAction } from "next-safe-action/hooks";
import { registerUserAction } from "@/server/actions/register-user";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Terminal,
  Chrome,
  Mail,
  Lock,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const containerVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

const iconVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};

export default function FormWrapper() {
  const [passwordStrength, setPasswordStrength] = useState(0);
  const form = useForm<RegisterUserInput>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {},
  });

  const { executeAsync, isExecuting, hasErrored, hasSucceeded, result, reset } =
    useAction(registerUserAction);
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (data: RegisterUserInput) => {
    if (isExecuting) return;
    const res = await executeAsync(data);
    if (res.serverError) {
      toast({
        variant: "destructive",
        title: "Error :(",
        description: res.serverError,
      });
      return;
    }
    form.reset({
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    });

    toast({
      title: "Success!",
      description: "Registration successful!",
    });
    router.push("/verify-email");
  };

  useEffect(() => {
    const password = form.watch("password");
    if (password) {
      const strength = calculatePasswordStrength(password);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(0);
    }
  }, [form.watch("password")]);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
    if (password.match(/\d/)) strength += 1;
    if (password.match(/[^a-zA-Z\d]/)) strength += 1;
    return strength;
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-yellow-500";
      case 3:
        return "bg-blue-500";
      case 4:
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
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
            <Chrome className="h-8 w-8 text-primary" />
          </motion.div>
          <h2 className="mt-6 text-center text-3xl font-extrabold tracking-tight text-foreground">
            Sign up for our AI tool
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </motion.div>

        <AnimatePresence>
          {hasErrored && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Something went wrong</AlertTitle>
                <AlertDescription>
                  {result?.fetchError || result?.serverError}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {!hasSucceeded ? (
          <motion.div
            className="mt-8 bg-card shadow-lg rounded-lg p-8"
            variants={itemVariants}
          >
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <AnimatePresence>
                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground/80">
                            Name
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                {...field}
                                required
                                className="pl-10 bg-background/50 border-muted-foreground/20 focus:border-primary"
                                placeholder="Your Name"
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
                          <div className="mt-2">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-muted-foreground">
                                Password strength
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {passwordStrength === 0 && "Too weak"}
                                {passwordStrength === 1 && "Weak"}
                                {passwordStrength === 2 && "Fair"}
                                {passwordStrength === 3 && "Good"}
                                {passwordStrength === 4 && "Strong"}
                              </span>
                            </div>
                            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                className={`h-full ${getPasswordStrengthColor()}`}
                                initial={{ width: 0 }}
                                animate={{ width: `${passwordStrength * 25}%` }}
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <FormField
                      control={form.control}
                      name="passwordConfirmation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground/80">
                            Confirm Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                              <Input
                                {...field}
                                type="password"
                                required
                                className="pl-10 bg-background/50 border-muted-foreground/20 focus:border-primary"
                                placeholder="Confirm your password"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white"
                      disabled={isExecuting}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {isExecuting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing up...
                        </>
                      ) : (
                        "Sign up"
                      )}
                    </Button>
                  </motion.div>
                </AnimatePresence>
              </form>
            </Form>
          </motion.div>
        ) : null}
        {hasSucceeded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center bg-card shadow-lg rounded-lg p-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-500"
            >
              <CheckCircle2 className="h-6 w-6" />
            </motion.div>
            <h3 className="mb-2 text-lg font-medium text-foreground">
              Registration Successful!
            </h3>
            <p className="text-muted-foreground">
              Thank you for signing up. You will be redirected in few seconds.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
