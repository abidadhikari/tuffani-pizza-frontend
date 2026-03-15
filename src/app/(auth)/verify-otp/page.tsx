"use client";

import AuthLayout from "@/components/layout/AuthLayout";
import VerifyOTPForm from "@/components/organism/feat/auth/VerifyOTPForm";

export default function Page() {
  return (
    <AuthLayout>
      <VerifyOTPForm />
    </AuthLayout>
  );
}
