import SignOut from "@/components/custom/signout-button";
import UserAvatar from "@/components/custom/userAvatar";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import type { Session } from "next-auth";
import Link from "next/link";
import { Toaster } from 'sonner'

export default async function Home() {
  const fetchSession = async (): Promise<null | Session | undefined> => {
    try {
      const new_session: Session | null = await auth();
      return new_session;
    } catch (error) {
      console.error("error in fetchSession: ", error);
    }
  };
  const session: null | undefined | Session = await fetchSession();
  console.log("session from page.jsx : ", session);

  return (
    <div className="flex flex-col items-center gap-2">
      <Toaster />
      <div className="text-4xl text-rose-500">HOME</div>
      <Link href={"/login"}><Button>Sign in</Button></Link>
      <SignOut />
      {session && <UserAvatar session={session} />}
    </div>
  );
}
