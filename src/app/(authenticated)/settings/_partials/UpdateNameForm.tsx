"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { updateUserAction } from "@/server/actions/update-user";
import { UserDtoType } from "@/server/validation/UserDto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UpdateNameForm = ({ user }: { user: UserDtoType }) => {
  const form = useForm({
    resolver: zodResolver(z.object({ name: z.string().min(3) })),
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your new name" />
                </FormControl>
              </FormItem>
            )}
          />
        </CardContent>
        <CardFooter>
          <Button type="submit">Update Name</Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default UpdateNameForm;
