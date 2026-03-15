"use client";

import UserProfileForm from "@/components/organism/feat/user/UserProfileForm";
import Title from "@/components/atom/Title";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useGetMe } from "@/hooks/services/users/useGetMe";

export default function UserProfile() {
  const { data } = useGetMe();
  return (
    <div className="grid md:grid-cols-2 gap-5">
      <Card className="p-5">
        <UserProfileForm
          defaultValues={{
            name: String(data?.name ?? ""),
            phone: String(data?.phone ?? ""),
          }}
        />
      </Card>
      <Card className="p-5">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Title variant="h2" className="">
              User Details
            </Title>
            <Badge variant="secondary" className="capitalize">
              {data?.status}
            </Badge>
          </div>

          {/* Divider */}
          <div className="border-t" />
          {/* Content */}
          <div className="grid gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{data?.name || "-"}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">{data?.email || "-"}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-muted-foreground">Phone</span>
              <span className="font-medium">{String(data?.phone) || "-"}</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
