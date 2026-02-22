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
      <ImageUploadOrPreview
        value={data?.mainImage?.url}
        onUpload={async (file) => {
          console.log("Uploading file:", file);
          patchProduct({
            id: id as string,
            body: {
              image: file,
            },
          });
        }}
      />
      <CreateUpdateProduct
        id={id as string}
        defaultValues={data}
        type="update"
      />
      <div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading product.</p>}
        {data ? (
          <>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <button
              onClick={() =>
                patchProduct({
                  body: { name: "Abid Product Name", visible: true },
                  id: id as string,
                })
              }
            >
              Update Product
            </button>
          </>
        ) : null}
      </div>
    </section>
  );
}
