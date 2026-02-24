"use client";

import Button from "@/components/atom/Button";
import CategoryModal from "@/components/organism/modals/CategoryModal";
import { SiteHeader } from "@/components/site-header";
import { useCreateCategory } from "@/hooks/services/categories/useCreateCategory";

import { useGetAllCategories } from "@/hooks/services/categories/useGetAllCategories";
import { useUpdateCategory } from "@/hooks/services/categories/useUpdateCategory";
import { Plus } from "lucide-react";
import { useState } from "react";

export default function CategoriesPage() {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(
    null,
  );

  const { data, isLoading } = useGetAllCategories();

  const { mutate: createCategory, isPending: isCreatingCategory } =
    useCreateCategory(() => {
      setIsCategoryModalOpen(false);
    });

  const { mutate: updateCategory, isPending: isUpdatingCategory } =
    useUpdateCategory(() => {
      setCurrentCategoryId(null);
      setIsCategoryModalOpen(false);
    });

  return (
    <>
      <section>
        <SiteHeader title="Categories">
          <Button
            onClick={() => {
              setCurrentCategoryId(null);
              setIsEditMode(false);
              setIsCategoryModalOpen(true);
            }}
            size={"sm"}
          >
            <Plus /> Add Category
          </Button>
        </SiteHeader>
        <div className="flex justify-end mb-5"></div>
        <div className="grid gap-4 grid-cols-4">
          {data && Array.isArray(data) && !isLoading ? (
            <>
              {data?.map((category) => (
                <div
                  key={category.id}
                  className=" border shadow p-4 rounded cursor-pointer hover:shadow-lg transition"
                  onClick={() => {
                    setIsEditMode(true);
                    setCurrentCategoryId(category.id);
                    setIsCategoryModalOpen(true);
                  }}
                >
                  <h2 className="text-sm font-bold uppercase">
                    {category.name}
                  </h2>
                  <p>Products: {category.products?.length || 0}</p>
                </div>
              ))}
            </>
          ) : null}
        </div>
        <CategoryModal
          open={isCategoryModalOpen}
          onOpenChange={(open) => {
            if (!open) {
              setCurrentCategoryId(null);
              setIsEditMode(false);
              setIsCategoryModalOpen(false);
            }
          }}
          isEditMode={isEditMode}
          onConfirm={(newCategoryName: string) => {
            if (isEditMode && currentCategoryId) {
              updateCategory({
                body: {
                  name: newCategoryName,
                },
                id: currentCategoryId,
              });
            } else {
              createCategory({
                body: {
                  name: newCategoryName,
                },
              });
            }
          }}
          defaultValues={{
            name: isEditMode
              ? Array.isArray(data)
                ? data?.find((cat) => cat.id === currentCategoryId)?.name || ""
                : ""
              : "",
          }}
          loading={isCreatingCategory || isUpdatingCategory}
          disabled={isCreatingCategory || isUpdatingCategory}
        />
      </section>
    </>
  );
}
