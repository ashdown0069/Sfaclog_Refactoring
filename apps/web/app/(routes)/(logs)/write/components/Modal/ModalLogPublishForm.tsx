'use client';
import { logPublishCategoryList } from '@/constant';
import { Dialog, Transition } from '@headlessui/react';
import { Radio, Selectbox } from '@repo/ui';
import { FormEvent, Fragment, useState } from 'react';
import { ModalLogThumbnail } from './ModalLogThumbnail';
import { BoxButton } from '@repo/ui/Button';
import { ThumbnailUploadToFirebase } from '@/lib/firebase';
import { LoadingSpinner } from '@/components/Spinner/LoadingSpinner';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';

interface RadioProps {
  name: string;
  value: string;
}

interface ModalLogPublishFormProps {
  isOpen: boolean;
  closeModal: () => void;
  logEditorContent: any;
  logTitle: string;
  logHashtags: string[];
  logThumbnail: string;
  savedLogCategory?: string;
  logConentHTML: string;
  isVisibility?: boolean;
}
/**
 *
 * @param isOpen 모달 오픈 여부
 * @param closeModal 모달 닫기 함수
 * @param editorContent 에디터에 저장된 내용, JSON 형태
 */
export const ModalLogPublishForm = ({
  isOpen,
  closeModal,
  logEditorContent,
  logTitle,
  logHashtags,
  savedLogCategory,
  logConentHTML,
  isVisibility,
  logThumbnail,
}: ModalLogPublishFormProps) => {
  const params = useParams();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  //공개범위 라디오 버튼 상태관리
  const [logScope, setLogScope] = useState(
    isVisibility === false ? 'private' : 'public',
  );
  //셀렉트 박스 - 카테고리 상태관리
  const [logCategory, setLogCategory] = useState(
    logPublishCategoryList.find(el => el.value === savedLogCategory)?.value ||
      '',
  );
  const selectListIndex = logPublishCategoryList.findIndex(
    el => el.value === savedLogCategory,
  );
  //공개범위 라디오 버튼 변경 이벤트
  const handleRadioChange = (data: RadioProps) => {
    if (data.value === 'public') {
      setLogScope(() => 'public');
    } else if (data.value === 'private') {
      setLogScope(() => 'private');
    }
  };
  const [thumbnailFile, setThumbnailFile] = useState<File | undefined>(
    undefined,
  );
  //로그 저장 폼 submit 이벤트
  const handleLogSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(() => true);
    let thumbnailUrl = '';
    if (thumbnailFile) {
      thumbnailUrl = await ThumbnailUploadToFirebase(thumbnailFile);
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/logs/write`,
      {
        method: params.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          logTitle,
          logEditorContent,
          logScope,
          logCategory,
          logHashtags,
          thumbnailUrl,
          logId: params.id,
          logConentHTML,
        }),
      },
    );

    if (!res.ok) {
      toast.error('로그 저장에 실패했습니다. 다시 시도해주세요.');
      return;
    }
    const result = await res.json();
    if (result.success) {
      router.push(`/log/${result.logId}`);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/25' />
        </Transition.Child>
        <form
          onSubmit={handleLogSave}
          className='fixed inset-0 overflow-y-auto'
        >
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='shadow-custom relative h-[400px] w-[600px] overflow-hidden rounded-2xl bg-white p-6 text-left align-middle transition-all'>
                {loading && (
                  <>
                    <div className='absolute left-0 top-0 z-10 flex size-full items-center justify-center bg-white/30 backdrop-brightness-110'>
                      <LoadingSpinner />
                    </div>
                  </>
                )}
                <Dialog.Title as='h2' className='text-H2B20 text-text-primary'>
                  발행
                </Dialog.Title>
                <div className='mt-4 flex justify-around'>
                  <div className='flex w-full flex-col gap-7'>
                    <div className='flex items-center'>
                      <div className='text-B1B16 text-text-primary mr-4 w-[70px]'>
                        카테고리
                      </div>
                      <Selectbox
                        selectList={logPublishCategoryList}
                        width='middle'
                        placeholder='카테고리를 선택해주세요.'
                        onChange={data => setLogCategory(data.value)}
                        defaultValueIndex={selectListIndex}
                      />
                    </div>
                    <div className='flex items-center'>
                      <div className='text-B1B16 text-text-primary mr-4 w-[70px]'>
                        공개 범위
                      </div>
                      <Radio
                        checked={isVisibility || isVisibility === undefined}
                        value='public'
                        name='scope'
                        label='전체 공개'
                        onChange={handleRadioChange}
                      />
                      <Radio
                        checked={isVisibility === false}
                        value='private'
                        name='scope'
                        label='비공개'
                        onChange={handleRadioChange}
                      />
                    </div>
                  </div>
                  <ModalLogThumbnail
                    logThumbnail={logThumbnail}
                    thumbnailFile={thumbnailFile}
                    setThumbnailFile={setThumbnailFile}
                  />
                </div>

                <div className='mt-6 flex justify-center gap-3'>
                  <BoxButton
                    onClick={closeModal}
                    size='middle'
                    style='outline'
                    type='button'
                  >
                    닫기
                  </BoxButton>
                  <BoxButton size='middle' style='solid' type='submit'>
                    저장하기
                  </BoxButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </form>
      </Dialog>
    </Transition>
  );
};
