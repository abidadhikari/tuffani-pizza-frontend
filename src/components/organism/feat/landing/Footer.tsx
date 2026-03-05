import MyIcon from "@/components/atom/MyIcon";
import { getStaticPageData } from "@/hooks/services/public-services";
import { STATIC_CONTENT_KEYS } from "@/lib/constants";
import { fetchStaticContent } from "@/lib/fetch-static-content";
import { sanitizeHtml } from "@/lib/sanitize-html";
import { ApplicationConfig } from "@/types/staticContent.type";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Footer() {
  const staticContents = await getStaticPageData();
  const applicationConfig: ApplicationConfig = fetchStaticContent(
    STATIC_CONTENT_KEYS.APPLICATION_CONFIG,
    staticContents,
  )?.value;

  return (
    <footer className="bg-brand">
      <div className="my-width max-w-full mx-auto  grid  lg:grid-cols-3 gap-10 py-25">
        <div className="flex flex-col gap-2 [&>p]:text-white order-1">
          <h3 className="font-bold text-white text-2xl">Get In Touch</h3>
          <p>{applicationConfig?.phoneNumber || "N/A"}</p>
          <p>{applicationConfig?.email || "N/A"}</p>
          <p>{applicationConfig?.address || "N/A"}</p>
        </div>
        <div className="order-3 lg:order-2 px-18.5 border-l border-r border-transparent lg:border-white flex flex-col items-center gap-5">
          <Image
            src="/logonew.png"
            alt="Logo"
            width={200}
            height={117}
            className=""
          />
          <div className="flex items-center gap-5">
            {/* <Link href="#" className="text-white mx-2">
              <Twitter />
            </Link> */}
            <Link
              href={applicationConfig?.socialMediaLinks?.facebook || "#"}
              target="_blank"
              className="text-white mx-2"
            >
              <Instagram />
            </Link>
            <Link
              href={applicationConfig?.socialMediaLinks?.tiktok || "#"}
              target="_blank"
              className="text-white mx-2"
            >
              <MyIcon icon="ic:baseline-tiktok" className="size-7" />
            </Link>
            <Link
              href={applicationConfig?.socialMediaLinks?.instagram || "#"}
              target="_blank"
              className="text-white mx-2"
            >
              {/* <MyIcon icon="mingcute:medium-fill" className="size-7" /> */}
              <Facebook />
            </Link>
          </div>
        </div>
        <div className="order-2 md:order-3 flex lg:justify-end items-center">
          <div className="flex flex-col gap-2 [&>p]:text-white ">
            <h3 className="font-bold text-white text-2xl">Opening Hours</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: sanitizeHtml(applicationConfig?.openingHours),
              }}
              className="text-white"
            ></div>
            <p className="h-10"></p> <p className="h-10"></p>
          </div>
        </div>
      </div>
      <div className="border-t border-white py-3 text-center text-white ">
        &copy; {new Date().getFullYear()} Tufani Pizza. All rights reserved.
      </div>
    </footer>
  );
}
