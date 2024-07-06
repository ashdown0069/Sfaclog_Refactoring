"use client";
import { InputHTMLAttributes, forwardRef, useState } from "react";

import { IconViewCancel, IconViewGray } from "@repo/ui/Icon";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: "text" | "password";
  errorMessage?: string | undefined;
  successMessage?: string | boolean;
  hint?: string;
}
/** 넓이는 부모 요소에 따라 유동적으로 변화하며, 높이는 40px로 고정된 Input 컴포넌트입니다.<br/>
 * react hook form 에서 사용되는 Input 컴포넌트입니다.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, errorMessage, successMessage, hint, type, ...props }, ref) => {
    const [isViewMode, setIsViewMode] = useState(false);
    const receivedClassName = className;
    return (
      <div className="relative flex size-full flex-col gap-[10px]">
        <input
          type={isViewMode && type == "password" ? "text" : type}
          ref={ref}
          {...props}
          className={`text-B2R14 text-text-secondary placeholder:text-B2R14 placeholder:text-text-gray  h-[40px] w-full rounded-md border px-4 outline-none ${receivedClassName} ${errorMessage ? "border-highlight-warning" : "border-neutral-30"}`}
        />
        {isViewMode && type === "password" && (
          <div
            className="absolute right-[10px] top-[10px] size-5 cursor-pointer"
            onClick={() => setIsViewMode((prev) => !prev)}
          >
            <IconViewCancel />
          </div>
        )}
        {!isViewMode && type === "password" && (
          <div
            className="absolute right-[10px] top-[10px] size-5 cursor-pointer"
            onClick={() => setIsViewMode((prev) => !prev)}
          >
            <IconViewGray />
          </div>
        )}
        <div>
          {errorMessage && (
            <div className="text-B3R12 text-text-waring pl-1">
              {errorMessage}
            </div>
          )}
          {successMessage && !errorMessage && (
            <div className="text-B3R12 text-text-success pl-1">
              {successMessage}
            </div>
          )}
          {hint && !errorMessage && !successMessage && (
            <div className="text-B3R12 text-text-gray pl-1">{hint}</div>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "InputCustom";
