"use client";

import Button from "@/components/atom/Button";
import { SiteHeader } from "@/components/site-header";

import { Plus } from "lucide-react";
import { useState } from "react";
import { useGetAllTestimonials } from "@/hooks/services/testimonials/useGetAllTestimonials";
import TestimonialModal from "@/components/organism/modals/TestimonialModal";
import { usePatchTestimonial } from "@/hooks/services/testimonials/usePatchTestimonial";
import { useCreateTestimonial } from "@/hooks/services/testimonials/useCreateTestimonial";
import TestimonialTable from "@/components/organism/feat/dashboard/TestimonialTable";
import { useDeleteTestimonialById } from "@/hooks/services/testimonials/useDeleteTestimonialById";

export default function TestimonialsPage() {
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const { data, isLoading } = useGetAllTestimonials();

  const { mutate: createTestimonial, isPending: creating } =
    useCreateTestimonial(() => setOpen(false));

  const { mutate: updateTestimonial, isPending: updating } =
    usePatchTestimonial(() => {
      setCurrentId(null);
      setOpen(false);
    });

  const { mutate: deleteTestimonial } = useDeleteTestimonialById(() => {
    setCurrentId(null);
    setOpen(false);
  });

  return (
    <section>
      <SiteHeader title="Testimonials">
        <Button
          size="sm"
          onClick={() => {
            setIsEditMode(false);
            setCurrentId(null);
            setOpen(true);
          }}
        >
          <Plus /> Add Testimonial
        </Button>
      </SiteHeader>
      {data?.length && (
        <TestimonialTable
          data={data}
          pageNumber={1}
          pageSize={1000}
          totalRecords={data?.length || 0}
          loading={isLoading}
          onPageChange={() => {}}
          onPageSizeChange={() => {}}
          onEditButtonClick={(singleId) => {
            setIsEditMode(true);
            setCurrentId(singleId);
            setOpen(true);
          }}
          onEyeButtonClick={(singleId, value) => {
            updateTestimonial({
              id: singleId,
              body: { isVisible: value },
            });
          }}
          onDeleteButtonClick={(singleId) => {
            deleteTestimonial({
              id: singleId,
            });
          }}
        />
      )}

      <TestimonialModal
        open={open}
        onOpenChange={(o) => {
          if (!o) {
            setOpen(false);
            setIsEditMode(false);
            setCurrentId(null);
          }
        }}
        isEditMode={isEditMode}
        loading={creating || updating}
        disabled={creating || updating}
        defaultValues={
          isEditMode
            ? {
                ...data?.find((t) => t.id === currentId),
                image:
                  data?.find((t) => t.id === currentId)?.Asset?.url || null,
              }
            : undefined
        }
        onConfirm={(payload) => {
          if (isEditMode && currentId) {
            updateTestimonial({
              id: currentId,
              body: { ...payload, isVisible: !!payload.isVisible },
            });
          } else {
            createTestimonial({
              body: { ...payload, isVisible: !!payload.isVisible },
            });
          }
        }}
      />
    </section>
  );
}
