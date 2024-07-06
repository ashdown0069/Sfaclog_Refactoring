'use client';
import React, { useState } from 'react';
import type { IUser } from '@/models/User';
import type { profileEditDataType } from '@/lib/validator';
import { interestsSchema, profileEditSchema } from '@/lib/validator';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditAvatar } from './EditAvatar';
import { EditSns } from './EditSns';
import { EditCareer } from './EditCareer';
import { EditIntro } from './EditIntro';
import { EditUrl } from './EditUrl';
import { EditNickName } from './EditNickName';
import { FullLoadingSpinner } from '@/components/Spinner/FullLoadingSpinner';
import toast from 'react-hot-toast';
import { AvatarUploadToFirebase } from '@/lib/firebase';
import { BoxButton } from '@repo/ui/Button';
import { EditInterests } from './EditInterests';
import { useSession } from 'next-auth/react';
interface ProfileEditFormProps {
  user: IUser;
}
// UseFormRegister<TFieldValues>
export const ProfileEditForm = ({ user }: ProfileEditFormProps) => {
  const { data: session, update } = useSession();
  //nickname , pageUrl 중복검사 중 일때는 수정하기 버튼 비활성화
  const [isChecking, setIsChecking] = useState(false);
  //프로필 이미지 파일
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  //관심 분야
  const [myInterests, setMyInterests] = useState(user.interests);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    setError,
    clearErrors,
    setValue,
    control,
    trigger,
  } = useForm<profileEditDataType>({
    mode: 'onSubmit',
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      nickname: user.nickname,
      pageUrl: user.pageUrl,
      career: user.career,
      sns: user.sns,
      intro: user.intro,
    },
  });

  const handleProfileEditFormSubmit = async (data: profileEditDataType) => {
    //profileEditSchema의 safeParse에서 "" or undefined 들도 통과하므로
    //백엔드에서 빈 요소에 대한 필터링 로직 추가함
    const result = profileEditSchema.safeParse(data);
    //관심사 유효성검사
    const interestResult = interestsSchema.safeParse(myInterests);
    if (!result.success || !interestResult.success) {
      alert('오류가 발생했습니다.');
      return;
    }
    //아바타를 바꿨을 경우 수정
    //파이어베이스 스토리지 업로드
    let url = '';
    if (selectedFile) {
      url = await AvatarUploadToFirebase(selectedFile);
    }
    //개인정보 수정
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/mypage`, {
      method: 'PATCH',
      body: JSON.stringify({
        ...result.data,
        url,
        interests: interestResult.data,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      alert('오류가 발생하였습니다.');
      return;
    }
    const { avatar, nickname } = await res.json();
    await update({
      ...session,
      user: {
        ...session?.user,
        name: nickname,
        image: avatar,
      },
    });
    toast.success('수정이 완료되었습니다.');
    //useRouter를 사용하면 리액트훅폼이 초기화가 안됨
    window.location.reload();
    window.scrollTo(0, 0);
  };

  return (
    <>
      {isSubmitting && <FullLoadingSpinner />}
      <form
        onSubmit={handleSubmit(handleProfileEditFormSubmit)}
        className='flex w-[450px] flex-col gap-7'
      >
        <p className='text-H1M24 mb-10 text-center'>내 프로필 편집</p>
        <div className='flex gap-[26px]'>
          <EditAvatar
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            avatar={user.avatar}
          />
          <div className='flex flex-col gap-8'>
            <div className=' text-neutral-90 flex flex-col gap-2'>
              <p className='text-B1M16'>이메일</p>
              <p className='text-B2M14'>{user.email}</p>
            </div>
            <div className=' text-neutral-90 flex flex-col gap-2'>
              <p className='text-B1M16'>이름</p>
              <p className='text-B2M14'>{user.legalname}</p>
            </div>
            <div className=' text-neutral-90 flex flex-col gap-2'>
              <p className='text-B1M16'>닉네임</p>
              <EditNickName
                register={register}
                control={control}
                trigger={trigger}
                setError={setError}
                clearErrors={clearErrors}
                setIsChecking={setIsChecking}
              />
            </div>
          </div>
        </div>
        <EditSns register={register} setValue={setValue} control={control} />
        <EditCareer register={register} control={control} />
        <EditIntro register={register} />
        <EditUrl
          register={register}
          control={control}
          trigger={trigger}
          setError={setError}
          clearErrors={clearErrors}
          setIsChecking={setIsChecking}
        />
        <EditInterests
          myInterests={myInterests}
          setMyInterests={setMyInterests}
        />
        <BoxButton
          type='submit'
          size='large'
          style='solid'
          className='mt-3'
          disabled={isChecking}
        >
          수정하기
        </BoxButton>
      </form>
    </>
  );
};
