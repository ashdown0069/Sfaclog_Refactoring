"use client";
import { useState } from "react";
import { Switch } from "@headlessui/react";

interface ToggleProps {
  leftText?: string;
  rightText?: string;
  /**
   * 탭이 변경될 때 이벤트
   */
  onToggle?: () => void;
}

export function Toggle({ leftText, rightText, onToggle }: ToggleProps) {
  const [enabled, setEnabled] = useState(false);

  const handleToggle = () => {
    setEnabled((prevState) => !prevState); // 상태 토글
    if (onToggle) {
      onToggle(); // 부모 컴포넌트의 onToggle 호출
    }
  };

  return (
    <Switch
      checked={enabled}
      onChange={handleToggle}
      className={`text-B1M16 relative z-[1]  inline-flex h-[50px] items-center rounded-[30px] bg-gray-200`}
    >
      <div className="relative z-10 flex">
        <div
          className={`px-5 py-4 ${!enabled ? "text-text-point" : "text-text-gray"} ${leftText ? "min-w-max" : "min-w-[50px]"} `}
        >
          {leftText}
        </div>
        <div
          className={`px-5 py-4 ${enabled ? "text-text-point" : "text-text-gray"} ${rightText ? "min-w-max" : "min-w-[50px]"} `}
        >
          {rightText}
        </div>
      </div>
      <div className="absolute top-0 w-full">
        <span
          className={`${
            enabled ? "translate-x-1/2" : "-translate-x-1/2"
          } shadow-custom inline-block h-[50px] w-1/2 rounded-full bg-white transition`}
        />
      </div>
    </Switch>
  );
}
