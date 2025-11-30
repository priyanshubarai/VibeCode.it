import SignOut from "@/components/custom/signout-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Toaster } from "sonner";
import { auth } from "../lib/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col items-center gap-2">
      <Toaster />
      <div className="text-4xl text-rose-500">HOME</div>
      <Link href={"/auth/login"}>
        <Button>Sign in</Button>
      </Link>
      <SignOut />
      <div>
        {JSON.stringify(session)}
      </div>
    </div>
  );
}
