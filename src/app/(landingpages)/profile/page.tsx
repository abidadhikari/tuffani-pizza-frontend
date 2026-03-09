"use client";
import UserDashboardLayout from "@/components/layout/UserDashboardLayout";
import UserProfile from "@/components/organism/feat/landing/UserProfile";

export default function Page() {
  return (
    <UserDashboardLayout>
      <UserProfile />
    </UserDashboardLayout>
  );
}
