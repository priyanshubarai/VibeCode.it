"use client";

import Image from "next/image";
import type { Session } from "next-auth";

export default function UserAvatar(props: {session : Session} ) {
  if (props?.session) {
    return (
      <div><Image width={200} height={200} src={props?.session?.user?.image || ""} alt="User Avatar" /></div>
    );
  }
  return <div>No session found!</div>;
}
