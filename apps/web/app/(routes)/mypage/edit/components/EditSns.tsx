'use client';
import { BoxButton } from '@repo/ui/Button';
import { Input, Selectbox } from '@repo/ui';
import {
  IconCancelBoxGray,
  IconSnsBrunch,
  IconSnsGithub,
  IconSnsInstagram,
  IconSnsLink,
  IconSnsLinkedin,
  IconSnsNotion,
  IconSnsX,
  IconSnsYoutube,
  IconPlusGray,
} from '@repo/ui/Icon';
import { useEffect, useState } from 'react';
import {
  UseFormRegister,
  UseFormSetValue,
  Control,
  useFieldArray,
  useFormState,
} from 'react-hook-form';
import type { profileEditDataType } from '@/lib/validator';
import type { ISns } from '@/models/User';

//셀렉트 박스 리스트
const selectList = [
  {
    label: (
      <div className='text-B3R12 flex h-6 w-[110px] items-center justify-start gap-1.5'>
        <IconSnsLink />
        Link
      </div>
    ),
    value: 'link',
  },
  {
    label: (
      <div className='text-B3R12 flex h-6 w-[110px] items-center justify-start gap-1.5'>
        <IconSnsGithub />
        Github
      </div>
    ),
    value: 'github',
  },
  {
    label: (
      <div className='text-B3R12 flex h-6 w-[110px] items-center justify-start gap-1.5'>
        <IconSnsInstagram />
        Instagram
      </div>
    ),
    value: 'instagram',
  },
  {
    label: (
      <div className='text-B3R12 flex h-6 w-[110px] items-center justify-start gap-1.5'>
        <IconSnsNotion />
        Notion
      </div>
    ),
    value: 'notion',
  },
  {
    label: (
      <div className='text-B3R12 flex h-6 w-[110px] items-center justify-start gap-1.5'>
        <IconSnsX />X (twitter)
      </div>
    ),
    value: 'x',
  },
  {
    label: (
      <div className='text-B3R12 flex h-6 w-[110px] items-center justify-start gap-1.5'>
        <IconSnsBrunch />
        Brunch
      </div>
    ),
    value: 'brunch',
  },
  {
    label: (
      <div className='text-B3R12 flex h-6 w-[110px] items-center justify-start gap-1.5'>
        <IconSnsYoutube />
        Youtube
      </div>
    ),
    value: 'youtube',
  },
  {
    label: (
      <div className='text-B3R12 flex h-6 w-[110px] items-center justify-start gap-1.5'>
        <IconSnsLinkedin />
        LinkedIn
      </div>
    ),
    value: 'linkedin',
  },
];

interface EditSnsProps {
  register: UseFormRegister<profileEditDataType>;
  setValue: UseFormSetValue<profileEditDataType>;
  control: Control<profileEditDataType>;
}
const MAX__INPUT = 8; //SNS 등록 최대 갯수

export const EditSns = ({ register, setValue, control }: EditSnsProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  //배열로 된 sns 편집을 위한 훅
  const { append, fields, prepend, remove, replace } = useFieldArray({
    control,
    name: 'sns',
  });
  //에러 상태
  const { errors } = useFormState({
    control,
  });

  const [isInit, setIsInit] = useState(false);
  useEffect(() => {
    setIsInit(() => true);
  }, []);
  useEffect(() => {
    //빈 배열일 경우 초기값 추가 , 한개는 무조건 보이도록함
    if (fields.length === 0 && isInit) {
      prepend({ platform: 'link', url: '' });
    }
  }, [fields, append, isInit]);
  //인풋 추가하기
  const addAccountInput = () => {
    append({ platform: 'link', url: '' });
  };

  const removeAccountInput = (idx: number) => {
    if (fields.length === 1) {
      //배열에 1개만 남았을 경우 인풋 초기화
      replace({ platform: 'link', url: '' });
    } else {
      //아니면 제거
      remove(idx);
    }
  };

  return (
    <div className='flex flex-col gap-3'>
      <p className='text-B1M16 text-text-primary'>SNS</p>
      {fields.map((field, idx) => {
        return (
          <div
            key={field.id}
            className={`flex h-fit gap-2 relative ${activeIndex == idx ? 'z-20' : 'z-10'}`}
            onClick={() => setActiveIndex(idx)}
          >
            <Selectbox
              width='short'
              selectList={selectList}
              defaultValueIndex={selectList.findIndex(
                el => el.value == fields[idx]?.platform,
              )}
              onChange={data => {
                setValue(`sns.${idx}.platform`, data.value);
              }}
            />
            <div className='grow'>
              <Input
                type='text'
                placeholder='https://'
                errorMessage={errors.sns && errors.sns[idx]?.url?.message}
                {...register(`sns.${idx}.url`)}
              />
            </div>
            <button
              onClick={() => removeAccountInput(idx)} //인풋 제거
              className='flex cursor-pointer items-center justify-center pb-2'
            >
              <IconCancelBoxGray className='size-6' />
            </button>
          </div>
        );
      })}
      {fields.length < MAX__INPUT && (
        <div className='flex justify-end'>
          <BoxButton
            size='small'
            style='none'
            type='button'
            icon={<IconPlusGray className='size-4' />}
            iconPosition='right'
            className='border-neutral-10 border-2'
            onClick={addAccountInput}
          >
            추가하기
          </BoxButton>
        </div>
      )}
      {fields.length >= MAX__INPUT && (
        <div className='text-B3R12 text-brand-100'>
          최대 8개까지 입력할 수 있어요.
        </div>
      )}
    </div>
  );
};
