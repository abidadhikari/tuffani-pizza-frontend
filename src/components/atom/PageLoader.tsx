import React from "react";
import { Spinner } from "./Spinner";

export default function PageLoader() {
  return (
    <div className="grid place-items-center h-screen w-screen">
      <Spinner className="border-brand" />
    </div>
  );
}
