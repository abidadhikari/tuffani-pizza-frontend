"use client";

import Button from "@/components/atom/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUpdateMe } from "@/hooks/services/users/useUpdateMe";
import { useAppSelector } from "@/store/storeHook";
import { Phone, Pencil, ArrowLeft } from "lucide-react";
import { useState } from "react";

interface PhoneConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmed: () => void;
}

export default function PhoneConfirmModal({
  open,
  onOpenChange,
  onConfirmed,
}: PhoneConfirmModalProps) {
  const { user } = useAppSelector("auth");
  const { mutate: updateMe, isPending: isUpdating } = useUpdateMe();

  const currentPhone = String(user?.phone ?? "");

  // Initialized once per mount; parent passes a new `key` on each open
  const [mode, setMode] = useState<"confirm" | "edit">("confirm");
  const [phoneInput, setPhoneInput] = useState(currentPhone);

  const isValidNepalPhone = (val: string) => /^[0-9]{10}$/.test(val);
  const phoneError =
    phoneInput.length > 0 && !isValidNepalPhone(phoneInput)
      ? "Phone number must be exactly 10 digits."
      : null;
  const isPhoneReady = isValidNepalPhone(phoneInput);

  const isCurrentPhoneValid = isValidNepalPhone(currentPhone);

  const handleConfirm = () => {
    onOpenChange(false);
    onConfirmed();
  };

  const handleUpdateAndOrder = () => {
    const trimmed = phoneInput.trim();
    if (!isValidNepalPhone(trimmed)) return;

    updateMe(
      { phone: trimmed, name: user?.name ?? "" },
      {
        onSuccess: () => {
          onOpenChange(false);
          onConfirmed();
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm" showCloseButton>
        {mode === "confirm" ? (
          <>
            <DialogHeader>
              <DialogTitle>Confirm your phone number</DialogTitle>
              <DialogDescription>
                We&apos;ll reach you on this number for order updates.
              </DialogDescription>
            </DialogHeader>

            <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
              <Phone className="size-4 shrink-0 text-slate-500" />
              <span className="flex-1 font-medium text-slate-900">
                {currentPhone || (
                  <span className="text-slate-400 italic">No number saved</span>
                )}
              </span>
            </div>

            {!isCurrentPhoneValid && (
              <p className="text-xs text-amber-600">
                Your saved number doesn&apos;t look valid. Please update it
                before ordering.
              </p>
            )}

            <div className="flex flex-col gap-2">
              <Button
                onClick={handleConfirm}
                className="w-full"
                disabled={!isCurrentPhoneValid}
              >
                Confirm &amp; Place Order
              </Button>
              <button
                type="button"
                onClick={() => setMode("edit")}
                className="flex items-center justify-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
              >
                <Pencil className="size-3.5" />
                Change number
              </button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Update phone number</DialogTitle>
              <DialogDescription>
                Enter your new number. Your order will be placed after saving.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-1">
              <Input
                type="tel"
                placeholder="e.g. 9841000000"
                value={phoneInput}
                maxLength={10}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setPhoneInput(digits);
                }}
                autoFocus
              />
              {phoneError && (
                <p className="text-xs text-red-500">{phoneError}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Button
                onClick={handleUpdateAndOrder}
                isLoading={isUpdating}
                disabled={isUpdating || !isPhoneReady}
                className="w-full"
              >
                Update &amp; Place Order
              </Button>
              <button
                type="button"
                onClick={() => setMode("confirm")}
                className="flex items-center justify-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
              >
                <ArrowLeft className="size-3.5" />
                Back
              </button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
