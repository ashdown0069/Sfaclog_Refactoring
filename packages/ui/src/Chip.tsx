import React from "react";

interface ChipProps {
  size: keyof typeof chipSize;
  children: React.ReactNode;
}
const chipSize = {
  small: "h-[22px] px-2 py-1",
  large: "h-[34px] px-3 py-[10px]",
};
export function Chip({ children, size }: ChipProps) {
  return (
    <div
      className={`${chipSize[size]} bg-tag-tag text-text-primary text-B3R12 inline-flex w-max items-center justify-center rounded-[20px]`}
    >
      {children}
    </div>
  );
}
