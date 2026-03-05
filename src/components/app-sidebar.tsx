"use client";

import * as React from "react";
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconGift,
  IconHelp,
  IconHome,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react";

import { NavPages } from "@/components/nav-pages";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IconBook } from "@tabler/icons-react";
import Image from "next/image";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: IconDashboard,
    },
    {
      title: "Blogs",
      url: "/admin/blogs",
      icon: IconFileWord,
    },
    {
      title: "Categories",
      url: "/admin/categories",
      icon: IconListDetails,
    },
    {
      title: "Products",
      url: "/admin/products",
      icon: IconChartBar,
    },
    {
      title: "Offers",
      url: "/admin/offers",
      icon: IconGift,
    },
    {
      title: "Testimonials",
      url: "/admin/testimonials",
      icon: IconUsers,
    },
    {
      title: "Gallery",
      url: "/admin/gallery",
      icon: IconFolder,
    },
    {
      title: "Contacts",
      url: "/admin/contact",
      icon: IconReport,
    },
  ],
  pages: [
    {
      name: "Home Page",
      url: "/admin/static-content/home",
      icon: IconHome,
    },
    {
      name: "Menu Page",
      url: "/admin/static-content/menu",
      icon: IconChartBar,
    },
    {
      name: "About Page",
      url: "/admin/static-content/about",
      icon: IconBook,
    },
    {
      name: "Blog Page",
      url: "/admin/static-content/blog",
      icon: IconFileDescription,
    },
    {
      name: "Application Configs",
      url: "/admin/static-content/application-configs",
      icon: IconSettings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-center">
            <Image src="/logonew.png" alt="Logo" width={120} height={40} />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavPages items={data.pages} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
