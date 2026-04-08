"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useActionToast } from "@/hooks/use-action-toast";
import {
  calculatePasswordStrength,
  STRENGTH_LABELS,
  STRENGTH_COLORS,
} from "@/lib/password-strength";
import { updatePasswordAction } from "@/server/actions/update-password-action";
import {
  UpdatePasswordDto,
  UpdatePasswordDtoType,
} from "@/server/validation/UpdatePasswordDto";
import { UserDtoType } from "@/server/validation/UserDto";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Lock, Loader2 } from "lucide-react";
import { CardContent } from "@/components/ui/card";

export default function UpdatePasswordForm({ user }: { user: UserDtoType }) {
  const { executeAsync } = useAction(updatePasswordAction);
  const form = useForm<UpdatePasswordDtoType>({
    resolver: zodResolver(UpdatePasswordDto),
  });
  const { handleError, handleSuccess } = useActionToast();
  const [passwordStrength, setPasswordStrength] = useState(0);

  const onSubmit = async (data: UpdatePasswordDtoType) => {
    const res = await executeAsync(data);
    if (handleError(res)) return;
    handleSuccess("Password updated successfully");
  };

  useEffect(() => {
    const password = form.watch("newPassword");
    if (password) {
      const strength = calculatePasswordStrength(password);
      setPasswordStrength(strength);
    } else {
      setPasswordStrength(0);
    }
  }, [form.watch("newPassword")]);


  return (
    <Form {...form}>
      <CardContent className="pt-4">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input type="password" {...field} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input type="password" {...field} className="pl-10" />
                  </div>
                </FormControl>
                <div className="mt-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">
                      Password strength
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {STRENGTH_LABELS[passwordStrength as keyof typeof STRENGTH_LABELS]}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${STRENGTH_COLORS[passwordStrength as keyof typeof STRENGTH_COLORS]}`}
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input type="password" {...field} className="pl-10" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Change Password"
            )}
          </Button>
        </form>
      </CardContent>
    </Form>
  );
}
