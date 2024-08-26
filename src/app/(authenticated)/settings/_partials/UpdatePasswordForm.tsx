"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { updatePasswordAction } from "@/server/actions/update-password-action";
import {
  UpdatePasswordDto,
  UpdatePasswordDtoType,
} from "@/server/validation/UpdatePasswordDto";
import { UserDtoType } from "@/server/validation/UserDto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import React from "react";
import { useForm } from "react-hook-form";

const UpdatePasswordForm = ({ user }: { user: UserDtoType }) => {
  const { executeAsync } = useAction(updatePasswordAction);
  const form = useForm<UpdatePasswordDtoType>({
    resolver: zodResolver(UpdatePasswordDto),
  });
  const { toast } = useToast();
  const onSubmit = async (data: UpdatePasswordDtoType) => {
    const res = await executeAsync(data);
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
      description: "Password updated successfully",
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 px-6"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>

                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* New Password field */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>

                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>

                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <CardFooter>
            <Button type="submit" className="-mx-6">
              Change Password
            </Button>
          </CardFooter>
        </div>
      </form>
    </Form>
  );
};

export default UpdatePasswordForm;
