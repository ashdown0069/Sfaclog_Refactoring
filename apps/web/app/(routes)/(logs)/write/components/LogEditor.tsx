'use client';
import BlockEditor from '@/editor/components/BlockEditor/BlockEditor';
import { WriteSaveBtn } from './WriteSaveBtn';
import { useBlockEditor } from '@/editor/hooks/useBlockEditor';
import { LoadingSpinner } from '@/components/Spinner/LoadingSpinner';
import { Input } from '@repo/ui';
import { useState } from 'react';
import { ModalLogPublishForm } from './Modal/ModalLogPublishForm';
import { TagsInput } from './TagsInput';
import type { ILog } from '@/models/Log';
interface LogEditorProps {
  logContent: any | null;
  logTags?: string[];
  logTitle?: string;
  logCategory?: string;
  isVisibility?: boolean;
  logThumbnail?: string;
}
/**
 * @param logContent
 * 로그의 내용을 받아옵니다.
 *
 */
export const LogEditor = ({
  logContent = null,
  logTags = [],
  logTitle,
  logCategory,
  isVisibility,
  logThumbnail,
}: LogEditorProps) => {
  //에디터, 글자수 받아오는 훅
  const { editor, characterCount } = useBlockEditor(logContent, 'write');
  const [logEditorContent, setLogEditorContent] = useState<any>(null);
  const [logConentHTML, setLogConentHTML] = useState('');
  //제목 상태관리
  const [logTitleState, setLogTitle] = useState(logTitle ? logTitle : '');
  const [logTitleError, setLogTitleError] = useState(false);
  const handleLogTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogTitle(() => e.target.value);
    setLogTitleError(() => false);
  };
  //해시태그 상태관리
  const [logHashtags, setLogHashtags] = useState<string[]>(
    logTags ? logTags : [],
  );
  //모달 상태 관리
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(() => false);
  };
  const openModal = () => {
    if (logTitleState.length === 0) {
      setLogTitleError(() => true);
      return;
    }
    if (editor) {
      let content = editor.getJSON();
      //이미지 업로드 블럭 필터링
      const filetered = content?.content?.filter(
        el => el.type !== 'imageUpload',
      );
      content.content = filetered;

      setLogEditorContent(() => content);
      setLogConentHTML(() => editor.getHTML());
    }
    setIsOpen(() => true);
  };
  return (
    <>
      {editor && (
        <>
          <div className='mx-auto flex w-3/4 justify-center'>
            <Input
              value={logTitleState}
              onChange={handleLogTitle}
              type='text'
              autoFocus
              placeholder='제목을 입력해주세요'
              className={`${logTitleError ? 'placeholder:text-text-waring' : ''} text-H0M32 placeholder:text-H1M24 h-20 rounded-none border-x-transparent border-t-transparent`}
            />
          </div>
          <div className='pb-20'>
            <BlockEditor editor={editor} mode='write' />
            <div className='px-10'>
              <TagsInput
                logHashtags={logHashtags}
                setLogHashtags={setLogHashtags}
              />
            </div>
          </div>
          <WriteSaveBtn
            openModal={openModal}
            characterCount={characterCount.characters()}
          />
        </>
      )}
      {!editor && (
        <div className='mx-auto my-28 flex justify-center'>
          <LoadingSpinner />
        </div>
      )}
      {isOpen && (
        <ModalLogPublishForm
          logTitle={logTitleState}
          logEditorContent={logEditorContent}
          logHashtags={logHashtags}
          logThumbnail={logThumbnail ? logThumbnail : ''}
          savedLogCategory={logCategory}
          logConentHTML={logConentHTML}
          isVisibility={isVisibility}
          isOpen={isOpen}
          closeModal={closeModal}
        />
      )}
    </>
  );
};
