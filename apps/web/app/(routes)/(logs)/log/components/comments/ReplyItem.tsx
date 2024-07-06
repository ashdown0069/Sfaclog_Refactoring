import { Avatar } from '@/components/Avatar/Avatar';
import { formatDateCommentItem } from '@/utils/formatUtils';
import { IconReplyArrow } from '@repo/ui/Icon';

interface ReplyItemProps {
  nickname: string;
  avatar: string;
  createdAt: string;
  content: string;
}

export const ReplyItem = ({
  avatar,
  content,
  createdAt,
  nickname,
}: ReplyItemProps) => {
  return (
    <div className='bg-neutral-5 h-28 w-full border-b px-7 py-3'>
      <div className='flex items-center justify-start'>
        <div className='p-1'>
          <IconReplyArrow />
        </div>
        <div className='flex items-center gap-2'>
          <Avatar size='s' type='user' url={avatar ? avatar : undefined} />
          <span className='text-B2B14'>{nickname}</span>
          <span className='text-text-gray text-B3R12'>
            {formatDateCommentItem(createdAt)}
          </span>
        </div>
      </div>
      <div className='text-B2R14 text-text-primary p-3'>{content}</div>
    </div>
  );
};
