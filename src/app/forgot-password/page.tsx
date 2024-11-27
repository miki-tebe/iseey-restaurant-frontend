"use client";

import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { forgotPassword } from "@/app/actions";
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
import { forgotPasswordSchema } from "@/schema/forgotPasswordSchema";

export default function ForgotPassword() {
  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function handleForgotPassword(
    data: z.infer<typeof forgotPasswordSchema>
  ) {
    await forgotPassword(data).then((result) => {
      if (result) {
        toast.message(result.message);
      }
    });
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Passwort zurücksetzen</h1>
          <p className="text-balance text-muted-foreground">
            Geben Sie Ihre E-Mail-Adresse ein
          </p>
        </div>
        <Form {...forgotPasswordForm}>
          <form
            onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)}
            className="space-y-4"
          >
            <FormField
              control={forgotPasswordForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-Mail Adresse</FormLabel>
                  <FormControl>
                    <Input
                      id="forgot-email"
                      type="email"
                      placeholder="Email"
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
      </div>
    </div>
  );
}
