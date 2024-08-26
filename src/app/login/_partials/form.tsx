"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import { DevTool } from "@hookform/devtools";
import { useRouter } from "next/navigation";
import { UserDtoType } from "@/server/validation/UserDto";
import { getUserRedirectUrl } from "@/lib/utils";
import { useState } from "react";

export const Form = (user?: UserDtoType) => {
  const form = useForm({
    resolver: zodResolver(SignInSchema),
    mode: "all",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const onSubmit = async (data: SigninSchemaType) => {
    setIsLoading(true);
    const res = await signIn("credentials", { ...data, redirect: false });

    if (res.error) {
      toast({
        variant: "destructive",
        title: "Error :(",
        description: res.error,
      });

      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    toast({
      variant: "default",
      title: "Success!",
      description: `Signed in succesfully`,
    });

    const url = getUserRedirectUrl(user);
    setTimeout(() => {
      router.push(url);
    }, 0);
  };
  return (
    <ValidationForm {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email address</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  required
                  className="mt-1 block w-full"
                  placeholder="name@example.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  required
                  className="mt-1 block w-full"
                  placeholder="Password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {!isLoading ? "Sign in" : "Loading..."}
        </Button>
      </form>
      <DevTool control={form.control} />
    </ValidationForm>
  );
};
