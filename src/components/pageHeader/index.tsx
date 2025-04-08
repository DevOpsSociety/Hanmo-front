export default function PageHeader({ title }: { title: string }) {
  return (
    <div className='text-center border-b border-solid border-[#E7E7E7] h-[73px] flex items-center justify-center'>
      <span className='text-[38px] font-[manSeh]'>{title}</span>
    </div>
  );
}
