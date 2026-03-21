"use client";

import ImageUploadOrPreview from "@/components/organism/feat/dashboard/ImageUploadOrPreview";
import CreateUpdateProduct from "@/components/organism/feat/product/CreateUpdateProduct";
import { SiteHeader } from "@/components/site-header";
import { useGetProductById } from "@/hooks/services/products/useGetProductById";
import { usePatchProduct } from "@/hooks/services/products/usePatchProduct";
import { useParams } from "next/navigation";

export default function SingleProductPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetProductById({ id: id as string });
  const { mutate: patchProduct } = usePatchProduct();
  return (
    <section>
      <SiteHeader title="Update Product"></SiteHeader>
      {!isLoading && data ? (
        <>
          <CreateUpdateProduct
            id={id as string}
            defaultValues={{
              name: data?.name ?? "",
              description: data?.description ?? "",
              price: data?.price ?? 0,
              crossedPrice: data?.crossedPrice || 0,
              variants: data?.variants,
              addonIds: data?.addons?.map((addon) => addon.id) ?? [],
              categoryId: data?.categoryId ?? "",
              type: data?.type ?? "",
              visible: data?.visible,
              image: data?.mainImage?.url as string | undefined,
            }}
            type="update"
          />
        </>
      ) : null}
    </section>
  );
}
