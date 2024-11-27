"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { resetPassword } from "@/app/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { resetPasswordSchema } from "@/schema/resetPasswordSchema";

<<<<<<< HEAD
export const dynamic = "force-dynamic";
=======
export default function ResetPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
>>>>>>> 56657882f4502028b70a26468aa29024d435080d

function ResetPasswordForm({ token }: { token: string | null }) {
  const resetPasswordForm = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
  });

  async function handleResetPassword(
    data: z.infer<typeof resetPasswordSchema>
  ) {
    if (!token) {
      toast.error("Invalid or missing token");
      return;
    }
    const result = await resetPassword({ ...data, token });
    if (result) {
      toast.message(result.message);
    }
  }

  return (
    <Form {...resetPasswordForm}>
      <form
        onSubmit={resetPasswordForm.handleSubmit(handleResetPassword)}
        className="space-y-4"
      >
        <FormField
          control={resetPasswordForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Neues Passwort</FormLabel>
              <FormControl>
                <Input
                  id="reset-password"
                  type="password"
                  placeholder="Neues Passwort"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={resetPasswordForm.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passwort bestätigen</FormLabel>
              <FormControl>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Passwort bestätigen"
                  required
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Passwort zurücksetzen
        </Button>
      </form>
    </Form>
  );
}

export default function ResetPassword() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Passwort zurücksetzen</h1>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordContent />
        </Suspense>
      </div>
    </div>
  );
}

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm token={token} />
    </Suspense>
  );
}
