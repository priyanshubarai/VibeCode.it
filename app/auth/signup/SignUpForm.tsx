import React from "react";
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
import { Register } from "@/lib/action/user";

const SignUpForm = () => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Link href={"/login"}>
            <Button variant="link">Log in</Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form id="signup-form" action={Register}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">User name</Label>
              <Input id="username" type="text" placeholder="john34" name="username" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="someone@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="**********"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button form="signup-form" type="submit" className="w-full">
          Sign up
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
};

export default SignUpForm;
