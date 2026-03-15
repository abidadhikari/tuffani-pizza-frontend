"use client";

import AuthLayout from "@/components/layout/AuthLayout";
import ResetPasswordForm from "@/components/organism/feat/auth/ResetPasswordForm";

export default function Page() {
  return (
    <AuthLayout>
      <ResetPasswordForm />
    </AuthLayout>
  );
}
