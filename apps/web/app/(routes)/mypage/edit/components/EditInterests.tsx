'use client';
import React from 'react';
import { Check } from '@repo/ui';
import { logPublishCategoryList } from '@/constant';
interface EditInterestsProps {
  myInterests: string[];
  setMyInterests: React.Dispatch<React.SetStateAction<string[]>>;
}
export const EditInterests = ({
  myInterests,
  setMyInterests,
}: EditInterestsProps) => {
  const handleInterest = (value: string, checked: boolean) => {
    //checked == true 이면 추가 아니면 제거
    if (checked) {
      setMyInterests(prev => [...prev, value]);
    } else {
      setMyInterests(prev => prev.filter(el => el !== value));
    }
  };
  return (
    <div>
      <div className='text-B1M16 mb-2'>관심 분야</div>
      <div className='flex flex-wrap'>
        {logPublishCategoryList.map((item, idx) => {
          return (
            <div key={idx} className='w-1/2'>
              <Check
                label={item.label}
                value={item.value}
                name='interests'
                checked={myInterests.includes(item.value)}
                onChange={data => handleInterest(data.value, data.checked)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
