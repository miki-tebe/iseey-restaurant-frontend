"use client";

import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
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
import { getAssetPath } from "@/lib/utils";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleSubmit(data: z.infer<typeof formSchema>) {
    login(data).then((result) => {
      if (result) {
        toast.error(result.message);
      }
    });
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      <div className="hidden lg:flex lg:items-center lg:justify-center bg-muted h-screen">
        <Image
          src={getAssetPath("/images/logo4.png")}
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
                    <FormLabel>Passwort</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          required
                          {...field}
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                          onClick={togglePasswordVisibility}
                        >
                          {showPassword ? (
                            <EyeOffIcon className="h-5 w-5 text-gray-500" />
                          ) : (
                            <EyeIcon className="h-5 w-5 text-gray-500" />
                          )}
                        </button>
                        <Link
                          href="/forgot-password"
                          className="ml-auto inline-block text-sm underline float-end"
                        >
                          Passwort vergessen?
                        </Link>
                      </div>
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
