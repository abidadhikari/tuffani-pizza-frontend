"use client";

import Button from "@/components/atom/Button";
import { usePostLogin } from "@/hooks/services/usePostLogin";
import { usePostRegister } from "@/hooks/services/usePostRegister";

export default function Page() {
  const { mutate: login } = usePostLogin();
  const { mutate: register } = usePostRegister();

  const handleLogin = () => {
    login({
      email: "superadmin@example.com",
      password: "Password1@",
    });
  };

  const handleRegister = () => {
    register({
      email: "abidadhikari25@gmail.com",
      password: "Password1@",
      name: "Abid Adhikari",
      phone: "9800000000",
    });
  };
  return (
    <div>
      <Button onClick={handleLogin}>Login</Button>
      <Button onClick={handleRegister}>Register</Button>
    </div>
  );
}
