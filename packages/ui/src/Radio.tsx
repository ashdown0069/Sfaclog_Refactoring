"use client";
import { IconRadioBoxBlue, IconRadioBoxGray } from "@repo/ui/Icon";

interface RadioButtonsProps {
  /**
   * 라디오 버튼의 라벨 값
   */
  label: string;
  /**
   * 라디오 버튼 선택시 선택될 값
   */
  value: string;
  /**
   * 라디오 버튼의 name
   */
  name: string;
  /**
   * 라디오 버튼의 값이 바뀔 시 클릭시 이벤트
   */
  onChange: ({ name, value }: { name: string; value: string }) => void;
  /**
   * 라디오 버튼의 체크 여부
   */
  checked?: boolean;
}

export function Radio({
  value,
  name,
  label,
  onChange,
  checked = false,
}: RadioButtonsProps) {
  return (
    <div className="inline-block p-[10px]">
      <label className="group flex gap-[10px]">
        <input
          defaultChecked={checked}
          type="radio"
          name={name}
          className="peer hidden"
          value={value}
          onChange={(e) => onChange({ name, value: e.target.value })}
        />
        <span className="hidden size-5 peer-checked:block ">
          <IconRadioBoxBlue />
        </span>
        <span className="block size-5 peer-checked:hidden">
          <IconRadioBoxGray />
        </span>
        <div className="text-B1R16 w-max">{label}</div>
      </label>
    </div>
  );
}
