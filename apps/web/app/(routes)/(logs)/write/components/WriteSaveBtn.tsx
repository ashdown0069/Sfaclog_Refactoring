import { BoxButton } from '@repo/ui/Button';
/**
 *
 * @param characterCount
 * 몇자인지 보여주는 문자열
 */
export const WriteSaveBtn = ({
  characterCount,
  openModal,
}: {
  characterCount: string;
  openModal: () => void;
}) => {
  return (
    <div className='bg-neutral-5 fixed bottom-0 left-0 flex w-full items-center justify-between gap-5 px-[60px] py-3'>
      <div className='text-neutral-40 text-B1M16'>{characterCount} 자</div>
      <div className='flex items-center gap-5'>
        <p className='text-B3R12 text-neutral-40'>자동 저장 완료 00:00:00</p>
        <BoxButton style='solid' type='button' size='middle' disabled={true}>
          임시저장
        </BoxButton>
        <BoxButton
          type='button'
          style='solid'
          size='middle'
          onClick={openModal}
        >
          완료
        </BoxButton>
      </div>
    </div>
  );
};
