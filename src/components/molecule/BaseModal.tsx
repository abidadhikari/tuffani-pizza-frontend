import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Button from "../atom/Button";

export interface IBaseModal {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  onSubmit?: (...params: any[]) => void;
  submitText?: string;
  cancelText?: string;
  disabled?: boolean;
  type?: "default" | "destructive" | "success";
  loading?: boolean;
  showCancelButton?: boolean;
  showSubmitButton?: boolean;
}

export default function BaseModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  onSubmit,
  submitText,
  cancelText,
  disabled,
  type = "default",
  loading,
  showCancelButton = true,
  showSubmitButton = true,
}: IBaseModal) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-6 border rounded-2xl shadow-lg z-50 [&>button>svg]:text-gray-700 dark:[&>button>svg]:text-gray-300 flex flex-col max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-primary-variant-2 dark:text-primary-variant-1">
            {title}
          </DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="overflow-y-auto flex-1 pt">{children}</div>
        <DialogFooter>
          {!loading && showCancelButton && (
            <Button variant="secondary" onClick={() => onOpenChange?.(false)}>
              {cancelText ?? "Cancel"}
            </Button>
          )}

          {showSubmitButton && (
            <Button
              onClick={onSubmit}
              disabled={disabled || loading}
              // variant={type}
              isLoading={loading}
            >
              {submitText ?? "Proceed"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
