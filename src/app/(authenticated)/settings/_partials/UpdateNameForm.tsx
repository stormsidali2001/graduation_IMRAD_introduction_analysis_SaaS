"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { updateUserAction } from "@/server/actions/update-user";
import { UserDtoType } from "@/server/validation/UserDto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { motion } from "framer-motion";
import { User, Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long",
  }),
});

export default function UpdateNameForm({ user }: { user: UserDtoType }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
    },
  });
  const { executeAsync } = useAction(updateUserAction);
  const { toast } = useToast();

  const onSubmit = async ({ name }: { name: string }) => {
    const res = await executeAsync({ name });
    if (res.serverError) {
      toast({
        variant: "destructive",
        title: "Error :(",
        description: res.serverError,
      });
      return;
    }
    toast({
      title: "Success!",
      description: "Name updated successfully",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CardContent className="p-6">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold ">Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      {...field}
                      placeholder="Enter your new name"
                      className="pl-10 bg-background/50 border-2 border-primary/20 focus:border-primary transition-all duration-300 rounded-md"
                    />
                  </div>
                </FormControl>
                <FormDescription className="text-sm text-muted-foreground">
                  This is the name that will be displayed on your profile.
                </FormDescription>
                <FormMessage className="text-sm text-destructive" />
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter className="flex justify-end">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Name"
              )}
            </Button>
          </motion.div>
        </CardFooter>
      </form>
    </Form>
  );
}
