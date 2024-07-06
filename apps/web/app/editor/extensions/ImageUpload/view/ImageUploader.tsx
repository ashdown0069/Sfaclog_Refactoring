import { Spinner } from '@/editor/components/ui/Spinner';
import { useFileUpload, useUploader } from './hooks';
import { Button } from '@/editor/components/ui/Button';
import { Icon } from '@/editor/components/ui/Icon';
import { cn } from '@/editor/lib/utils';
import { ChangeEvent, useCallback, useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import './ImageUploader.css';
export const ImageUploader = ({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) => {
  const { loading, uploadFile } = useUploader({ onUpload });
  const { handleUploadClick, ref } = useFileUpload();
  const [url, setUrl] = useState<string>('');
  const onFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      e.target.files ? uploadFile(e.target.files[0]) : null,
    [uploadFile],
  );
  if (loading) {
    return (
      <div className='flex min-h-[10rem] items-center justify-center rounded-lg bg-opacity-80 p-8'>
        <Spinner className='text-neutral-500' size={1.5} />
      </div>
    );
  }

  const wrapperClass = cn(
    'flex flex-col items-center justify-center px-4 py-6 rounded-lg bg-gray-100 transition-colors duration-200 ease-in-out border',
  );

  const HandleUrl = (url: string) => {
    if (url && (url.startsWith('http') || url.startsWith('https'))) {
      onUpload(url);
    } else {
      alert('URL을 확인해주세요.');
    }
  };

  return (
    <div
      className={wrapperClass}
      // onDragOver={onDragEnter}
      // onDrop={onDrop}
      // onDragLeave={onDragLeave}
      contentEditable={false}
    >
      <Tabs.Root defaultValue='file' className='w-full'>
        <Tabs.List className='mb-4 flex justify-start gap-2'>
          <Tabs.Trigger value='file' className='TabsTrigger'>
            <div className='rounded-md p-2 text-sm hover:bg-slate-200'>
              파일 업로드
            </div>
          </Tabs.Trigger>
          <Tabs.Trigger value='url' className='TabsTrigger'>
            <div className='rounded-md p-2 text-sm hover:bg-slate-200'>URL</div>
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value='file'>
          <div className='flex justify-center'>
            <Button
              onClick={handleUploadClick}
              variant='primary'
              buttonSize='small'
            >
              <Icon name='Upload' />
              이미지 업로드 하기
            </Button>
          </div>
        </Tabs.Content>

        <Tabs.Content value='url'>
          <div>
            <div className='flex justify-center gap-2'>
              <input
                type='url'
                className='rounded-md border pl-2 outline-none'
                onChange={e => setUrl(e.target.value)}
              />
              <Button
                onClick={() => HandleUrl(url)}
                variant='primary'
                buttonSize='small'
              >
                추가하기
              </Button>
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
      <input
        className='size-0 overflow-hidden opacity-0'
        ref={ref}
        type='file'
        accept='.jpg,.jpeg,.png,.webp,.gif'
        onChange={onFileChange}
      />
    </div>
  );
};

export default ImageUploader;
