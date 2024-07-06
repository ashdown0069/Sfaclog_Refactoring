import type { ICareer } from '@/models/User';
import { FormatDateCareerPeriod } from '@/utils/formatUtils';
import React from 'react';

export function ProfileCareer({ career }: { career: ICareer[] }) {
  return (
    <div className='flex flex-col gap-3'>
      <div className='text-B1B16'>경력사항</div>
      {career &&
        career.map((item, idx) => (
          <div key={idx}>
            <div className='flex flex-col gap-1'>
              <div className='flex gap-2'>
                <div className='text-B1M16 text-text-primary'>
                  {item.company}
                </div>
                <div className='text-B2M14 text-text-primary'>
                  {item.position}
                </div>
              </div>
              <div className='text-B3M12 text-text-primary mb-1'>
                {FormatDateCareerPeriod(item.startDate as string)}&nbsp;~&nbsp;
                {item.endDate && FormatDateCareerPeriod(item.endDate as string)}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
