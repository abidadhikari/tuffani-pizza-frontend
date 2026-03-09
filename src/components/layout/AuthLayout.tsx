import React, { PropsWithChildren } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen flex flex-col gap-5 items-center justify-center bg-gray-100 py-8">
      <Link href="/">
        <Image src="/logonew.png" alt="Logo" width={120} height={40} />
      </Link>
      <Card className="p-8 mb-8 ">{children}</Card>
    </div>
  );
}
