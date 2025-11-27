import SignIn from "@/components/custom/signin-button";
import SignOut from "@/components/custom/signout-button";
import UserAvatar from "@/components/custom/userAvatar";
import { auth } from "@/lib/auth";
import type { Session } from "next-auth";
// import useAuthStore from "@/lib/useAuthStore";

export default async function Home() {
  const fetchSession = async (): Promise<null | Session | undefined> => {
    try {
      const new_session: Session | null = await auth();
      return new_session;
    } catch (error) {
      console.error("error in fetchSession in ueAuthstore: ", error);
    }
  };
  const session: null | undefined | Session = await fetchSession();
  console.log("session from page.jsx : ", session);

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-4xl text-rose-500">HOME</div>
      <SignIn provider={"Github"} />
      <SignIn provider={"Google"} />
      <SignOut />
      {session && <UserAvatar session={session} />}
    </div>
  );
}
