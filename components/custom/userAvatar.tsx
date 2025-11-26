"use client";

import Image from "next/image";

export default function UserAvatar(props : any) {
  if (props?.session) {
    return (
      <div><Image src={props?.session?.user?.image} alt="User Avatar" /></div>
    );
  }
  return <div>No session found!</div>;
}
