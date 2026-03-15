"use client";

import Button from "@/components/atom/Button";
import { SiteHeader } from "@/components/site-header";
import { Plus, Eye, EyeOff, Edit } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

import { useGetAllGallery } from "@/hooks/services/gallery/useGetAllGallery";
import { useCreateGalleryItem } from "@/hooks/services/gallery/useCreateGallery";
import { usePatchGallery } from "@/hooks/services/gallery/usePatchGallery";

import GalleryModal from "@/components/organism/modals/GalleryModal";

export default function GalleryPage() {
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useGetAllGallery();

  const { mutate: createGalleryItem, isPending: creating } =
    useCreateGalleryItem(() => setOpen(false));

  const { mutate: updateGalleryItem, isPending: updating } = usePatchGallery(
    () => setOpen(false),
  );

  return (
    <section className="space-y-6">
      <SiteHeader title="Gallery">
        <Button size="sm" onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Gallery Item
        </Button>
      </SiteHeader>

      {/* Gallery Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading &&
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-[260px] animate-pulse rounded-xl bg-muted"
            />
          ))}

        {data?.map((item) => (
          <div
            key={item.id}
            className="group overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden bg-muted">
              <Image
                src={item.Asset?.url || "/placeholder.png"}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="line-clamp-1 font-medium">{item.title}</p>

                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    item.isVisible
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {item.isVisible ? "Visible" : "Hidden"}
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <Button
                  size="sm"
                  variant="ghost"
                  className="gap-2"
                  disabled={updating}
                  onClick={() =>
                    updateGalleryItem({
                      id: item.id,
                      body: {
                        title: item.title,
                        isVisible: !item.isVisible,
                      },
                    })
                  }
                >
                  {item.isVisible ? (
                    <>
                      <EyeOff className="h-4 w-4" />
                      Hide
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4" />
                      Show
                    </>
                  )}
                </Button>

                <Button size="icon" variant="ghost" className="hidden">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <GalleryModal
        open={open}
        onOpenChange={(o) => !o && setOpen(false)}
        loading={creating}
        disabled={creating}
        onConfirm={(payload) => {
          createGalleryItem({
            body: {
              title: payload.title,
              isVisible: !!payload.isVisible,
              image: payload.image,
            },
          });
        }}
      />
    </section>
  );
}
