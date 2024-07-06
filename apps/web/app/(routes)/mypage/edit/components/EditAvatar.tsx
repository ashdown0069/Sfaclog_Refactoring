'use client';
import React, { useEffect, useState, useRef } from 'react';
import { Avatar } from '@/components/Avatar/Avatar';
import { imageFileSchema } from '@/lib/validator';

interface AvatarInputProps {
  avatar: string;
  selectedFile: File | undefined;
  setSelectedFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

export const EditAvatar = ({
  avatar,
  selectedFile,
  setSelectedFile,
}: AvatarInputProps) => {
  const filePickerRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(avatar);

  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      //유효성검사
      const result = imageFileSchema.safeParse(file);
      if (result.success) {
        //성공하면
        setSelectedFile(result.data);
      } else {
        //실패하면
        const errorMessages = result.error.errors.map(err => err.message);
        alert(`${errorMessages.join('\n')}`);
        return;
      }
    }
  };

  const filePickerClick = () => {
    //@ts-ignore
    filePickerRef.current?.click();
  };
  const deleteAvatar = () => {
    setPreviewUrl('');
    setSelectedFile(undefined);
  };

  return (
    <div className='flex w-[155px] flex-col gap-3'>
      <div className='size-[155px] overflow-hidden rounded-md'>
        {previewUrl.length !== 0 ? (
          <img
            src={previewUrl}
            className='size-full cursor-pointer object-cover'
            alt='avatar image'
            onClick={filePickerClick}
          />
        ) : (
          <div
            onClick={filePickerClick}
            className='bg-neutral-5 flex size-full cursor-pointer items-center justify-center'
          >
            <Avatar size='l' />
          </div>
        )}
      </div>
      <input
        type='file'
        className='hidden'
        onChange={onFileChange}
        id='profileAvatar'
        accept='.jpg,.png,.jpeg'
        ref={filePickerRef}
      />
      <label
        htmlFor='profileAvatar'
        className='flex h-10 w-full cursor-pointer items-center justify-center rounded-md bg-[#eee]'
      >
        프로필 사진 변경
      </label>
      <button
        type='button'
        onClick={() => deleteAvatar()}
        className='flex h-10 w-full cursor-pointer items-center justify-center rounded-md bg-[#eee]'
      >
        프로필 사진 삭제
      </button>
      <p className='text-B5R10 text-neutral-40'>
        5MB 이내의 이미지 파일을
        <br />
        업로드 해 주세요.
      </p>
    </div>
  );
};
