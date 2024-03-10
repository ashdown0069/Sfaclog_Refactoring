"use  client";

import React from "react";

interface CapsuleButtonProps {
  /**
   * Button type
   */
  type?: "submit" | "button";
  /**
   * Button style
   */
  style: keyof typeof btnStyle;
  /**
   * Button size
   */
  size: keyof typeof btnSize;
  /**
   * Button disabled state
   */
  disabled?: boolean;
  /**
   * Button click event
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Icon to be displayed in the button
   */
  icon?: React.ReactNode;
  /**
   * Position of the icon
   */
  iconPosition?: keyof typeof iconPositionSetting;
  /**
   * Additional class name
   */
  className?: string;
  /**
   * Children
   */
  children?: React.ReactNode;
}

const iconPositionSetting = {
  left: "flex-row",
  right: "flex-row-reverse",
};

const btnSize = {
  small: "h-[32px] px-4",
  middle: "h-[36px] px-4",
  large: "h-[40px] px-6",
};

const btnStyle = {
  none: "",
  solid:
    "bg-brand-70 hover:bg-brand-90 active:bg-brand-90 border-brand-70 hover:border-brand-90 text-white",
  outline:
    "border-brand-70 text-brand-70 bg-white hover:border-[#4C8BFF] hover:bg-[#EFF3FA] active:bg-[#EFF3FA]",
};

export default function CapsuleButton({
  type = "button",
  icon,
  size = "small",
  style = "solid",
  iconPosition = "left",
  disabled,
  onClick,
  className,
  children,
}: CapsuleButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${btnSize[size]} ${btnStyle[style]} disabled:bg-neutral-10 disabled:text-neutral-30 text-B2M14 min-w-max rounded-full border duration-200 ease-in-out disabled:border-transparent ${className}`}
    >
      <div
        className={`flex items-center justify-center gap-1.5 ${iconPositionSetting[iconPosition]}`}
      >
        {icon}
        {children}
      </div>
    </button>
  );
}
