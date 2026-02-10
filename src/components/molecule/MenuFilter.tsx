import React from "react";
import FilterToggleButton from "../atom/FilterToggleButton";

interface MenuFilterProps {
  selectedItems: string[]; // 👈 multi-select
  setSelectedItems: (items: string[] | ((prev: string[]) => string[])) => void;
  selectOptions: { label: string; value: string }[];
}

export default function MenuFilter({
  selectedItems,
  setSelectedItems,
  selectOptions,
}: MenuFilterProps) {
  const handleToggle = (value: string) => {
    setSelectedItems((prev: string[]) => {
      // If "all" clicked → reset everything
      if (value === "all") {
        return ["all"];
      }

      // Remove "all" when selecting other categories
      const withoutAll = prev.filter((v: string) => v !== "all");

      // Toggle logic
      if (withoutAll.includes(value)) {
        const updated = withoutAll.filter((v: string) => v !== value);
        return updated.length === 0 ? ["all"] : updated;
      }

      return [...withoutAll, value];
    });
  };

  return (
    <div className="flex gap-4 flex-wrap">
      {selectOptions.map((option) => (
        <FilterToggleButton
          key={option.value}
          label={option.label}
          active={selectedItems.includes(option.value)}
          onClick={() => handleToggle(option.value)}
        />
      ))}
    </div>
  );
}
