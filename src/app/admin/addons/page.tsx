"use client";

import Button from "@/components/atom/Button";
import { SiteHeader } from "@/components/site-header";
import AddonModal from "@/components/organism/modals/AddonModal";
import { useCreateAddon } from "@/hooks/services/addons/useCreateAddon";
import { useDeleteAddon } from "@/hooks/services/addons/useDeleteAddon";
import { useGetAllAddons } from "@/hooks/services/addons/useGetAllAddons";
import { usePatchAddon } from "@/hooks/services/addons/usePatchAddon";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export default function AddonsPage() {
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentAddonId, setCurrentAddonId] = useState<string | null>(null);

  const { data, isLoading } = useGetAllAddons();

  const { mutate: createAddon, isPending: isCreating } = useCreateAddon(() => {
    setOpen(false);
  });

  const { mutate: updateAddon, isPending: isUpdating } = usePatchAddon(() => {
    setCurrentAddonId(null);
    setOpen(false);
  });

  const { mutate: deleteAddon, isPending: isDeleting } = useDeleteAddon();

  const selectedAddon = data?.find((addon) => addon.id === currentAddonId);

  return (
    <section className="space-y-6">
      <SiteHeader title="Addons">
        <Button
          size="sm"
          onClick={() => {
            setCurrentAddonId(null);
            setIsEditMode(false);
            setOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Addon
        </Button>
      </SiteHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-28 animate-pulse rounded-xl border bg-muted"
              />
            ))
          : data?.map((addon) => (
              <div
                key={addon.id}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {addon.name}
                    </h3>
                    <p className="text-sm text-slate-600">
                      Rs. {addon.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setCurrentAddonId(addon.id);
                        setIsEditMode(true);
                        setOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={isDeleting}
                      onClick={() => deleteAddon(addon.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
      </div>

      <AddonModal
        open={open}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            setOpen(false);
            setIsEditMode(false);
            setCurrentAddonId(null);
          }
        }}
        isEditMode={isEditMode}
        loading={isCreating || isUpdating}
        disabled={isCreating || isUpdating}
        defaultValues={
          isEditMode && selectedAddon
            ? {
                name: selectedAddon.name,
                price: selectedAddon.price,
              }
            : undefined
        }
        onConfirm={(payload) => {
          if (isEditMode && currentAddonId) {
            updateAddon({
              id: currentAddonId,
              body: payload,
            });
            return;
          }

          createAddon({
            body: payload,
          });
        }}
      />
    </section>
  );
}
