"use client";

import Button from "@/components/atom/Button";
import CategoryModal from "@/components/organism/modals/CategoryModal";
import { SiteHeader } from "@/components/site-header";
import { Plus, Folder, Edit } from "lucide-react";
import { useState } from "react";

import { useCreateCategory } from "@/hooks/services/categories/useCreateCategory";
import { useGetAllCategories } from "@/hooks/services/categories/useGetAllCategories";
import { useUpdateCategory } from "@/hooks/services/categories/useUpdateCategory";

export default function CategoriesPage() {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(
    null,
  );

  const { data, isLoading } = useGetAllCategories();

  const { mutate: createCategory, isPending: isCreatingCategory } =
    useCreateCategory(() => setIsCategoryModalOpen(false));

  const { mutate: updateCategory, isPending: isUpdatingCategory } =
    useUpdateCategory(() => {
      setCurrentCategoryId(null);
      setIsCategoryModalOpen(false);
    });

  return (
    <section className="space-y-6">
      <SiteHeader title="Categories">
        <Button
          size="sm"
          onClick={() => {
            setCurrentCategoryId(null);
            setIsEditMode(false);
            setIsCategoryModalOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </SiteHeader>

      {/* Categories Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading &&
          Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-32 animate-pulse rounded-xl bg-muted" />
          ))}

        {Array.isArray(data) &&
          data.map((category) => (
            <div
              key={category.id}
              onClick={() => {
                setIsEditMode(true);
                setCurrentCategoryId(category.id);
                setIsCategoryModalOpen(true);
              }}
              className="group cursor-pointer rounded-xl border bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Folder className="h-5 w-5 text-muted-foreground" />
                  <h2 className="text-sm font-semibold uppercase tracking-wide">
                    {category.name}
                  </h2>
                </div>

                <Edit className="h-4 w-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
              </div>

              <div className="mt-4">
                <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
                  {category.products?.length || 0} Products
                </span>
              </div>
            </div>
          ))}
      </div>

      {/* Modal */}
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
              id: currentCategoryId,
              body: { name: newCategoryName },
            });
          } else {
            createCategory({
              body: { name: newCategoryName },
            });
          }
        }}
        defaultValues={{
          name: isEditMode
            ? data?.find((cat) => cat.id === currentCategoryId)?.name || ""
            : "",
        }}
        loading={isCreatingCategory || isUpdatingCategory}
        disabled={isCreatingCategory || isUpdatingCategory}
      />
    </section>
  );
}
