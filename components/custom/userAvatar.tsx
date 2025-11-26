"use client";
import { sessionType } from "@/lib/Types";
import type { Session } from "next-auth";

export default function UserAvatar(props : any) {
  if (props?.session) {
    return (
      <div><img src={props?.session?.user?.image} alt="User Avatar" /></div>
    );
  }
  return <div>No session found!</div>;
}
