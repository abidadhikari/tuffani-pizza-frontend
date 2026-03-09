"use client";
import DashboardCard from "@/components/atom/DashboardCard";
import { SiteHeader } from "@/components/site-header";
import { useGetDashboardStats } from "@/hooks/services/useGetDashboardStats";
import { useAppSelector } from "@/store/storeHook";
import { Files, Layers, Mail, ShoppingCart, Tag, Users } from "lucide-react";

export default function Page() {
  const { data, isLoading } = useGetDashboardStats();
  const authSlice = useAppSelector("auth");
  return (
    <div>
      <SiteHeader title="Admin Dashboard" />

      <div className="grid grid-cols-4 gap-5">
        <DashboardCard
          title="Products"
          icon={<Files size={20} />}
          total={data?.product?.total ?? "-"}
          secondaryLabel="Visible"
          secondaryValue={data?.product?.visible ?? "-"}
          tertiaryLabel="Hidden"
          tertiaryValue={data?.product?.hidden ?? "-"}
        />

        <DashboardCard
          title="Blogs"
          icon={<Files size={20} />}
          total={data?.blog?.total ?? "-"}
          secondaryLabel="Visible"
          secondaryValue={data?.blog?.visible ?? "-"}
          tertiaryLabel="Hidden"
          tertiaryValue={data?.blog?.hidden ?? "-"}
        />

        <DashboardCard
          title="Categories"
          icon={<Layers size={20} />}
          total={data?.category?.total ?? "-"}
        />

        <DashboardCard
          title="Offers"
          icon={<Tag size={20} />}
          total={data?.offer?.total ?? "-"}
          secondaryLabel="Visible"
          secondaryValue={data?.offer?.visible ?? "-"}
          tertiaryLabel="Hidden"
          tertiaryValue={data?.offer?.hidden ?? "-"}
        />

        <DashboardCard
          title="Contacts"
          icon={<Mail size={20} />}
          total={data?.contact?.total ?? "-"}
          secondaryLabel="Read"
          secondaryValue={data?.contact?.read ?? "-"}
          tertiaryLabel="Unread"
          tertiaryValue={data?.contact?.unread ?? "-"}
        />

        <DashboardCard
          title="Users"
          icon={<Users size={20} />}
          total={data?.user?.total ?? "-"}
          secondaryLabel="Active"
          secondaryValue={data?.user?.active ?? "-"}
          tertiaryLabel="Invited"
          tertiaryValue={data?.user?.invited ?? "-"}
          fourthLabel="Inactive"
          fourthValue={data?.user?.inactive ?? "-"}
          fifthLabel="Banned"
          fifthValue={data?.user?.banned ?? "-"}
        />
      </div>
    </div>
  );
}
