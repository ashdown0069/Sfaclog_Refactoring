import { profileEditDataType } from '@/lib/validator';
import { Input } from '@repo/ui';
import { BoxButton } from '@repo/ui/Button';
import { IconCancelBoxGray, IconPlusGray } from '@repo/ui/Icon';
import { useEffect, useState } from 'react';
import { useFieldArray, useFormState, Controller } from 'react-hook-form';
import type { UseFormRegister, Control } from 'react-hook-form';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale/ko';
registerLocale('ko', ko);
interface EditCareerProps {
  register: UseFormRegister<profileEditDataType>;
  control: Control<profileEditDataType>;
}
const MAX__INPUT = 5;
const datePickerClasses =
  'border-neutral-30 w-[100px] rounded-md border px-2 py-1 outline-none';
export const EditCareer = ({ control, register }: EditCareerProps) => {
  //퇴사날짜 설정시 입사날짜 이후가 되도록 picker 설정
  const [minDate, setMinDate] = useState(new Date());

  //리액트 훅 폼 배열 관리
  const { append, fields, remove, update } = useFieldArray({
    control,
    name: 'career',
  });
  const { errors } = useFormState({
    control,
  });

  //버그인지 스트릭모드라 2번실행되는지 초기값추가할때 2번실행되어 추가함
  //추후 테스트 후 제거
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    setIsInit(() => true);
  }, []);

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  useEffect(() => {
    //빈 배열일 경우 초기값 추가 , 한개는 무조건 보이도록함
    if (fields.length === 0 && isInit) {
      append({
        company: '',
        position: '',
        endDate: null,
        startDate: null,
      });
    }
  }, [fields, append, isInit]);

  //인풋 추가하기
  const addCareerInput = () => {
    append({
      company: '',
      position: '',
      endDate: null,
      startDate: null,
    });
  };

  const removeCareerInput = (idx: number) => {
    //배열에 1개만 남았을 경우 인풋 초기화
    if (fields.length === 1) {
      update(0, {
        company: '',
        position: '',
        endDate: null,
        startDate: null,
      });
    } else {
      //아니면 제거
      remove(idx);
    }
  };

  return (
    <div className='flex flex-col gap-3'>
      <p className='text-B1M16 text-text-primary'>경력사항</p>
      {fields.map((fieldItem, idx) => {
        return (
          <div
            key={fieldItem.id}
            className={`flex w-full flex-col justify-between gap-5 rounded-md bg-[#F6F7FB] px-5 pb-4 pt-5 `}
          >
            <div className='relative flex items-start justify-between'>
              <div className='flex items-center'>
                <div className='flex flex-col'>
                  <Controller
                    control={control}
                    name={`career.${idx}.startDate`}
                    defaultValue={fieldItem.startDate}
                    render={({ field: { onChange, value } }) => {
                      return (
                        <DatePicker
                          className={`${datePickerClasses} ${errors.career && errors.career[idx]?.startDate ? 'border-text-waring' : ''}`}
                          dateFormat='YYYY.MM'
                          placeholderText='2023.01'
                          disabledKeyboardNavigation
                          showMonthYearPicker
                          locale={'ko'}
                          closeOnScroll={true}
                          isClearable
                          selected={
                            value instanceof Date
                              ? value
                              : typeof value === 'string'
                                ? new Date(value)
                                : undefined
                          }
                          onChange={date => {
                            onChange(date);
                            if (date) setMinDate(date);
                          }}
                          onKeyDown={e => {
                            e.preventDefault();
                          }}
                        />
                      );
                    }}
                  />
                  {errors.career && errors.career[idx]?.startDate && (
                    <div className='text-text-waring absolute top-9 min-w-max text-xs'>
                      {/* 입사날짜 에러메세지 */}
                      {errors.career[idx]?.startDate?.message}
                    </div>
                  )}
                </div>
                <span className='mx-1.5 mb-1'>-</span>
                <div className='flex flex-col'>
                  <Controller
                    control={control}
                    name={`career.${idx}.endDate`}
                    defaultValue={fieldItem.endDate}
                    render={({ field: { onChange, value } }) => (
                      <DatePicker
                        className={datePickerClasses}
                        dateFormat='YYYY.MM'
                        placeholderText='2024.01'
                        showMonthYearPicker
                        locale={'ko'}
                        closeOnScroll={true}
                        isClearable
                        selected={
                          value instanceof Date
                            ? value
                            : typeof value === 'string'
                              ? new Date(value)
                              : undefined
                        }
                        onChange={onChange}
                        minDate={minDate}
                        onKeyDown={e => {
                          e.preventDefault();
                        }}
                      />
                    )}
                  />
                </div>
              </div>
              <button type='button' onClick={() => removeCareerInput(idx)}>
                {/* 경력사항 블럭 삭제 */}
                <IconCancelBoxGray className='-mt-1 size-7 cursor-pointer' />
              </button>
            </div>
            <div className='flex gap-2'>
              <Input
                placeholder='회사명 입력해 주세요.'
                type='text'
                errorMessage={
                  errors.career && errors.career[idx]?.company?.message
                }
                {...register(`career.${idx}.company`)}
              />
              <Input
                placeholder='부서명/직책을 입력해 주세요.'
                type='text'
                errorMessage={
                  errors.career && errors.career[idx]?.position?.message
                }
                {...register(`career.${idx}.position`)}
              />
            </div>
          </div>
        );
      })}

      {fields.length < MAX__INPUT && (
        <div className='flex justify-end'>
          <BoxButton
            size='small'
            style='none'
            type='button'
            icon={<IconPlusGray className='size-4' />}
            iconPosition='right'
            className='border-neutral-10 border-2'
            onClick={addCareerInput}
          >
            추가하기
          </BoxButton>
        </div>
      )}
      {fields.length >= MAX__INPUT && (
        <div className='text-B3R12 text-brand-100'>
          최대 5개까지 입력할 수 있어요.
        </div>
      )}
    </div>
  );
};
