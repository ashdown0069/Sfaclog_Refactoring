import { LogEditor } from './components/LogEditor';

const Page = async () => {
  return (
    <div className='mx-auto w-full max-w-[960px]'>
      <LogEditor logContent={null} logTags={undefined} />
    </div>
  );
};

export default Page;
