export function LogCardContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`background-white shadow-custom flex cursor-pointer flex-col items-start gap-3 rounded-md p-3 transition-transform duration-300 hover:translate-y-[-5px]`}
    >
      {children}
    </div>
  );
}

export const MylogCardContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`shadow-custom flex h-[100px] w-full justify-between rounded-md bg-white p-5`}
    >
      {children}
    </div>
  );
};

export const MyCommentCardContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className='shadow-custom flex flex-col rounded-md bg-white'>
      {children}
    </div>
  );
};
