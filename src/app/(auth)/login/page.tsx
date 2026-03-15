"use client";

import AuthLayout from "@/components/layout/AuthLayout";
import LoginForm from "@/components/organism/feat/auth/LoginForm";

export default function Page() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
