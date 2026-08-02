import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Outlets - Swad Guleli",
};
export default function SwadGuleliOutletPage() {
  return (
    <div className="bg-[#E22825] min-h-screen flex items-center justify-center flex-col">
      <Image
        src={"/images/sg/outlets.jpeg"}
        alt={"outlets"}
        width={1000}
        height={1000}
      />
    </div>
  );
}
