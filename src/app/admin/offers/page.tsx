"use client";

import Button from "@/components/atom/Button";
import BaseModal from "@/components/molecule/BaseModal";
import OffersTable from "@/components/organism/feat/dashboard/OffersTable";
import { SiteHeader } from "@/components/site-header";
import { useGetAllOffers } from "@/hooks/services/offers/useGetAllOffers";
import { usePatchOffer } from "@/hooks/services/offers/usePatchOffer";
import OfferModal from "@/components/organism/modals/OfferModal";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useCreateOffer } from "@/hooks/services/offers/useCreateOffer";
import { useGetAllProducts } from "@/hooks/services/products/useGetAllProducts";
import { useDeleteOffer } from "@/hooks/services/offers/useDeleteOffer";

export default function OffersPage() {
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading } = useGetAllOffers();
  const {} = useGetAllProducts({
    page: 1,
    limit: 10000,
    search: "",
    visible: undefined,
  });
  const { mutate: createOffer, isPending: creating } = useCreateOffer(() =>
    setOpen(false),
  );

  const { mutate: updateOffer, isPending: updating } = usePatchOffer(() => {
    setCurrentId(null);
    setOpen(false);
  });

  const { mutate: deleteOffer, isPending: deleting } = useDeleteOffer(() => {
    setDeleteId(null);
    setDeleteOpen(false);
  });

  const selectedOffer = data?.find((offer) => offer.id === deleteId);
  return (
    <section>
      <SiteHeader title="Offers">
        <Button
          size="sm"
          onClick={() => {
            setIsEditMode(false);
            setCurrentId(null);
            setOpen(true);
          }}
        >
          <Plus /> Create Offer
        </Button>
      </SiteHeader>

      <OffersTable
        data={data || []}
        pageNumber={1}
        pageSize={10}
        totalRecords={data?.length || 0}
        loading={isLoading}
        onPageChange={() => {}}
        onPageSizeChange={() => {}}
        onEyeClick={(id, value) => {
          updateOffer({
            id,
            body: { isVisible: value },
          });
        }}
        onEditClick={(id) => {
          setIsEditMode(true);
          setCurrentId(id);
          setOpen(true);
        }}
        onDeleteClick={(id) => {
          setDeleteId(id);
          setDeleteOpen(true);
        }}
      />

      <OfferModal
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
          isEditMode ? data?.find((o) => o.id === currentId) : undefined
        }
        onConfirm={(payload) => {
          const apiPayload = {
            title: payload.title,
            description: payload.description,
            discountType: payload.discountType,
            discountValue: payload.discountValue,
            validFrom: payload.validFrom,
            validUntil: payload.validUntil,
            startsAt: payload.startsAt,
            endsAt: payload.endsAt,
            daysOfWeek: [...(payload.daysOfWeek || [])] as (
              | "SUNDAY"
              | "MONDAY"
              | "TUESDAY"
              | "WEDNESDAY"
              | "THURSDAY"
              | "FRIDAY"
              | "SATURDAY"
            )[],
            categoryId: payload.categoryId,
            productId: payload.productId,
          };

          console.log(apiPayload);

          if (isEditMode && currentId) {
            updateOffer({
              id: currentId,
              body: apiPayload,
            });
          } else {
            createOffer({
              body: apiPayload,
            });
          }
        }}
      />

      <BaseModal
        open={deleteOpen}
        onOpenChange={(value) => {
          setDeleteOpen(value);
          if (!value) {
            setDeleteId(null);
          }
        }}
        title="Delete Offer"
        description="This action cannot be undone."
        submitText="Delete"
        cancelText="Cancel"
        loading={deleting}
        disabled={deleting || !deleteId}
        onSubmit={() => {
          if (!deleteId) return;
          deleteOffer(deleteId);
        }}
      >
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete
          {selectedOffer?.title ? ` \"${selectedOffer.title}\"` : " this offer"}
          ?
        </p>
      </BaseModal>
    </section>
  );
}
