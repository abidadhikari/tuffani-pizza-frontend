"use client";

import AuthLayout from "@/components/layout/AuthLayout";
import ForgotPasswordForm from "@/components/organism/feat/auth/ForgotPasswordForm";

export default function Page() {
  return (
    <AuthLayout>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
