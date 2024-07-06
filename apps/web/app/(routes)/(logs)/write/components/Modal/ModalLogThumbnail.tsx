'use client';
import { useEffect, useState } from 'react';
import { IconPlusGray } from '@repo/ui/Icon';
import Image from 'next/image';
import { imageFileSchema } from '@/lib/validator';
interface ModalLogThumbnailProps {
  logThumbnail: string;
  thumbnailFile: File | undefined;
  setThumbnailFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}
/**
 *
 * @param file useState 파일 상태
 * @param setFile useState 파일 상태 변경 함수
 */
export const ModalLogThumbnail = ({
  logThumbnail,
  thumbnailFile,
  setThumbnailFile,
}: ModalLogThumbnailProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | ArrayBuffer>(
    logThumbnail,
  );
  useEffect(() => {
    if (thumbnailFile) {
      const objectUrl = URL.createObjectURL(thumbnailFile);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [thumbnailFile]);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      //유효성검사
      const result = imageFileSchema.safeParse(file);
      if (result.success) {
        //성공하면
        setThumbnailFile(result.data);
      } else {
        //실패하면
        const errorMessages = result.error.errors.map(err => err.message);
        alert(`${errorMessages.join('\n')}`);
        return;
      }
    }
  };

  const deleteThumbnail = () => {
    setPreviewUrl('');
    setThumbnailFile(undefined);
  };
  return (
    <div className='flex flex-col gap-2'>
      <div>
        <label
          htmlFor='thumbnail'
          className='border-stroke-30 bg-neutral-5 relative flex aspect-square w-[200px] cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-md border'
        >
          <>
            {previewUrl !== '' ? (
              <Image
                width={200}
                height={200}
                alt='preview'
                src={previewUrl as string}
                className='object-fill'
              />
            ) : (
              <>
                <IconPlusGray className='size-8' />
                <span className='text-B3R12 text-text-gray'>썸네일 추가</span>
              </>
            )}
          </>
        </label>
      </div>
      <input
        type='file'
        id='thumbnail'
        className='hidden'
        accept='.jpg,.png,.jpeg'
        onChange={onFileChange}
      />
      <button
        type='button'
        onClick={() => deleteThumbnail()}
        className='flex h-10 w-full cursor-pointer items-center justify-center rounded-md bg-[#eee]'
      >
        썸네일 삭제
      </button>
    </div>
  );
};
