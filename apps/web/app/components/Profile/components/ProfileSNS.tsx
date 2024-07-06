import type { ISns } from '@/models/User';
import {
  IconSnsBrunch,
  IconSnsGithub,
  IconSnsInstagram,
  IconSnsLink,
  IconSnsLinkedin,
  IconSnsNotion,
  IconSnsX,
  IconSnsYoutube,
} from '@repo/ui/Icon';
import React from 'react';

interface ProfileSNSProps {
  sns: ISns[];
}

const selectIcon: Record<string, React.ReactElement> = {
  github: <IconSnsGithub />,
  linkedin: <IconSnsLinkedin />,
  instagram: <IconSnsInstagram />,
  notion: <IconSnsNotion />,
  brunch: <IconSnsBrunch />,
  youtube: <IconSnsYoutube />,
  x: <IconSnsX />,
  link: <IconSnsLink />,
};

export function ProfileSNS({ sns }: ProfileSNSProps) {
  return (
    <div className='flex flex-col gap-2'>
      <div className='text-B1B16 mb-3'>SNS</div>
      <div className='flex flex-wrap gap-5'>
        {sns.map((item, idx) => (
          <a key={idx} href={item.url} target='_blank'>
            <div className='size-[28px]'>
              {selectIcon[item.platform as string]}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
{
}
