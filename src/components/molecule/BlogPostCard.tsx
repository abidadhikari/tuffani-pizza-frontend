import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ImagePlaceholder from "../atom/ImagePlaceholder";

interface IBlogPostCardProps {
  link: string;
  coverImage: string;
  title: string;
  description: string;
  createdAt: string | Date;
  author: string;
  variant?: "default" | "compact";
}

export default function BlogPostCard(props: IBlogPostCardProps) {
  const isCompact = props.variant === "compact";
  return (
    <Link href={props.link} className="block group">
      {isCompact ? (
        <>
          <div className="flex flex-row gap-6">
            <div className="overflow-hidden ">
              {props.coverImage ? (
                <Image
                  src={props.coverImage}
                  alt={props.title}
                  className="  bg-gray-300 group-hover:scale-110 transition-transform duration-300"
                  width={80}
                  height={80}
                />
              ) : (
                <ImagePlaceholder className="size-20 " />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-semibold group-hover:text-brand">
                {props.title}
              </h3>
              <p
                className={cn("text-gray-600 line-clamp-2  text-ellipsis", {
                  hidden: isCompact,
                })}
              >
                {props.description}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="overflow-hidden h-60 ">
            {props.coverImage ? (
              <Image
                src={props.coverImage}
                alt={props.title}
                className="w-full h-60 bg-gray-300 group-hover:scale-110 transition-transform duration-300"
                width={405}
                height={240}
              />
            ) : (
              <ImagePlaceholder />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className=" text-sm text-brand">
              {props.author} • {new Date(props.createdAt).toLocaleDateString()}
            </div>
            <h3 className="text-lg font-semibold group-hover:text-brand">
              {props.title}
            </h3>
            <p
              className={cn("text-gray-600 line-clamp-2  text-ellipsis", {
                hidden: isCompact,
              })}
            >
              {props.description}
            </p>
          </div>
        </div>
      )}
    </Link>
  );
}
