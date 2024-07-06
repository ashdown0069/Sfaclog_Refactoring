import { TextButton } from '@repo/ui/Button';

interface SectionHeaderProps {
  title: string;
  href?: string;
}

export const SectionHeader = ({ title, href }: SectionHeaderProps) => {
  return (
    <div className='flex items-center justify-between'>
      <p className='text-H1M24'>{title}</p>
      {href && <TextButton href={href} iconArea />}
    </div>
  );
};
