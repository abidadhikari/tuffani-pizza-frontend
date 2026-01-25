import Button from "@/components/atom/Button";

interface FilterToggleButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export default function FilterToggleButton({
  label,
  active,
  onClick,
}: FilterToggleButtonProps) {
  return (
    <Button variant={active ? "default" : "outline"} onClick={onClick}>
      {label}
    </Button>
  );
}
