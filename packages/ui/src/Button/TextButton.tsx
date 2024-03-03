"use client";
import Link from "next/link";
import { IconTaillessArrowRightBlue } from "../../public/svgs";

interface TextButtonProps {
  /**
   * 이동할 링크
   */
  href: string;
  /**
   * 아이콘 영역 표시 여부
   */
  iconArea?: boolean;
}

export default function TextButton({ href, iconArea = true }: TextButtonProps) {
  return (
    <Link
      href={href}
      className="text-B2R14 text-neutral-80 flex h-[28px] min-w-max cursor-pointer items-center gap-2 px-3"
    >
      더보기
      {iconArea && (
        <span className="size-4">
          <IconTaillessArrowRightBlue />
        </span>
      )}
    </Link>
  );
}
