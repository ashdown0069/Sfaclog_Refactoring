import Image from 'next/image';

interface AvatarProps {
  type?: 'all' | 'user';
  url?: string;
  size: 'xs' | 's' | 'm' | 'l';
}

const sizeClasses = {
  xs: 'w-[25px] h-[25px]',
  s: 'w-8 h-8',
  m: 'w-[50px] h-[50px]',
  l: 'w-20 h-20',
};

export function Avatar({
  size,
  type = 'user',
  url = '/images/Avatar.png',
}: AvatarProps) {
  return (
    <div
      className={`overflow-hidden rounded-full ${sizeClasses[size]} relative`}
    >
      {type === 'user' ? (
        <Image src={url} alt='profile image' fill className='object-cover' />
      ) : (
        <div className='bg-brand-90 text-white font-semibold flex items-center justify-center w-full h-full rounded-full'>
          ALL
        </div>
      )}
    </div>
  );
}
