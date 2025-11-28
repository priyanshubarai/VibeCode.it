"use client"

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth";
import { Chromium, Github } from "lucide-react";
import Link from "next/link";
import { login } from "@/lib/action/user";

export function SignInForm() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Link href={"/signup"}>
            <Button variant="link">Sign Up</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form id="login-form" action={login}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="someone@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="**********"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button form="login-form" type="submit" className="w-full">
          Login
        </Button>
        {/* login other options */}
        <div className="flex flex-row flex-1 w-full gap-4 justify-around">
          <form
            className="w-1/2"
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <Button className="w-full" type="submit">
              <Github /> Github
            </Button>
          </form>
          <form
            className="w-1/2"
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <Button className="w-full" type="submit">
              <Chromium /> Google
            </Button>
          </form>
        </div>
      </CardFooter>
    </Card>
  );
}
