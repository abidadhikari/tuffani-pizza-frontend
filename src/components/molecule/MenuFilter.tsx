import React from "react";
import Button from "../atom/Button";
import CheckboxField from "../atom/CheckboxField";
import FilterToggleButton from "../atom/FilterToggleButton";

interface MenuFilterProps {
  selectedItem: string;
  setSelectedItem: (item: string) => void;
  selectOptions: { label: string; value: string }[];
}

export default function MenuFilter({
  selectedItem,
  setSelectedItem,
  selectOptions,
}: MenuFilterProps) {
  return (
    <>
      <div className="flex gap-4 flex-wrap">
        {selectOptions?.map((option) => {
          return (
            <FilterToggleButton
              key={option.value}
              label={option.label}
              active={selectedItem === option.value}
              onClick={() => setSelectedItem(option.value)}
            />
          );
        })}
      </div>
    </>
  );
}
