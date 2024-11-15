"use client";

import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { login } from "@/app/actions";
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

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Login() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function handleSubmit(data: z.infer<typeof formSchema>) {
    login(data).then((result) => {
      if (result) {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-muted lg:flex lg:items-center lg:justify-center">
        <Image
          src="/images/logo4.png"
          alt="ISSEY Logo"
          width={1590}
          height={900}
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">
              Willkommen im Restaurant-Portal
            </h1>
            <p className="text-balance text-muted-foreground">
              Melden Sie sich an
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-Mail Adresse</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel>Passwort</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Passwort vergessen?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Anmelden
              </Button>
              <div className="text-center mt-4 text-sm">
                Noch kein Konto?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-primary underline"
                >
                  Registrieren
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
