"use  client";
import React from "react";

interface BoxButtonProps {
  /**
   * Button type
   */
  type: "submit" | "button";
  /**
   * Button style
   */
  style: keyof typeof btnStyleClasses;
  /**
   * Button size
   */
  size: keyof typeof btnSizeClasses;
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
  iconPosition?: keyof typeof iconPositionSettingClasses;
  /**
   * Additional class name
   */
  className?: string;
  children: React.ReactNode;
}

const btnSizeClasses = {
  small: "min-w-[110px] h-[30px] text-B3M12",
  middle: "min-w-[150px] h-[40px] text-B2M14",
  large: "min-w-[360px] h-[50px] text-B1B16",
};

const iconPositionSettingClasses = {
  left: "flex-row",
  right: "flex-row-reverse",
};

const btnStyleClasses = {
  none: "",
  solid:
    "bg-brand-70 hover:bg-brand-90 active:bg-brand-90 text-white border border-transparent",
  outline: "border border-brand-90 text-brand-90 ",
};

export default function BoxButton({
  type,
  size,
  disabled,
  onClick,
  icon,
  iconPosition = "left",
  style = "solid",
  className,
  children,
}: BoxButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${btnSizeClasses[size]} ${btnStyleClasses[style]} disabled:bg-neutral-10 disabled:text-neutral-30 rounded-[6px] px-4 duration-200  ease-in-out disabled:border-transparent ${className}`}
    >
      <div
        className={`flex items-center justify-center gap-1.5 ${iconPositionSettingClasses[iconPosition]}`}
      >
        {icon}
        {children}
      </div>
    </button>
  );
}
