"use client";

import AuthLayout from "@/components/layout/AuthLayout";
import RegisterForm from "@/components/organism/feat/auth/RegisterForm";

export default function Page() {
  return (
    <AuthLayout>
      <RegisterForm />
    </AuthLayout>
  );
}
