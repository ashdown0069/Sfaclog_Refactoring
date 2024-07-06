import React, { useRef, useState } from 'react';
import { IconCancelBlack } from '@repo/ui/Icon';

interface TagInputProps {
  logHashtags: string[];
  setLogHashtags: React.Dispatch<React.SetStateAction<string[]>>;
}

/**
 *
 * @param hashtags useState 현재상태
 * @param setHashtags useState 변경함수
 */

export const TagsInput = ({ logHashtags, setLogHashtags }: TagInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  // const [hashtags, setHashtags] = useState<string[]>(tags ? tags : []);
  const [hashtagInput, setHashtagsInput] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setHashtagsInput(value);
  };

  const onDelete = (tag: string) => {
    setLogHashtags((prev: string[]) =>
      prev.filter((item: string) => item !== tag),
    );
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.nativeEvent.isComposing) return;
      setHashtagsInput('');

      if (!hashtagInput) return;
      if (logHashtags.includes(hashtagInput)) return;
      setLogHashtags((prev: string[]) => [...prev, hashtagInput]);
    }
  };

  const handleTagBoxClick = () => {
    if (inputRef) {
      inputRef.current?.focus();
    }
  };

  return (
    <div
      className='border-neutral-30 h-fit w-full border-b-2 p-3 pb-1'
      onClick={handleTagBoxClick}
    >
      <ul className='flex flex-wrap gap-3'>
        {logHashtags.map((tag, i) => (
          <li
            key={i}
            className='bg-neutral-5 text-B2M14 text-text-secondary flex h-fit min-w-fit items-center gap-2 rounded-full px-[6px] py-1'
          >
            # {tag}
            <span onClick={() => onDelete(tag)}>
              <IconCancelBlack className='size-3 cursor-pointer' />
            </span>
          </li>
        ))}
        {logHashtags.length <= 5 && (
          <div className='inline-flex w-fit items-center'>
            <span className='text-B2R14 text-text-gray'>#</span>
            <input
              id='tag'
              type='text'
              value={hashtagInput}
              autoComplete='off'
              onChange={onChange}
              onKeyDown={onKeyDown}
              placeholder='태그 입력'
              className='placeholder:text-B2R14 placeholder:text-text-gray w-[100px] py-1 pr-[6px] outline-none'
              ref={inputRef}
              maxLength={10}
            />
          </div>
        )}
      </ul>
    </div>
  );
};
