"use client";
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  IconTaillessArrowUpBlack,
  IconTaillessArrowDownBlack,
} from "../public/svgs";

interface SelectListItem {
  value: string;
  label: string | React.ReactNode;
}

interface SelectBoxProps {
  /**
   * SelectBox의 길이
   */
  width: "long" | "middle" | "short";
  /**
   * Placeholder
   */
  placeholder?: string;
  onChange: (data: SelectListItem) => void;
  /**
   * SelectBox의 항목 <br/>
    value: string /
    label: string | React.ReactNode;
   */
  selectList: SelectListItem[];
  /**
   * SelectBox에서 렌더링시 기본적으로 선택할 값의 인덱스
   */
  defaultValueIndex?: number;
}

export function Selectbox({
  onChange,
  width = "long",
  placeholder,
  selectList,
  defaultValueIndex,
}: SelectBoxProps) {
  const [selected, setSelected] = useState<SelectListItem | null>(null);

  useEffect(() => {
    if (defaultValueIndex !== undefined && selectList[defaultValueIndex]) {
      setSelected(selectList[defaultValueIndex] as SelectListItem);
    } else if (!placeholder && selectList.length > 0) {
      setSelected(selectList[0] as SelectListItem);
    } else {
      setSelected(null);
    }
  }, [placeholder, defaultValueIndex, selectList]);

  const widthClasses = {
    long: "w-[400px]",
    middle: "w-[250px]",
    short: "w-[122px]",
  };
  const handleValChange = (data: { label: string; value: string }) => {
    setSelected(() => data);
    onChange(data);
  };

  return (
    <div className={`${widthClasses[width]} relative isolate`}>
      <Listbox value={selected} onChange={handleValChange}>
        {({ open }) => (
          <>
            <Listbox.Button
              className={`${open ? "border-stroke-50" : ""} relative w-full cursor-pointer rounded-md border bg-white py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm`}
            >
              <span className="block truncate">
                {selected ? (
                  <span className="text-text-primary">{selected.label}</span>
                ) : (
                  <span className="text-neutral-40">{placeholder}</span>
                )}
              </span>
              <span
                className={`${open ? "hidden" : ""} pointer-events-none absolute inset-y-0 right-0 z-20 flex items-center pr-2`}
              >
                <IconTaillessArrowDownBlack />
              </span>
              <span
                className={`${!open ? "hidden" : ""} pointer-events-none absolute inset-y-0 right-0 z-10 flex items-center pr-2`}
              >
                <IconTaillessArrowUpBlack />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="shadow-custom scrollbar-hide absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-md bg-white !p-2 text-base focus:outline-none sm:text-sm">
                {selectList.map((item, itemIdx) => (
                  <Listbox.Option
                    key={itemIdx}
                    className={({ active }) =>
                      `relative text-B1R16 list-none rounded-md cursor-pointer select-none ${width === "long" ? "!py-2 !pl-6 !pr-4" : "!py-2 !pl-3 !pr-2"} ${
                        active
                          ? "bg-brand-10 text-brand-100"
                          : "text-neutral-40"
                      }`
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected && "text-brand-100"
                          }`}
                        >
                          {item.label}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </>
        )}
      </Listbox>
    </div>
  );
}
