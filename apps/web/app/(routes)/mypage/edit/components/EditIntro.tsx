import { profileEditDataType } from '@/lib/validator';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface EditIntroPros {
  register: UseFormRegister<profileEditDataType>;
}

export const EditIntro = ({ register }: EditIntroPros) => {
  return (
    <div className='flex flex-col gap-3'>
      <p className='text-B1M16 text-text-primary pl-1'>소개</p>
      <textarea
        {...register('intro')}
        placeholder='간단한 자기 소개를 입력해 주세요.'
        maxLength={100}
        className={`text-B2R14 text-text-secondary placeholder:text-B2R14 placeholder:text-text-gray border-stroke-30 focus:border-stroke-50 h-[90px] w-full resize-none rounded-md border px-4 py-2.5 outline-none`}
      />
      <p className='text-B3R12 pl-1 text-[#4c4c4c]'>
        100자 이내로 작성해 주세요.
      </p>
    </div>
  );
};
