'use client';
import BlockEditor from '@/editor/components/BlockEditor/BlockEditor';
import { useBlockEditor } from '@/editor/hooks/useBlockEditor';
import { LoadingSpinner } from '@/components/Spinner/LoadingSpinner';
import { Chip } from '@repo/ui';
import { ViewerHeader } from './ViewerHeader';
import { ViewerLikeBtn } from './ViewerLikeBtn';
import type { ILog } from '@/models/Log';

interface LogEditorProps {
  log: ILog;
  hasHeading: boolean;
  /**
   * @param isLogOwner 로그 작성자인지 여부
   */
  isLogOwner: boolean;
  isLoggedIn: boolean;
  isLikedUser: boolean;
}
export const LogViewer = ({
  log,
  hasHeading,
  isLogOwner,
  isLoggedIn,
  isLikedUser,
}: LogEditorProps) => {
  //에디터, 글자수 받아오는 훅
  const { editor } = useBlockEditor(log.content, 'view');
  return (
    <>
      {editor && (
        <>
          <div className='size-full'>
            <ViewerHeader log={log} isLogOwner={isLogOwner} />
            <div className='border-neutral-20 my-1 border-t-2' />
            <BlockEditor editor={editor} mode='view' hasHeading={hasHeading} />
            {log.tags.map((tag, idx) => (
              <Chip size='large' key={idx}>
                <span className='text-B3M12'># {tag}</span>
              </Chip>
            ))}
            <div className='my-3 flex justify-center'>
              <ViewerLikeBtn
                isLogOwner={isLogOwner}
                isLikedUser={isLikedUser}
                logLikes={log.likes}
                logId={log._id}
                isLoggedIn={isLoggedIn}
              />
            </div>
          </div>
        </>
      )}
      {!editor && (
        <div className='mx-auto my-28 flex grow items-center justify-center'>
          <LoadingSpinner />
        </div>
      )}
    </>
  );
};
