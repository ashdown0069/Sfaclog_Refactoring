'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Radio } from '@repo/ui';
import { BoxButton } from '@repo/ui/Button';
import { PrivacyPolicyText } from './PrivacyPolicyText';
import { ServicePolicyText } from './ServicePolicyText';
import Footer from '../Footer/Footer';

interface RadioProps {
  name: string;
  value: string;
}

export function SignupPolicy() {
  const router = useRouter();
  const [data, setData] = useState({
    privacy: false,
    service: false,
  });
  const handleRadioChange = (data: RadioProps) => {
    if (data.value === '동의') {
      setData(prev => ({
        ...prev,
        [data.name]: true,
      }));
    } else if (data.value === '거부') {
      setData(prev => ({
        ...prev,
        [data.name]: false,
      }));
    }
  };

  const handleNextStepBtn = () => {
    if (data.privacy && data.service) router.push('/signup/signupform');
    else alert('모든 이용약관에 동의가 필요합니다.');
  };
  return (
    <>
      <section className='mx-auto mb-28 w-fit'>
        <div className='mb-10 w-[720px]'>
          <div className='text-H3R18 mb-3'>개인정보처리방침</div>
          <PrivacyPolicyText />
          <Radio
            value='동의'
            name='privacy'
            label='동의'
            onChange={handleRadioChange}
          />
          <Radio
            value='거부'
            name='privacy'
            label='거부'
            onChange={handleRadioChange}
          />
        </div>
        <div className='mb-10 w-[720px]'>
          <div className='text-H3R18 mb-3'>서비스 이용약관</div>
          <ServicePolicyText />
          <Radio
            value='동의'
            name='service'
            label='동의'
            onChange={handleRadioChange}
          />
          <Radio
            value='거부'
            name='service'
            label='거부'
            onChange={handleRadioChange}
          />
        </div>
        <div className='flex h-fit w-full justify-center'>
          <BoxButton
            type='button'
            size='large'
            style='solid'
            onClick={handleNextStepBtn}
          >
            다음
          </BoxButton>
        </div>
      </section>
      <Footer />
    </>
  );
}
