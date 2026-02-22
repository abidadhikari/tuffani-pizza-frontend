"use client";
import CreateUpdateProduct from "@/components/organism/feat/product/CreateUpdateProduct";
import { SiteHeader } from "@/components/site-header";
import { useParams } from "next/navigation";

export default function CreateProductPage() {
  const { id } = useParams();
  return (
    <section>
      <SiteHeader title="Create Product"></SiteHeader>
      <CreateUpdateProduct id={id as string} defaultValues={{}} type="create" />
    </section>
  );
}
